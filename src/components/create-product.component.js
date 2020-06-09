import React, { Component } from "react";
import axios from "axios";
import Navbar from "../components/navbar.component";
import { getFromStorage } from "../utils/storage";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage } from "@fortawesome/free-solid-svg-icons";

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
      file: "",

      users: [],
      cookie: "",
    };
  }

  componentDidMount() {
    const obj = getFromStorage("the_main_app");

    if (obj && obj.cookie) {
      const { cookie } = obj;

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
    const fd = new FormData();
    let aux = this.state.file.name.split(".");

    const product = {
      userid: this.state.cookie._id,
      product: this.state.product,
      description: this.state.description,
      type: this.state.type,
      price: this.state.price,
      season: this.state.season,
      format: aux[1],
    };

    axios.post("http://localhost:5000/products/add", product).then((res) => {
      console.log(res.data);
      if (res.data.status == "OK") {
        if (this.state.file) {
          fd.append("files", this.state.file, res.data.id + "-main." + aux[1]);
          axios
            .post("http://localhost:5000/Upload/uploadproductphoto", fd)
            .then((res) => {
              console.log(res);
            });
        }
      }
    });
    window.location = "/createproduct";
  }

  fileSelectedHandler = (event) => {
    this.setState({
      file: event.target.files[0],
    });
  };

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
                      required
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
                      required
                      className="form-control"
                      value={this.state.price}
                      onChange={this.onChangePrice}
                    />
                  </div>
                  <div className="form-group">
                    <label>Season: </label>
                    <select
                      className="form-control"
                      required
                      onChange={this.onChangeSeason}
                      value={this.state.season}
                    >
                      <option>Spring</option>
                      <option>Summer</option>
                      <option>Fall</option>
                      <option>Winter</option>
                    </select>
                  </div>
                  <label>Image: </label>
                  <input
                    type="file"
                    className="ml-2 d-none"
                    name="uploadimage"
                    id="uploadimage"
                    required
                    accept="image/x-png,image/jpeg"
                    onChange={this.fileSelectedHandler}
                  />
                  <label htmlFor="uploadimage" className="btn btn-sm btn-primary ml-3 whitelabel">
                    <FontAwesomeIcon icon={faFileImage} /> Upload image
                  </label>
                  <div className="form-group">
                    <input
                      type="submit"
                      value="Create product"
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
