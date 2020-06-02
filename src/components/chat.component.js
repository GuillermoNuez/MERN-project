import React, { Component } from "react";
import axios from "axios";
import "../../src/index.css";
import Navbar from "./navbar.component";
import { getFromStorage } from "../utils/storage";

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

export default class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.state = {
      chatid: "",
      cookie: "",
      username: "",
      text: "",
      messages: [],
    };
  }
  onSubmit(e) {
    e.preventDefault();
    const { cookie } = getFromStorage("the_main_app");

    if (this.state.text == "") {
      console.log("YOU CANT SEND EMPTY");
    } else {
      console.log("________________________ STATE ________________________");
      console.log(this.state.chatid);
      if (!this.state.chatid) {
        console.log(
          "________________________ No Chat found ________________________"
        );
        axios
          .post("http://localhost:5000/Chat/add", {
            iduser1: cookie._id,
            iduser2: this.props.match.params.id,
            msg: this.state.text,
          })
          .then((response) => {
            if (response.data == "Message created") {
              window.location = "/chat/" + this.props.match.params.id;
            }
            this.setState({
              chatid: response.data.messages,
              username: response.data.username,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log(
          "________________________ Chat found ________________________"
        );
        console.log("chat id -> " + this.state.chatid);
        axios
          .post("http://localhost:5000/Chat/addmessage", {
            idchat: this.state.chatid,
            iduser: cookie._id,
            message: this.state.text,
          })
          .then((response) => {
            if (response.data == "Message created") {
              window.location = "/chat/" + this.props.match.params.id;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
      // this.setState({
      //   text: "",
      // });
    }
  }
  componentDidMount() {
    const { cookie } = getFromStorage("the_main_app");

    this.setState({
      cookie: cookie,
    });

    axios
      .post("http://localhost:5000/Chat/", {
        iduser1: cookie._id,
        iduser2: this.props.match.params.id,
      })
      .then((response) => {
        console.log(response.data);
        console.log("Saving chatid -> " + response.data.messages);
        if (response.data != null) {
          this.setState({
            chatid: response.data.messages,
          });
          console.log("SAVED AS -> " + this.state.chatid);
          axios
            .get("http://localhost:5000/Chat/" + response.data.messages)
            .then((response) => {
              console.log("idk mnaybe ->" + response.data.username);
              console.log("SAVED AS -> " + this.state.chatid);
              console.log(response.data);
              this.setState({
                messages: response.data,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
        this.setState({
          chatid: response.data.messages,
          username: response.data.username,
          messages: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeText(e) {
    this.setState({
      text: e.target.value,
    });
  }

  MessageList() {
    const allMsg = Array.from(this.state.messages);
    console.log();
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
      currentproduct.updatedAt = dt + "-" + month + " | " + hour + " : " + minutes;

      console.log(currentproduct.createdAt);

      if (currentproduct.iduser == this.state.cookie._id) {
        return <Message message={currentproduct} />;
      } else {
        return <Message2 message={currentproduct} />;
      }
    });
  }

  render() {
    return (
      <div>
        <Navbar />

        <div className="container">
          <h3 className="text-center mt-5">{this.state.username}</h3>
          <div>
            <div className="d-flex justify-content-center">
              <div className="mesgs">
                <div className="msg_history">{this.MessageList()}</div>
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
      </div>
    );
  }
}
