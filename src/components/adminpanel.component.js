import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar.component";
import axios from "axios";
import { getFromStorage, setInStorage } from "../utils/storage";
import { Modal } from "react-bootstrap";
import { Bar, Line, Pie, Bubble } from "react-chartjs-2";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cookie: "",
    };
  }

  componentDidMount() {
    // GET PRODUCTS

    const obj = getFromStorage("the_main_app");
    console.log(obj);
    try {
      if (obj && obj.cookie) {
        const { cookie } = obj;
        this.setState({
          cookie: cookie,
        });
      }
    } catch {}
  }

  logout() {
    localStorage.removeItem("the_main_app");
    window.location = "/login";
  }

  render() {
    const { cookie } = this.state;
    if (!cookie) {
      return (
        <div>
          <Navbar />
          <div className="container mt-5">
            You must log in to see this window
          </div>
        </div>
      );
    } else {
      if (cookie.role == "Admin") {
        return (
          <div>
            <Navbar />
            <div className="container mt-5">Here</div>
          </div>
        );
      } else {
        return (
          <div>
            <Navbar />
            <div className="container mt-5">You dont have permision to be here</div>
          </div>
        );
      }
    }
  }
}
