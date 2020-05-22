import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar.component";

import { getFromStorage, setInStorage } from "../utils/storage";

export default class EditUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      cookie: "",
      username: "",
      email: "",
      password: "",
      role: "",
    };
  }

  componentDidMount() {
    const obj = getFromStorage("the_main_app");

    if (obj && obj.cookie) {
      const { cookie } = obj;

      this.setState({
        cookie: cookie,
        username: cookie.username,
        email: cookie.email,
        password: cookie.password,
        role: cookie.role,
      });
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
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

  onChangeRole(e) {
    this.setState({
      role: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      role: this.state.role,
    };
    console.log(user);
    fetch("http://localhost:5000/users/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.cookie.username,
        email: this.state.cookie.email,
        password: this.state.cookie.password,
        role: this.state.cookie.role,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          console.log("user verified");

          axios
            .post(
              "http://localhost:5000/users/update/" + this.state.cookie._id,
              user
            )
            .then((res) => res.json());
          setInStorage("the_main_app", { cookie: user });
          window.location = "/login";
        } else {
          console.log("Verification failed");
        }
      });
  }

  render() {
    const { cookie } = this.state;
    if (!cookie) {
      return (
        <div>
          <Navbar />
          <div className="container mt-5">You are not logged</div>
        </div>
      );
    } else {
      return (
        <div>
          <Navbar />
          <div className="container mt-5">
            <h3>Edit user</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Username: </label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                />

                <label>Email : </label>
                <input
                  type="email"
                  required
                  className="form-control"
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                />

                <label>Password: </label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                />

                <label>Role: </label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={this.state.role}
                  onChange={this.onChangeRole}
                />
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  value="Update User"
                  className="btn btn-primary"
                />
              </div>
            </form>
            <Link to="/login">Go back</Link>
          </div>
        </div>
      );
    }
  }
}
