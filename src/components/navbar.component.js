import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getFromStorage } from "../utils/storage";
import axios from "axios";

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = { cookie: null, cartamount: "", cartclass: "hidden",msgclass: "hidden", unreadmessages:"" };
  }

  componentDidMount() {
    try {
      const { cookie } = getFromStorage("the_main_app");
      this.setState({
        cookie: cookie,
      });

      axios
        .get("http://localhost:5000/Cart/getcheckoutlenght/" + cookie._id)
        .then((response) => {
          this.setState({
            cartamount: response.data,
          });
          if (response.data != 0) {
            this.setState({
              cartclass: "cartnumber",
            });
          }

          if (cookie.role == "Farmer" || cookie.role == "Client" ) {
            axios
              .get("http://localhost:5000/Chat/getunread/" + cookie._id)
              .then((response) => {
                if (response.data != 0) {
                  this.setState({
                    msgclass: "cartnumber",
                  });
                  this.setState({unreadmessages:response.data});
                }   
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch {}
  }
  render() {
    if (!this.state.cookie) {
      return (
        <div className="row nav2 ">
          <div className="nav2-logo">
            <Link to="/" className="navbar-brand header-logo"></Link>
          </div>
          <div className="nav-links">
            <Link to="/users" className="nav-link">
              Farmers
            </Link>
            <Link to="/products" className="nav-link">
              Products
            </Link>
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </div>
        </div>
      );
    } else {
      if (this.state.cookie.role == "Client") {
        return (
          <div className="row nav2 ">
            <div className="nav2-logo">
              <Link to="/" className="navbar-brand header-logo"></Link>
            </div>
            <div className="nav3-links">
              <Link to="/users" className="nav-link">
                Farmers
              </Link>
              <Link to="/products" className="nav-link">
                Products
              </Link>
              <Link to="/myprofile" className="nav-link">
                My Profile
              </Link>

              <Link to="/MyCart" className="myCart">
                <div className="myCart-logo">
                  <p className="basket-logo"></p>
                  <p className={this.state.cartclass}>
                    {this.state.cartamount}
                  </p>
                </div>
              </Link>

                            <Link to="/chats" className="myCart">
                <div className="myCart-logo">
                  <p className="msg-logo"></p>
                  <p className={this.state.msgclass}>
                    {this.state.unreadmessages}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        );
      }

      if (this.state.cookie.role == "Farmer") {
        return (
          <div className="row nav2 ">
            <div className="nav2-logo">
              <Link to="/" className="navbar-brand header-logo"></Link>
            </div>
            <div className="nav2-links">
              <Link to="/users" className="nav-link">
                Farmers
              </Link>
              <Link to="/products" className="nav-link">
                Products
              </Link>
              <Link to="/myprofile" className="nav-link">
                My Profile
              </Link>
              <Link to="/chats" className="myCart">
                <div className="myCart-logo">
                  <p className="msg-logo"></p>
                  <p className={this.state.msgclass}>
                    {this.state.unreadmessages}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        );
      }
      if (this.state.cookie.role == "Admin") {
        return (
          <div className="row nav2 ">
            <div className="nav2-logo">
              <Link to="/" className="navbar-brand header-logo"></Link>
            </div>
            <div className="nav2-links">
              <Link to="/users" className="nav-link">
                Farmers
              </Link>
              <Link to="/products" className="nav-link">
                Products
              </Link>
              <Link to="/adminpanel" className="nav-link">
                Admin panel
              </Link>
            </div>
          </div>
        );
      }
    }
  }
}
