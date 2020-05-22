import React, { Component } from "react";
import axios from "axios";
import Navbar from "../components/navbar.component";
import { getFromStorage } from "../utils/storage";
export default class CreateProduct extends Component {
  constructor(props) {
    super(props);

    this.onChangeProduct = this.onChangeProduct.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeSeason = this.onChangeSeason.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      userid: "",

      product: "",
      description: "",
      type: "",
      price: "",
      season: "",

      users: [],
      cookie: "",
    };
  }

  componentDidMount() {
    const obj = getFromStorage("the_main_app");

    if (obj && obj.cookie) {
      const { cookie } = obj;
      console.log("_______");
      console.log(cookie._id);
      this.setState({
        cookie: cookie,
        season: "Spring",
      });
    }
  }

  onChangeProduct(e) {
    this.setState({
      product: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }
  onChangeType(e) {
    this.setState({
      type: e.target.value,
    });
  }

  onChangePrice(e) {
    this.setState({
      price: e.target.value,
    });
  }

  onChangeSeason(e) {
    this.setState({
      season: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = getFromStorage("the_main_app");
    const { cookie } = obj;

    const product = {
      userid: cookie._id,
      product: this.state.product,
      description: this.state.description,
      type: this.state.type,
      price: this.state.price,
      season: this.state.season,
    };

    console.log(product);

    axios
      .post("http://localhost:5000/products/add", product)
      .then((res) => console.log(res.data));

    window.location = "/createproduct";
  }

  render() {
    const { cookie } = this.state;
    if (cookie) {
      return (
        <div>
          <Navbar />
          <div className="container mt-5">
            <h3>Add new product</h3>
            <form onSubmit={this.onSubmit} className="create-product mt-5">
              <div>
                <div className="form-group ">
                  <label>Product: </label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    value={this.state.product}
                    onChange={this.onChangeProduct}
                  />
                </div>

                <div className="form-group ">
                  <label>Description: </label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    value={this.state.description}
                    onChange={this.onChangeDescription}
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
              </div>
              <div>
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
                  <label>Season: </label>
                  <select
                    className="form-control"
                    onChange={this.onChangeSeason}
                    value={this.state.season}
                  >
                    <option>Spring</option>
                    <option>Summer</option>
                    <option>Fall</option>
                    <option>Winter</option>
                  </select>
                </div>

                <div className="form-group">
                  <input
                    type="submit"
                    value="Create Product Log"
                    className="createbutton"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      );
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
