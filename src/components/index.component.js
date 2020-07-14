import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class TodosList extends Component {
  render() {
    return (
      <div id="index">
        <div className="row header">
          <div className="header-img">
            <div className="row nav">
              <div className="nav2-logo">
                <Link to="/" className="navbar-brand header-logo"></Link>
              </div>
              <div className="nav2-links2">
                <a href="#about_us">About Us</a>
                <a href="#farmers">Farmers</a>
                <a href="#blog">Blog</a>
                <a href="#contact">Contact</a>
                <Link to="/users" className="nav-link">
                  App
                </Link>
              </div>
            </div>
            <div className="row w-100 mt-5 header-container d-flex flex-column">
              <h1 className="bold mb-4">LANDING PAGE</h1>
              <h3 className="mt-2">Bottom text.</h3>
            </div>
          </div>
        </div>

        <div className="row footer pb-5 justify-content-around pt-5">
          <div className="col-md-2 d-flex flex-column">
            <a href="#about_us">About Us</a>
            <a href="#farmers">Farmers</a>
            <a href="#blog">Blog</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="col-md-3">
            <div className="footer-img"></div>
          </div>
          <div className="col-md-3">
            <div className="row mb-3">
              <h4>Subscribe to the newsletter</h4>
            </div>
            <div className="row justify-content-between">
              <input
                type="text"
                placeholder="Description"
                className="contact-input-3"
              ></input>
              <div className="footer-button">Submit</div>
            </div>
          </div>
        </div>
        <div class="row footer pb-3 justify-content-around">
          <p>
            Copytight Name 2019. All rights reserved.{" "}
            <a href="#">Terms of Service</a> - <a href="#">Privacy Policy</a>
          </p>
        </div>
      </div>
    );
  }
}
