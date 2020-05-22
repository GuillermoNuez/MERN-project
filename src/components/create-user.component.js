import React, { Component } from "react";
import axios from "axios";
import Navbar from "../components/navbar.component";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeBio = this.onChangeBio.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      bio: "",
      location: "",
      email: "",
      password: "",
      role: "",
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
    this.setState({
      role: e.target.value,
    });
  }

  onChangeImage = (event) => {
    console.log(event.target.files);
    this.setState({
      selectedFile: event.target.files,
    });
  };

  UploadImage() {
    const fd= new FormData();
    fd.append("image",this.state.selectedFile,this.state.selectedFile.name);

  }
  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      bio: this.state.bio,
      location: this.state.location,
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
      bio: "",
      location: "",
      role: "",
    });
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container mt-5">
          <h3>Create New User</h3>
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

              <label>Biography: </label>
              <input
                type="text"
                required
                className="form-control"
                value={this.state.bio}
                onChange={this.onChangeBio}
              />

              <label>Location: </label>
              <input
                type="text"
                required
                className="form-control"
                value={this.state.location}
                onChange={this.onChangeLocation}
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

            <label>image: </label>
            <input type="file" required onChange={this.onChangeImage} />

            <div className="form-group">
              <input
                type="submit"
                value="Create User"
                className="btn btn-primary mt-4"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
