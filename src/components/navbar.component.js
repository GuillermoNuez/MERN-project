import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getFromStorage } from "../utils/storage";

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = { cookie: null };
  }

  componentDidMount() {
    try {
      const { cookie } = getFromStorage("the_main_app");
      this.setState({
        cookie: cookie,
      });
    } catch {}
  }
  render() {
    if(!this.state.cookie) {
      return (
        <div class="row nav2 ">
          <div class="nav2-logo">
            <Link to="/" className="navbar-brand header-logo"></Link>
          </div>
          <div class="nav2-links">
            <Link to="/users" className="nav-link">
              Farmers
            </Link>
            <Link to="/createproduct" className="nav-link">
              Products
            </Link>
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </div>
        </div>
      );
    }
    else {
      return (
        <div class="row nav2 ">
          <div class="nav2-logo">
            <Link to="/" className="navbar-brand header-logo"></Link>
          </div>
          <div class="nav2-links">
            <Link to="/users" className="nav-link">
              Farmers
            </Link>
            <Link to="/createproduct" className="nav-link">
              Products
            </Link>
            <Link to="/login" className="nav-link">
              My Profile
            </Link>
          </div>
        </div>
      );
    }

  }
}
