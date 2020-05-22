import React, { Component } from "react";
import axios from "axios";
import Navbar from "../components/navbar.component";
import "react-datepicker/dist/react-datepicker.css";

export default class EditExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeProduct = this.onChangeProduct.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeSeason = this.onChangeSeason.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      product: "",
      description: "",
      type: "",
      price: "",
      season: "",
      file: "",
      files: "",
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/products/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          product: response.data.product,
          description: response.data.description,
          type: response.data.type,
          price: response.data.price,
          season: response.data.season,
        });
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
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
    console.log(this.state.type);
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

  fileSelectedHandler = (event) => {
    this.setState({
      file: event.target.files[0],
    });
  };

  filesSelectedHandler = (event) => {
    let fileObj = [];
    let fileArray = [];
    
    console.log(event.target.files);
    const data = new FormData()
    for(var x = 0; x<this.state.selectedFile.length; x++) {
        data.append('file', this.state.selectedFile[x])
    }

    // for (let i = 0; i < fileObj[0].length; i++)X {
    //   fileArray.push(URL.createObjectURL(this.fileObj[0][i]));
    // }
    // this.setState({ files: this.fileArray });

    // axios
    //   .post("http://localhost:5000/Upload/uploadproductphotos", fd)
    //   .then((res) => {
    //     console.log(res);
    //   });
  };

  onSubmit(e) {
    e.preventDefault();

    console.log(this.state.product);
    const product = {
      product: this.state.product,
      description: this.state.description,
      type: this.state.type,
      price: this.state.price,
      season: this.state.season,
    };

    console.log(product);

    axios
      .post(
        "http://localhost:5000/products/update/" + this.props.match.params.id,
        product
      )
      .then((res) => console.log(res.data));
    window.location = "/product/" + this.props.match.params.id;
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container mt-5">
          <h3>Edit product</h3>
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
              <label>Main Photo : </label>
              <input
                type="file"
                className="ml-2"
                required
                accept="image/x-png,image/jpeg"
                onChange={this.fileSelectedHandler}
              />
              <div className="form-group">
                <label>Secondary Photos : </label>
                <input
                  type="file"
                  className="ml-2"
                  required
                  multiple
                  accept="image/x-png,image/jpeg"
                  onChange={this.filesSelectedHandler}
                />
              </div>

              <div className="form-group">
                <input
                  type="submit"
                  value="Confirm changes"
                  className="createbutton"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
