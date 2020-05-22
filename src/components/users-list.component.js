import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../src/index.css";
import Navbar from "./navbar.component";

const Exercise = (props) => (
  <div className="card ml-3 mt-5 carta ">
    <div className="card-body">
      <h5 className="card-title">{props.user.username}</h5>
      <div className="row ml-1 mb-3">
        <div className="col-md-7">
          <p className="card-text description">{props.user.bio}</p>
        </div>
        <div className="col-md-5">
          <Link className="viewprofile" to={"/user/" + props.user._id}>
            View Profile
          </Link>
        </div>
      </div>
      <p className="localidad">{props.user.location}</p>
      <div class="col.md-6"></div>
    </div>
  </div>
);

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.state = { users: [], cookie: "" };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/Users/")
      .then((response) => {
        this.setState({ users: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  userList() {
    return this.state.users.map((currentuser) => {
      return (
        <Exercise
          user={currentuser}
          deleteUser={this.deleteUser}
          addtocart={this.addtocart}
          key={currentuser._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-4">
              <h2>Latest farmers</h2>
              <div className="col-md-12">{this.userList()}</div>
            </div>
            <div className="cold-md-8">
              <h2>Season products</h2>
              <div className="d-flex justify-content-between">
                <div className="productcard mt-5"></div>
                <div className="productcard mt-5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
