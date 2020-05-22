import React, { Component } from "react";
import axios from "axios";
import "../../src/index.css";
import Navbar from "./navbar.component";
import { getFromStorage } from "../utils/storage";
const Order = (props) => (
  <ul class="list-group w-25 ml-2 mr-2">
    <li class="list-group-item active">{/*{props.order._id}*/}</li>
    {props.order.products.map((item) => {
      return (
        <li class="list-group-item d-flex">
          <span className="w-25 text-center">{item.product}</span>
          <span className="w-25 text-right">{item.amount}kg</span>
          <span className="w-50 text-right">{item.amount * item.price}€</span>
        </li>
      );
    })}
  </ul>
);

export default class ProductsList extends Component {
  constructor(props) {
    super(props);
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
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  OrderList() {
    return this.state.orders.map((currentorder) => {
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

            <h2 className="mb-5">My orders</h2>
            <div className="row">  {this.OrderList()}</div>
          
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
