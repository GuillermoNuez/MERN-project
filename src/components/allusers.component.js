import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../src/index.css";
import Navbar from "./navbar.component";
import { getFromStorage } from "../utils/storage";

const User = (props) => (
  <div className="alluser-card mb-3 mr-2 ml-2">
    <div className="col-md-4 pl-0">
      <img src={"/userpics/" + props.user.photo} class="user-image mr-3" />
    </div>
    <div className="col-md-8">
      <h5 className="card-title mb-3">{props.user.username}</h5>
      <div className="col-md-12 d-flex justify-content-between mb-4">
        <div className=" d-flex">
          <p className="location"></p>
          <span>{props.user.location}</span>
        </div>


      </div>

      <Link className="viewfarmer" to={"/user/" + props.user._id}>
        View Farmer
      </Link>
    </div>
  </div>
);

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [], cookie: "" };
  }

  componentDidMount() {
    try {
      const { cookie } = getFromStorage("the_main_app");
      this.setState({
        cookie: cookie,
      });
    } catch {}

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
      console.log(currentuser);
      if (this.state.cookie) {
        if (currentuser._id != this.state.cookie._id) {
          return <User user={currentuser} key={currentuser._id} />;
        }
      } else {
        return <User user={currentuser} key={currentuser._id} />;
      }
    });
  }

  render() {
    return (
      <div className="gray">
        <Navbar />
        <div className="container mt-5">
          <div className="row mb-5 d-flex align-items-center justify-content-between">
            <div className="row d-flex align-items-center justify-content-between">
              <h3>Farmers</h3>
            </div>
            <div className="row d-flex align-items-center justify-content-between">
              <input
                type="text"
                className="form-control search-form ml-4 mr-4"
                placeholder="Search product..."
                value={this.state.search}
                onChange={this.onChangeSearch}
              />
              <span>Rating : </span>

              <select
                onChange={this.onChangePrice}
                value={this.state.price}
                className="ml-4 mr-4"
              >
                <option></option>
                <option>Lower to higher</option>
                <option>Higher to lower</option>
              </select>
            </div>
          </div>

          <div className="row">{this.userList()}</div>
        </div>
      </div>
    );
  }
}
