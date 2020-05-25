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
    this.onChangeBio = this.onChangeBio.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      cookie: "",
      username: "",
      email: "",
      password: "",
      bio: "",
      location: "",
      role: "",
      file: "",
    };
  }

  componentDidMount() {
    const obj = getFromStorage("the_main_app");

    if (obj && obj.cookie) {
      const { cookie } = obj;
      console.log(cookie);
      this.setState({
        cookie: cookie,
        username: cookie.username,
        email: cookie.email,
        password: cookie.password,
        bio: cookie.bio,
        location: cookie.location,
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

  onChangeRole(e) {
    this.setState({
      role: e.target.value,
    });
  }

  fileSelectedHandler = (event) => {
    this.setState({
      file: event.target.files[0],
    });
  };

  onSubmit(e) {
    e.preventDefault();

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

          if (this.state.file) {
            const fd = new FormData();
            let aux = this.state.file.name.split(".");
            fd.append(
              "files",
              this.state.file,
              this.state.cookie._id + "." + aux[1]
            );
            axios
              .post("http://localhost:5000/Upload/upload", fd)
              .then((res) => {
                console.log(res);
              });

            const user = {
              _id: this.state.cookie._id,
              username: this.state.username,
              email: this.state.email,
              password: this.state.password,
              location: this.state.location,
              bio: this.state.bio,
              role: this.state.role,
              photo: this.state.cookie._id + "." + aux[1],
            };

            fetch("http://localhost:5000/users/update/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(user),
            })
              .then((res) => res.json())
              .then((json) => {
                if (json.success) {
                  setInStorage("the_main_app", { cookie: user });
                  window.location = "/login";
                }
              });
          } else {
            const user = {
              _id: this.state.cookie._id,
              username: this.state.username,
              email: this.state.email,
              password: this.state.password,
              location: this.state.location,
              bio: this.state.bio,
              role: this.state.role,
              photo: this.state.cookie.photo,
            };

            fetch("http://localhost:5000/users/update/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(user),
            })
              .then((res) => res.json())
              .then((json) => {
                if (json.success) {
                  setInStorage("the_main_app", { cookie: user });
                  window.location = "/login";
                }
              });
          }
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
            <form enctype="multipart/form-data" onSubmit={this.onSubmit}>
              <label>Username: </label>
              <input
                type="text"
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
              />

              <label>Email : </label>
              <input
                type="email"
                className="form-control"
                value={this.state.email}
                onChange={this.onChangeEmail}
              />

              <label>Password: </label>
              <input
                type="text"
                className="form-control"
                value={this.state.password}
                onChange={this.onChangePassword}
              />

              <label>Bio: </label>
              <input
                type="text"
                className="form-control"
                value={this.state.bio}
                onChange={this.onChangeBio}
              />

              <label>location: </label>
              <input
                type="text"
                className="form-control"
                value={this.state.location}
                onChange={this.onChangeLocation}
              />

              <label>Role: </label>

              <select
                className="form-control"
                value={this.state.role}
                onChange={this.onChangeRole}
              >
                <option>Client</option>
                <option>Farmer</option>
              </select>

              <div className="form-group">
                <input
                  type="submit"
                  value="Update User"
                  className="btn btn-primary"
                />
              </div>
              <label>image: </label>
              <input
                type="file"
                accept="image/x-png,image/jpeg"
                onChange={this.fileSelectedHandler}
              />
            </form>
            <Link to="/login">Go back</Link>
            <br />
            <br />
          </div>
        </div>
      );
    }
  }
}
