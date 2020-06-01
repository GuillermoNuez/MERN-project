import React, { Component } from "react";
import axios from "axios";
import Navbar from "../components/navbar.component";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      role: "Client",
      selectedFile: null,
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeBio(e) {
    this.setState({
      bio: e.target.value,
    });
  }

  onChangeLocation(e) {
    this.setState({
      location: e.target.value,
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
    console.log(e.target.value);
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

    axios
      .post("http://localhost:5000/users/add", user)
      .then((res) => console.log(res.data));

    this.setState({
      username: "",
      email: "",
      password: "",
    });
    window.location = "/login";
  }

  render() {
    return (
      <div className="login-bg">
        <Navbar />
        <div className="container login-container mt-5 pt-5">
          
          <form onSubmit={this.onSubmit} className="mt-5">
          <h3>Register</h3>
            <div className="form-group mt-2">
              
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
                type="password"
                required
                className="form-control"
                value={this.state.password}
                onChange={this.onChangePassword}
              />

              <label>Role </label>

              <div className="d-flex justify-content-center">
                <div>
                  <input
                    type="radio"
                    name="site_name"
                    value="Client"
                    onChange={this.onChangeRole}
                    required
                  ></input>
                  <label className="ml-2">Client</label>
                </div>
                <div className="ml-4">
                  <input
                    type="radio"
                    name="site_name"
                    value="Farmer"
                    onChange={this.onChangeRole}
                    required
                  ></input>
                  <label className="ml-2">Farmer</label>
                </div>
              </div>
            </div>

            <div className="form-group">
              <input type="submit" value="Create User" className="btn btn2" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
