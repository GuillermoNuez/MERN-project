import React, { Component } from "react";
import axios from "axios";
import "../../src/index.css";
import Navbar from "./navbar.component";
import { getFromStorage } from "../utils/storage";
const Order = (props) => (
  <div className="myorder ml-2 mr-2 mb-4">
    <p className="orderdate">Order : {props.order.idpedido}</p>
    <div className="ordercontainer d-flex flex-column align-items-center mt-3">
      <div className="col-md-12 d-flex flex-column orderproducts align-items-center mb-3">
        <div className="d-flex w-100">
          <p className="w-100 orderamount">
            <span className="bold">({props.order.products.length}) </span>{" "}
            article(s)
          </p>
        </div>
        <div className="products-container">
          {props.order.products.map((item) => {
            return (
              <div className="row w-100 justify-content-around mr-0">
                <p>{item.idproduct} </p>
                <p >  {item.products.amount}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </div>
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
