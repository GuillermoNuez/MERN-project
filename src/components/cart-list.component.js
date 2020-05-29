import React, { Component } from "react";
import axios from "axios";
import "../../src/index.css";
import Navbar from "./navbar.component";
import { getFromStorage } from "../utils/storage";

const Product = (props) => (
  <div className="cart-item">
    <img
      className="cart-item-img"
      src={"/productpics/" + props.product.image}
    />
    <p className="cart-item-name ml-4">{props.product.product}</p>
    <p className="cart-item-amount">{props.product.amount}kg</p>
    <p className="cart-item-price">
      {props.product.price * props.product.amount}€
    </p>
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
    this.onChangeAdress = this.onChangeAdress.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePayment = this.onChangePayment.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeZip = this.onChangeZip.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.emptyCart = this.emptyCart.bind(this);

    this.state = {
      products: [],
      cookie: "",

      name: "",
      adress: "",
      phonenumber: "",
      zipcode: "",
      payment: "",
      total: 0,
    };
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
        let total = 0;
        for (let index = 0; index < response.data.length; index++) {
          total += response.data[index].price * response.data[index].amount;
        }
        this.setState({ total: total });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeAdress(e) {
    this.setState({
      adress: e.target.value,
    });
  }

  onChangePhone(e) {
    this.setState({
      phonenumber: e.target.value,
    });
  }

  onChangeZip(e) {
    this.setState({
      zipcode: e.target.value,
    });
  }

  onChangePayment(e) {
    this.setState({
      payment: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const info = {
      idclient: this.state.cookie._id,
      products: this.state.products,
      name: this.state.name,
      adress: this.state.adress,
      phonenumber: this.state.phonenumber,
      zipcode: this.state.zipcode,
      payment: this.state.payment,
    };

    console.log(info);

    axios.post("http://localhost:5000/Cart/addcheckout", info).then((res) => {
      console.log(res.data);
      if (res.data == "OK") {
        window.location = "/MyCart";
      }
    });
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
  emptyCart() {
    fetch("http://localhost:5000/Cart/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid: this.state.cookie._id,
      }),
    });
    window.location = "/MyCart";
  }
  keepShoping() {
    window.location = "/products";
  }
  ProductList() {
    return this.state.products.map((currentproduct) => {
      return (
        <Product
          product={currentproduct}
          deleteProduct={this.deleteProduct}
          key={currentproduct.productid}
        />
      );
    });
  }

  render() {
    return (
      <div className="gray">
        <Navbar />
        <div className="container mt-5">
          <div className="row d-flex justify-content-center mt-5 mb-5">
            <div className="cart-box">
              <h2>
                <span>({this.state.products.length})</span> Articles in{" "}
                <span>your cart</span>
              </h2>
              <div className="cold-md-12 cart-box-head d-flex align-items-center justify-content-center mb-3">
                <div className="col-md-7">
                  <h4 className="mb-0">Product</h4>
                </div>
                <div className="col-md-5 d-flex d-row justify-content-between">
                  <h4 className="mb-0">Quantity</h4>
                  <h4 className="mb-0">Total</h4>
                </div>
              </div>
              <div className="cart-list">{this.ProductList()}</div>
              <div className="col-md-12 d-flex justify-content-between ml-0">
                <button className="cart-actions" onClick={this.emptyCart}>
                  Empty cart
                </button>
                <button className="cart-actions" onClick={this.keepShoping}>
                  Continue shopping
                </button>
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
                    value={this.state.name}
                    onChange={this.onChangeName}
                  />
                </div>
                <div className="row d-flex ml-3 pr-5 justify-content-between mb-5">
                  <label>Adress: </label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    value={this.state.adress}
                    onChange={this.onChangeAdress}
                  />
                </div>
                <div className="row d-flex ml-3 pr-5 justify-content-between mb-5">
                  <label>Phone number: </label>
                  <input
                    type="text"
                    required
                    className="form-control medium-input"
                    value={this.state.phonenumber}
                    onChange={this.onChangePhone}
                  />
                  <label>Zip code: </label>
                  <input
                    type="text"
                    required
                    className="form-control small-input"
                    value={this.state.zipcode}
                    onChange={this.onChangeZip}
                  />
                </div>

                <div className="row d-flex ml-3 pr-5 justify-content-between mb-3">
                  <label>Payment: </label>
                  <input
                    type="text"
                    required
                    className="form-control "
                    value={this.state.payment}
                    onChange={this.onChangePayment}
                  />
                </div>
                <div className="d-flex flex-column align-items-center">
                <p className="total">Total : {this.state.total}€</p>
                <input
                  type="submit"
                  value="Proceed to checkout"
                  className="createbutton"
                />
             </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
