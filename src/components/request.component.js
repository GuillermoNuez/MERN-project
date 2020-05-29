import React, { Component } from "react";
import axios from "axios";
import "../../src/index.css";
import Navbar from "./navbar.component";
import { getFromStorage } from "../utils/storage";
const Order = (props) => (
  <ul className="list-group w-25 ml-2 mr-2 mb-4">
    <li className="list-group-item active">{props.order.idpedido}</li>

    {props.order.products.map((item) => {
      console.log(item);
      return (
        <li className="list-group-item d-flex">
          <span className="w-75">{item.idproduct}</span>
          <span className="w-25 text-right">{item.products.amount}</span>
        </li>
      );
    })}
  </ul>
);

export default class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
      cookie: "",
    };
  }

  componentDidMount() {
    const { cookie } = getFromStorage("the_main_app");

    this.setState({
      cookie: cookie,
    });

    axios
      .get("http://localhost:5000/Cart/request/" + cookie._id)
      .then((response) => {
        console.log(response.data);
        this.setState({
          requests: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  RequestList() {
    return this.state.requests.map((currentorder) => {
      return <Order order={currentorder} />;
    });
  }

  render() {
    const { cookie } = this.state;
    if (cookie) {
      return (
        <div>
          <Navbar />

          <div className="container mt-5">
            <h2 className="mb-5">My requests</h2>
            <div className="row">{this.RequestList()}</div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Navbar />
          <div className="container mt-5">
            <h2>You must be logged in to see your request</h2>
          </div>
        </div>
      );
    }
  }
}
