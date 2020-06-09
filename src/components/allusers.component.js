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
      <h5 className="card-title mb-3 bold">{props.user.username}</h5>
      <div className="col-md-12 d-flex justify-content-between mb-4 pl-0">
        <div className=" d-flex bgray align-items-center">
          <p className="location mb-0 mr-1"></p>
          <span>{props.user.location}</span>
        </div>

        <div className=" d-flex bgray2 align-items-center justify-content-end">
          <span>{props.user.score}</span>
          <p className="tomato mb-0 ml-2"></p>
        </div>
      </div>

      <Link className="viewfarmer w-100" to={"/user/" + props.user._id}>
        View Farmer
      </Link>
    </div>
  </div>
);

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onChangeRating = this.onChangeRating.bind(this);
    this.state = {
      users: [],
      originalusers: [],
      cookie: "",
      rating: "",
      type: "",
    };
  }

  componentDidMount() {
    try {
      const { cookie } = getFromStorage("the_main_app");
      this.setState({
        cookie: cookie,
      });
    } catch {}

    axios
      .get("http://localhost:5000/Users/allusers")
      .then((response) => {
        this.setState({ users: response.data, originalusers: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeSearch(e) {
    let users = this.state.originalusers;
    this.setState({
      type: e.target.value,
    });
    if (e.target.value == "") {
      this.setState({
        rating: "",
        users: this.state.originalusers,
      });
    } else {
      console.log(e.target.value.toLowerCase());
      this.setState({
        rating: "",
        users: users.filter((p) => {
          return p.username
            .toLowerCase()
            .includes(e.target.value.toLowerCase());
        }),
      });
    }
  }

  onChangeRating(e) {
    this.setState({
      rating: e.target.value,

    });
    if (e.target.value == "") {
      this.setState({
        type: "",
        users: this.state.originalusers,
      });
      console.log("EMPtY");
    } else {

        if (e.target.value == "Lower to higher") {
          this.setState({
            users: this.state.originalusers,
          });
          this.state.users.sort((a, b) => a.score - b.score);
        } else {
          this.setState({
            users: this.state.originalusers,
          });
          this.state.users.sort((a, b) => b.score - a.score);
        }
      
    }
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
                placeholder="Search user..."
                value={this.state.type}
                onChange={this.onChangeSearch}
              />
              <span>Rating : </span>

              <select
                onChange={this.onChangeRating}
                value={this.state.rating}
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
