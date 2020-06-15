import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../src/index.css";
import Navbar from "./navbar.component";
import { getFromStorage } from "../utils/storage";
import ScrollToBottom from "react-scroll-to-bottom";

const Message = (props) => (
  <div className="outgoing_msg">
    <div className="sent_msg">
      <p>{props.message.message}</p>
      <span className="time_date">{props.message.updatedAt}</span>{" "}
    </div>
  </div>
);

const Message2 = (props) => (
  <div className="incoming_msg">
    <div className="received_msg">
      <div className="received_withd_msg">
        <p>{props.message.message}</p>
        <span className="time_date">{props.message.updatedAt}</span>{" "}
      </div>
    </div>
  </div>
);
const Chat = (props) => (
  <button
    className="chat-card"
    onClick={() => {
      props.handleclick(props.chat);
    }}
  >
    <img src={"/userpics/" + props.chat.userphoto} class="chat-card-img mr-3" />

    <div className="col-md-8 d-flex flex-column justify-content-between">
      <h5 className="bold text-left">{props.chat.username}</h5>
      <div className=" d-flex align-items-center">
        <span>{props.chat.lastmessage}</span>
      </div>
    </div>
  </button>
);

const Chat2 = (props) => (
  <button
    className="chat-card"
    onClick={() => {
      props.handleclick(props.chat);
    }}
  >
    <img src={"/userpics/" + props.chat.userphoto} class="chat-card-img mr-3" />

    <div className="col-md-8 d-flex flex-column justify-content-between">
      <h5 className="bold text-left">{props.chat.username}</h5>
      <div className=" d-flex align-items-center">
        <span>{props.chat.lastmessage}</span>
      </div>
    </div>
    <span className="unreadmessages">{props.chat.unread}</span>
  </button>
);

export default class Chats extends Component {
  constructor(props) {
    super(props);
    this.handleclick = this.handleclick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.closechat = this.closechat.bind(this);

    this.state = {
      cookie: "",
      chats: [],

      selected: "",
      chatclass: "hidden",
      messages: "",
      text: "",
    };
  }

  componentDidMount() {
    const obj = getFromStorage("the_main_app");
    if (obj && obj.cookie) {
      const { cookie } = obj;
      this.setState({ cookie: cookie });

      axios
        .get("http://localhost:5000/Chat/getchats/" + cookie._id)
        .then((response) => {
          console.log(response.data);
          response.data.forEach((element) => {
            console.log(element.createdAt);
          });
          let data = response.data;
          data.sort((a, b) => b.createdAt - a.createdAt);

          this.setState({ chats: data });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  onChangeText(e) {
    this.setState({
      text: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const { cookie } = getFromStorage("the_main_app");

    if (this.state.text == "") {
      console.log("YOU CANT SEND EMPTY");
    } else {
      axios
        .post("http://localhost:5000/Chat/addmessage", {
          idchat: this.state.selected.idchat,
          iduser: cookie._id,
          message: this.state.text,
        })
        .then((response) => {
          if (response.data == "Message created") {
            axios
              .get("http://localhost:5000/Chat/" + this.state.selected.idchat)
              .then((response) => {
                this.setState({
                  messages: response.data,
                });

                axios
                  .get("http://localhost:5000/Chat/getchats/" + cookie._id)
                  .then((response) => {
                    let data = response.data;
                    data.sort((a, b) => b.createdAt - a.createdAt);

                    this.setState({ chats: data });
                  });
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });

      this.setState({
        text: "",
      });
    }
  }
  handleclick(info) {
    if (this.state.selected != info) {
      this.setState({
        selected: info,
        chatclass:
          "chatscolumn2 d-flex flex-column justify-content-between col-md-7",
      });
      if (info.unread != 0) {
        this.state.chats.forEach((element) => {
          if (element == info) {
            element.unread = 0;
          }
        });
      }
      axios
        .get("http://localhost:5000/Chat/" + info.idchat)
        .then((response) => {
          this.setState({
            messages: response.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });

      axios.post("http://localhost:5000/Chat/readchat", {
        idchat: info.idchat,
        iduser: info.userid,
      });
    }
  }

  chatList() {
    return this.state.chats.map((currentchat) => {
      if (
        currentchat.unread != 0 &&
        currentchat.userid != this.state.cookie._id
      ) {
        return (
          <Chat2
            chat={currentchat}
            key={currentchat._id}
            handleclick={this.handleclick}
          />
        );
      } else {
        return (
          <Chat
            chat={currentchat}
            key={currentchat._id}
            handleclick={this.handleclick}
          />
        );
      }
    });
  }
  MessageList() {
    const allMsg = Array.from(this.state.messages);

    return allMsg.map((currentproduct) => {
      let date = new Date(currentproduct.createdAt);
      let month = date.getMonth() + 1;
      let dt = date.getDate();
      let hour = date.getHours();
      let minutes = date.getMinutes();

      if (dt < 10) {
        dt = "0" + dt;
      }
      if (month < 10) {
        month = "0" + month;
      }
      currentproduct.updatedAt =
        dt + "-" + month + " | " + hour + " : " + minutes;

      if (currentproduct.iduser == this.state.cookie._id) {
        return <Message message={currentproduct} />;
      } else {
        return <Message2 message={currentproduct} />;
      }
    });
  }

  closechat() {
    this.setState({ chatclass: "hidden" ,selected:""});
    
  }
  render() {
    const { cookie } = this.state;
    if (!cookie) {
      return (
        <div className="gray">
          <Navbar />
          <div className="container mt-5">
            You must be logged in order to see chats
          </div>
        </div>
      );
    } else {
      return (
        <div className="gray">
          <Navbar />
          <div className="container mt-5">
            <div className="row mb-5">
              <h3>All chats</h3>
            </div>
            <div className="row d-flex justify-content-between">
              <div className="col-md-4">{this.chatList()}</div>
              <div className={this.state.chatclass}>
                <div className="chat-body">
                  <button className="goback" onClick={this.closechat}>X</button>
                  <h3 className="text-center mt-4">
                    {this.state.selected.username}
                  </h3>
                  <div>
                    <div>
                      <div className="mesgs2">
                        <ScrollToBottom className="msg_history2">
                          {this.MessageList()}
                        </ScrollToBottom>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="type_msg">
                  <div className="row input_msg_write">
                    <form className="col-md-12" onSubmit={this.onSubmit}>
                      <input
                        type="text"
                        placeholder="Type a message"
                        className="col-md-9"
                        value={this.state.text}
                        onChange={this.onChangeText}
                      />

                      <input
                        type="submit"
                        value="Send"
                        className="col-md-3 send"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
