import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
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
}
