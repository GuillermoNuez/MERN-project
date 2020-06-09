import React, { Component } from "react";
import axios from "axios";
import Navbar from "../components/navbar.component";
import { Modal } from "react-bootstrap";
// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.openmodal = this.openmodal.bind(this);
    this.closemodal = this.closemodal.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      role: "Client",
      selectedFile: null,
      openmodal: false,
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

  openmodal(id) {
    this.setState({ openmodal: true });
  }

  closemodal() {
    this.setState({ openmodal: false });
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
        <div className="container login-container mt-2 pt-5">
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

              <label>
                Role{" "}
                <span className="no-button" onClick={this.openmodal}>
                  <FontAwesomeIcon icon={faInfoCircle} />
                </span>
              </label>

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
              <input
                type="submit"
                value="Sign up"
                className="btn registerbutton"
              />
            </div>
          </form>
        </div>
        <Modal
          show={this.state.openmodal}
          onHide={this.closemodal}
          centered
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
        >
          <Modal.Header closeButton className="modal-head">
            <Modal.Title>
              <span className="deletehead">Info about roles</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="pt-4 pb-4 d-flex flex-column align-items-center">
            <span className="deletebody">
              <h5>Client role:</h5> - This type of user can <span className="bold"> buy products</span> from our farmers. <br/>
              - You  <span className="bold">can't sell</span> your own products. <br/><br/>
              <h5>Farmer role:</h5>
              - You<span className="bold"> can sell products</span> to our clients. <br/>
              - You can't buy products from other farmers.
            </span>

            <button
              variant="primary"
              onClick={this.closemodal}
              className="btn btn-success mt-4 w-25"
            >
              I understand
            </button>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
