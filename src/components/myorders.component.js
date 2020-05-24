import React, { Component } from "react";
import axios from "axios";
import "../../src/index.css";
import Navbar from "./navbar.component";
import { getFromStorage } from "../utils/storage";
const Order = (props) => (
  <ul class="list-group w-25 ml-2 mr-2 mt-4">
    <li class="list-group-item active">Order number: {props.order._id}</li>
    {props.order.products.map((item) => {
      return (
        <li class="list-group-item d-flex">
          <span className="w-25 text-center">{item.product}</span>
          <span className="w-25 text-right">{item.amount}kg</span>
          <span className="w-50 text-right">{item.amount * item.price}€</span>
        </li>
      );
    })}
    <h4 className="mt-3 mb-3">Shipping info</h4>
    <li class="list-group-item">Name: {props.order.name}</li>
    <li class="list-group-item">C/: {props.order.adress}</li>
    <li class="list-group-item">Tlfn: {props.order.phonenumber}</li>
    <li class="list-group-item">Zip: {props.order.zipcode}</li>
    <a
      href="#"
      className="cart-item-delete"
      onClick={() => {
        props.deleteOrder(props.order._id);
      }}
    >
      X
    </a>
  </ul>
);

export default class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.deleteOrder = this.deleteOrder.bind(this);
    this.state = {
      orders: [],
      cookie: "",
    };
  }

  componentDidMount() {
    const { cookie } = getFromStorage("the_main_app");

    this.setState({
      cookie: cookie,
    });

    axios
      .get("http://localhost:5000/Cart/getcheckout/" + cookie._id)
      .then((response) => {
        this.setState({
          orders: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteOrder(id) {
    fetch("http://localhost:5000/Cart/deletechechout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        userid: this.state.cookie,
      }),
    });

    window.location = "/myorders";
    console.log(id);
  }
  OrderList() {
    return this.state.orders.map((currentorder) => {
      return <Order order={currentorder} deleteOrder={this.deleteOrder} />;
    });
  }

  render() {
    const { cookie } = this.state;
    if (cookie) {
      return (
        <div>
          <Navbar />

          <div className="container mt-5">
            <h2 className="mb-5">My orders</h2>
            <div className="row"> {this.OrderList()}</div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Navbar />
          <div className="container mt-5">
            <h2>You must be logged in to see your orders</h2>
          </div>
        </div>
      );
    }
  }
}
