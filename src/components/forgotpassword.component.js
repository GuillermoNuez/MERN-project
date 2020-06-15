import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar.component";
import axios from "axios";
import { getFromStorage, setInStorage } from "../utils/storage";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      cookie: "",
      email: "",
      class: "form-group mt-3",
      message: "Recover password",
    };
  }

  componentDidMount() {
    const obj = getFromStorage("the_main_app");

    if (obj && obj.cookie) {
      const { cookie } = obj;
      this.setState({
        cookie: cookie,
      });

      // GET PRODUCTS
      
      axios
        .get("http://localhost:5000/products/getuser/" + cookie._id)
        .then((response) => {
          this.setState({
            products: response.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .get("http://localhost:5000/Rating/getrating/" + cookie._id)
        .then((response) => {
          this.setState({
            comments: response.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    axios
      .get("http://localhost:5000/users/recoverpassword/" + this.state.email)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    this.setState({ class: "hidden", message: "Email sent" });
  }

  render() {
    const { cookie } = this.state;
    if (!cookie) {
      return (
        <div className="login-bg">
          <Navbar />
          <div className="container login-container mt-5 pt-5">
            <form onSubmit={this.onSubmit} className="mt-5">
              <div className="login-logo mb-4"></div>
              <h3 className="mt-4">{this.state.message}</h3>
              <div className={this.state.class}>
                <label>Email </label>
                <input
                  type="email"
                  required
                  className="form-control"
                  // placeholder="Example@gmail.com"
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                />

                <input type="submit" value="Send email" className="btn registerbutton" />
              </div>
            </form>
          </div>
        </div>
      );
    } else {
      window.location = "/myprofile";
    }
  }
}
