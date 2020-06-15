import React, { Component } from "react";
import axios from "axios";
import Navbar from "../components/navbar.component";
import { getFromStorage } from "../utils/storage";

const Product = (props) => <option>{props.product.product}</option>;

export default class CreateProduct extends Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeBody = this.onChangeBody.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeProduct = this.onChangeProduct.bind(this);
    this.productList = this.productList.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      cookie: "",

      title: "",
      body: "",
      price: "",
      product: "",

      selectedproduct: {},
      products: [],
    };
  }

  productList() {
    return this.state.products.map((currentproduct) => {
      return <Product product={currentproduct} />;
    });
  }

  componentDidMount() {
    const obj = getFromStorage("the_main_app");

    if (obj && obj.cookie) {
      const { cookie } = obj;

      this.setState({
        cookie: cookie,
      });

      axios
        .get("http://localhost:5000/products/getuser/" + cookie._id)
        .then((response) => {
          this.setState({
            products: response.data,
          });
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }
  onChangeBody(e) {
    this.setState({
      body: e.target.value,
    });
  }
  onChangePrice(e) {
    this.setState({
      price: e.target.value,
    });
  }
  onChangeProduct(e) {
    this.state.products.forEach((element) => {
      if (element.product == e.target.value) {
        this.setState({ selectedproduct: element });
      }
    });

    this.setState({
      product: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    let info = {
      userid: this.state.cookie._id,
      username: this.state.cookie.username,
      title: this.state.title,
      body: this.state.body,
      price: this.state.price,
      product: this.state.selectedproduct,
    };
    console.log(info);
    axios.post("http://localhost:5000/users/testemail", info);
    this.setState({
      title: "",
      body: "",
      price: "",
      product: "",
    });
  }

  render() {
    const { cookie } = this.state;
    if (cookie) {
      if (cookie.role == "Client") {
        return (
          <div>
            <Navbar />
            <div className="container mt-5">
              <h2>You dont have permissions to create a product as a Client</h2>
            </div>
          </div>
        );
      } else {
        return (
          <div className="gray">
            <Navbar />
            <div className="container mt-5">
              <h3>Notify your clients</h3>
              <form onSubmit={this.onSubmit} className="create-product mt-5">
                <div>
                  <div className="form-group ">
                    <label>Email title: </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      value={this.state.title}
                      onChange={this.onChangeTitle}
                    />
                  </div>

                  <div className="form-group ">
                    <label>Email body : </label>
                    <textarea
                      type="text"
                      required
                      className="form-control notify"
                      value={this.state.body}
                      onChange={this.onChangeBody}
                    />
                  </div>
                </div>
                <div>
                  <div className="form-group">
                    <label>Price: </label>
                    <input
                      type="number"
                      required
                      className="form-control"
                      value={this.state.price}
                      onChange={this.onChangePrice}
                    />
                  </div>
                  <div className="form-group">
                    <label>Product : </label>
                    <select
                      className="form-control"
                      required
                      onChange={this.onChangeProduct}
                      value={this.state.product}
                    >
                      <option></option>
                      {this.productList()}
                    </select>
                  </div>
                  <div className="form-group">
                    <input
                      type="submit"
                      value="Send notification"
                      className="createbutton"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        );
      }
    } else {
      return (
        <div>
          <Navbar />
          <div className="container mt-5">
            <h2>You must be logged in to create a product</h2>
          </div>
        </div>
      );
    }
  }
}
