import React, { Component } from "react";
import axios from "axios";
import Navbar from "../components/navbar.component";
import "react-datepicker/dist/react-datepicker.css";

export default class EditExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRepeatPassword = this.onChangeRepeatPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      password: "",
      repeatpassword: "",
      boxclass: "",
      box2: "hidden",
    };
  }

  componentDidMount() {}

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onChangeRepeatPassword(e) {
    this.setState({
      repeatpassword: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.state.password != this.state.repeatpassword) {
      console.log("Passwords doesnt match");
    } else {
      let info = {
        userid: this.props.match.params.id,
        password: this.state.password,
      };

      axios
        .post("http://localhost:5000/users/updatepassword", info)
        .then((response) => {
          this.setState({
            product: response.data.product,
          });
        });

      this.setState({
        password: "",
        repeatpassword: "",
        boxclass: "hidden",
        box2: "",
      });
    }
  }

  render() {
    return (
      <div className="login-bg">
        <Navbar />
        <div className="container login-container mt-5 pt-5">
          <form onSubmit={this.onSubmit} className="mt-5">
            <div className="login-logo mb-4"></div>
            <h3 className="mt-4 mb-4">Recover password</h3>
            <div className={this.state.boxclass}>
              <label>Password </label>
              <input
                type="password"
                required
                className="form-control mb-4"
                // placeholder="Example@gmail.com"
                value={this.state.password}
                onChange={this.onChangePassword}
              />
              <label>Repeat password </label>
              <input
                type="password"
                required
                className="form-control"
                // placeholder="Example@gmail.com"
                value={this.state.repeatpassword}
                onChange={this.onChangeRepeatPassword}
              />
              <input
                type="submit"
                value="Confirm"
                className="btn registerbutton mt-5"
              />
            </div>
            <div className={this.state.box2}>
    
              <p>Password changed successfully</p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
