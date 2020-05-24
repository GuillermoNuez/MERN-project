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
      isLoading: true,
      cookie: "",
      email: "",
      password: "",
    };
  }

  componentDidMount() {
    const obj = getFromStorage("the_main_app");

    if (obj && obj.cookie) {
      const { cookie } = obj;
      this.setState({
        cookie: cookie,
        isLoading: false,
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
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    this.setState({
      isLoading: true,
    });

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
          this.setState({
            isLoading: false,
            email: "",
            password: "",
            cookie: json.cookie,
          });
        }
      });
  }

  render() {
    const { cookie } = this.state;
    if (!cookie) {
      return (
        <div>
          <Navbar />
          <div className="container login-container">
            <form onSubmit={this.onSubmit}>
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
