import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar.component";
import axios from "axios";
import { getFromStorage, setInStorage } from "../utils/storage";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      cookie: "",
      email: "",
      password: "",
      status: "",
      statusclass: "hidden",
      forgotclass: "hidden",
    };
  }

  componentDidMount() {
    const obj = getFromStorage("the_main_app");

    if (obj && obj.cookie) {
      const { cookie } = obj;
      this.setState({
        cookie: cookie,
      });
    }
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
      status: "",
      statusclass: "",
      forgotclass:"hidden"
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
      status: "",
      statusclass: "",
      forgotclass:"hidden"
    });
  }

  onSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:5000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setInStorage("the_main_app", { cookie: json.user });

          window.location = "/login";
        } else {
          console.log(json);
          if (json == "Wrong Parameters") {
            this.setState({
              status: "Wrong parameters",
              statusclass: "mb-4",
              forgotclass: "mb-4",
            });
          } else {
            this.setState({
              status: json,
              statusclass: "mb-4",
            });
            console.log(json);
            this.setState({
              cookie: json.cookie,
            });
          }
        }
      });
  }

  render() {
    const { cookie } = this.state;
    if (!cookie) {
      return (
        <div className="login-bg">
          <Navbar />
          <div className="container login-container mt-5 pt-5">
            <form onSubmit={this.onSubmit} className="mt-5">
              <div className="login-logo"></div>
              <h3>Login</h3>
              <div className="form-group">
                <label>Email </label>
                <input
                  type="email"
                  required
                  className="form-control"
                  // placeholder="Example@gmail.com"
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                />

                <label>Password</label>
                <input
                  type="password"
                  required
                  className="form-control"
                  // placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                />
              </div>
              <span className={this.state.statusclass}>
                {this.state.status}{" "}
              </span>
              <span className={this.state.forgotclass}>
                Forgot your password? click  
                
              <Link className="ml-1" to="/forgotpassword">
                Here
              </Link>
              </span>

              <input type="submit" value="Login" className="btn" />

              <Link className="btn btn2 mt-3" to="/createuser">
                Register
              </Link>
            </form>
          </div>
        </div>
      );
    } else {
      window.location = "/myprofile";
    }
  }
}
