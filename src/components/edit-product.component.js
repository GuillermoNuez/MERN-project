import React, { Component } from "react";
import axios from "axios";
import Navbar from "../components/navbar.component";
import "react-datepicker/dist/react-datepicker.css";

export default class EditExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeProduct = this.onChangeProduct.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeShipping = this.onChangeShipping.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      product: "",
      type: "",
      shipping: "",
      price: "",
      users: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/products/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          username: response.data.username,
          product: response.data.product,
          type: response.data.type,
          shipping: response.data.shipping,
          price: response.data.price,
        });
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get("http://localhost:5000/users/")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map((user) => user.username),
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeProduct(e) {
    this.setState({
      product: e.target.value,
    });
  }
  onChangeType(e) {
    this.setState({
      type: e.target.value,
    });
  }

  onChangeShipping(e) {
    this.setState({
      shipping: e.target.value,
    });
  }

  onChangePrice(e) {
    this.setState({
      price: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const product = {
      username: this.state.username,
      product: this.state.product,
      type: this.state.type,
      duration: this.state.duration,
      shipping: this.state.shipping,
      price: this.state.price,
    };

    console.log(product);

    axios
      .post(
        "http://localhost:5000/products/update/" + this.props.match.params.id,
        product
      )
      .then((res) => console.log(res.data));
      window.location = "/products";
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container mt-5">
          <h3>Edit Product Log</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Username: </label>
              <select
                ref="userInput"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
              >
                {this.state.users.map(function (user) {
                  return (
                    <option key={user} value={user}>
                      {user}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <label>Product: </label>
              <input
                type="text"
                required
                className="form-control"
                value={this.state.product}
                onChange={this.onChangeProduct}
              />
            </div>
            <div className="form-group">
              <label>Type: </label>
              <input
                type="text"
                className="form-control"
                value={this.state.type}
                onChange={this.onChangeType}
              />
            </div>
            <div className="form-group">
              <label>Shipping: </label>
              <input
                type="text"
                className="form-control"
                value={this.state.shipping}
                onChange={this.onChangeShipping}
              />
            </div>

            <div className="form-group">
              <label>Price: </label>
              <input
                type="number"
                className="form-control"
                value={this.state.price}
                onChange={this.onChangePrice}
              />
            </div>

            <div className="form-group">
              <input
                type="submit"
                value="Edit Product Log"
                className="btn btn-primary"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
