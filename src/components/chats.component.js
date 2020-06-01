import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../src/index.css";
import Navbar from "./navbar.component";
import { getFromStorage } from "../utils/storage";

const Chat = (props) => (
  <Link className ="chat-card" to={"/chat/" + props.chat.userid}>
      <div className="col-md-4 pl-0">
        <img
          src={"/userpics/" + props.chat.userphoto}
          class="user-image mr-3"
        />
      </div>
      <div className="col-md-8">
        <h5 className="card-title mb-3 bold">{props.chat.username}</h5>
        <div className="col-md-12 d-flex justify-content-between mb-4 pl-0">
          <div className=" d-flex align-items-center">
            <span>{props.chat.lastmessage}</span>
          </div>
        </div>
      </div>
  </Link>
);

export default class ProductsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cookie: "",
      chats: [],
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
          this.setState({ chats: response.data });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  chatList() {
    return this.state.chats.map((currentchat) => {
      return <Chat chat={currentchat} key={currentchat._id} />;
    });
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
            <div className="row mb-5 d-flex align-items-center">
              <h3>All chats</h3>
            </div>
            <div className="cold-md-4">{this.chatList()}</div>
          </div>
        </div>
      );
    }
  }
}
