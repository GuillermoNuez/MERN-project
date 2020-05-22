import React, { Component } from "react";
import axios from "axios";
import "../../src/index.css";
import Navbar from "./navbar.component";
import { getFromStorage } from "../utils/storage";

const Product = (props) => (
  <div className="cart-item">
    <img className="cart-item-img" />
    <p className="cart-item-name ml-4">{props.product.product}</p>
    <p className="cart-item-amount">{props.product.amount}kg</p>
    <p className="cart-item-price">{props.product.price*props.product.amount}€</p>
    <a
      href="#"
      className="cart-item-delete"
      onClick={() => {
        props.deleteProduct(props.product.productid);
      }}
    >
      X
    </a>
  </div>
);

export default class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.addtocart = this.addtocart.bind(this);
    this.state = { products: [], cookie: "" };
  }

  componentDidMount() {
    const { cookie } = getFromStorage("the_main_app");

    this.setState({
      cookie: cookie,
    });
    axios
      .get("http://localhost:5000/Cart/" + cookie._id)
      .then((response) => {
        console.log(response.data);
        this.setState({ products: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addtocart(id) {
    // console.log(this.state.products[0]);
    console.log(id);
    const { cookie } = this.state;

    const newProduct = {
      userid: cookie.userid,
      productid: id,
      amount: 1,
    };

    axios
      .post("http://localhost:5000/Cart/add", newProduct)
      .then((res) => console.log(res.data))
      .then((window.location = "/MyCart"));
  }

  deleteProduct(id) {
    fetch("http://localhost:5000/Cart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        userid: this.state.cookie,
      }),
    });

    window.location = "/MyCart";
  }

  ProductList() {
    return this.state.products.map((currentproduct) => {
      return (
        <Product
          product={currentproduct}
          deleteProduct={this.deleteProduct}
          addtocart={this.addtocart}
          key={currentproduct.productid}
        />
      );
    });
  }

  render() {
    return (
      <div className="seeproduct pb-5">
        <Navbar />
        <div className="container mt-5">
          <div className="row d-flex justify-content-center mt-5 mb-5">
            <div className="cart-box">
              <h2>
                <span>(0)</span> Articles in <span>your cart</span>
              </h2>
              <div className="cold-md-12 cart-box-head d-flex align-items-center mb-3">
                <div className="col-md-7">
                  <h4>Product</h4>
                </div>
                <div className="col-md-5 d-flex d-row justify-content-between">
                  <h4>Quantity</h4>
                  <h4>Total</h4>
                </div>
              </div>
              <div className="cart-list">
                {/* <div className="cart-item">
                  <img className="cart-item-img" />
                  <p className="cart-item-name ml-4">Article Name</p>
                  <p className="cart-item-amount">5kg</p>
                  <p className="cart-item-price">5€</p>
                  <p className="cart-item-delete">X</p>
                </div> */}
                {this.ProductList()}
              </div>
              <div className="col-md-12 d-flex justify-content-between ml-0">
                <button className="cart-actions">Empty cart</button>
                <button className="cart-actions">Continue shopping</button>
              </div>
            </div>
            <div className="cart-box">
              <h2>
                <span>Shipping info</span>
              </h2>
              <form onSubmit={this.onSubmit} className="col-md-12">
                <div className="row d-flex ml-3 pr-5 justify-content-between mb-5 mt-5">
                  <label>Name: </label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    value={this.state.product}
                    onChange={this.onChangeProduct}
                  />
                </div>
                <div className="row d-flex ml-3 pr-5 justify-content-between mb-5">
                  <label>Adress: </label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    value={this.state.product}
                    onChange={this.onChangeProduct}
                  />
                </div>
                <div className="row d-flex ml-3 pr-5 justify-content-between mb-5">
                  <label>Phone number: </label>
                  <input
                    type="text"
                    required
                    className="form-control medium-input"
                    value={this.state.product}
                    onChange={this.onChangeProduct}
                  />
                  <label>Zip code: </label>
                  <input
                    type="text"
                    required
                    className="form-control small-input"
                    value={this.state.product}
                    onChange={this.onChangeProduct}
                  />
                </div>

                <div className="row d-flex ml-3 pr-5 justify-content-between mb-3">
                  <label>Payment: </label>
                  <input
                    type="text"
                    required
                    className="form-control "
                    value={this.state.product}
                    onChange={this.onChangeProduct}
                  />
                </div>

                <input
                  type="submit"
                  value="Proceed to checkout"
                  className="createbutton"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
