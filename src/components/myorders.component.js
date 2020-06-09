import React, { Component } from "react";
import axios from "axios";
import "../../src/index.css";
import Navbar from "./navbar.component";
import { getFromStorage } from "../utils/storage";
import { Modal } from "react-bootstrap";

const Order = (props) => (
  <div className="myorder ml-2 mr-2">
    <p className="orderdate">Order date : {props.order.createdAt}</p>
    <p className="ordernumber">Order number : {props.order._id}</p>
    <div className="ordercontainer d-flex flex-column align-items-center mt-3">
      <div className="col-md-12 d-flex flex-column orderproducts align-items-center">
        <div className="d-flex w-100">
          <p className="w-50 orderamount">
            <span className="bold">({props.order.products.length}) </span>{" "}
            article(s)
          </p>
          <p className="w-50 orderstatus">Status: {props.order.status}</p>
        </div>
        <div className="products-container">
          {props.order.products.map((item) => {
            return (
              <div className="row w-100 justify-content-center">
                <p className="mr-2">{item.product} - </p>
                <p> {item.amount}kg</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    <div className="ordercontainer d-flex flex-column align-items-center mt-3">
      <div className="col-md-12 d-flex flex-column orderproducts align-items-center">
        <div className="w-100 text-center order-head-black mb-3">
          Shipping info
        </div>

        <p>Name: {props.order.name}</p>
        <p>Address: {props.order.adress}</p>
        <p>Phone number: {props.order.phonenumber}</p>
        <p>Zip: {props.order.zipcode}</p>
      </div>
    </div>
    <div className="trash-box">
      <div
        className="cart-item-delete trash-can"
        onClick={() => {
          props.deleteOrder(props.order._id);
        }}
        className="trash-container"
      >
        <p className="trash"></p>
      </div>
    </div>
  </div>
);

const Order2 = (props) => (
  <div className="myorder ml-2 mr-2">
    <p className="orderdate">Order date : {props.order.createdAt}</p>
    <p className="ordernumber">Order number : {props.order._id}</p>
    <div className="ordercontainer d-flex flex-column align-items-center mt-3">
      <div className="col-md-12 d-flex flex-column orderproducts align-items-center">
        <div className="d-flex w-100">
          <p className="w-50 orderamount">
            <span className="bold">({props.order.products.length}) </span>{" "}
            article(s)
          </p>
          <p className="w-50 orderstatus">Status: {props.order.status}</p>
        </div>
        <div className="products-container">
          {props.order.products.map((item) => {
            return (
              <div className="row w-100 justify-content-center">
                <p className="mr-2">{item.product} - </p>
                <p> {item.amount}kg</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    <div className="ordercontainer d-flex flex-column align-items-center mt-3">
      <div className="col-md-12 d-flex flex-column orderproducts align-items-center">
        <div className="w-100 text-center order-head-black mb-3">
          Shipping info
        </div>

        <p>Name: {props.order.name}</p>
        <p>C/: {props.order.adress}</p>
        <p> {props.order.phonenumber}</p>
        <p>Zip: {props.order.zipcode}</p>
      </div>
    </div>
  </div>
);

export default class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.deleteOrder = this.deleteOrder.bind(this);
    this.openmodal = this.openmodal.bind(this);
    this.closemodal = this.closemodal.bind(this);
    this.deleteComment = this.deleteComment.bind(this);

    this.state = {
      orders: [],
      cookie: "",
      open: false,
      idtoremove: "",
    };
  }

  openmodal() {
    this.setState({ open: true });
  }
  closemodal() {
    this.setState({ open: false, idtoremove: "" });
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
    this.setState({ open: true, idtoremove: id });
  }

  deleteComment() {
    fetch("http://localhost:5000/Cart/deletechechout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: this.state.idtoremove,
        userid: this.state.cookie,
      }),
    });

    window.location = "/myorders";
  }
  OrderList() {
    return this.state.orders.map((currentorder) => {
      console.log(currentorder);
      if (currentorder.status == "in preparation") {
        return <Order order={currentorder} deleteOrder={this.deleteOrder} />;
      } else {
        return <Order2 order={currentorder} deleteOrder={this.deleteOrder} />;
      }
    });
  }

  render() {
    const { cookie } = this.state;
    if (cookie) {
      return (
        <div className="gray">
          <Navbar />

          <div className="container mt-5 d-flex flex-column align-items-center">
            <h2 className="mb-5 w-100 text-left">My orders</h2>
            <div className="row"> {this.OrderList()}</div>
          </div>
          <Modal
            show={this.state.open}
            onHide={this.closemodal}
            centered
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
          >
            <Modal.Header closeButton className="modal-head">
              <Modal.Title>
                <span className="deletehead">Delete Order</span>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="pt-4 pb-4 d-flex flex-column align-items-center">
              <span className="deletebody">
                Are you sure you want to <span className="bold"> delete </span>{" "}
                this order, this action is
                <span className="bold"> irreversible</span>
              </span>

              <button
                variant="primary"
                onClick={this.deleteComment}
                className="deleteorder mt-3"
              >
                Delete
              </button>
            </Modal.Body>
          </Modal>
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
