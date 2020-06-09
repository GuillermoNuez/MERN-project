import React, { Component } from "react";
import axios from "axios";
import Navbar from "../components/navbar.component";
import "react-datepicker/dist/react-datepicker.css";
import { getFromStorage } from "../utils/storage";

const LittleImage = (props) => (
  <img className="little-product" src={"/productpics/" + props.photo} />
);

export default class SeeProduct extends Component {
  constructor(props) {
    super(props);

    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      cookie: "",
      product: "",
      amount: 1,
    };
  }

  profilephotoslist() {
    if (this.state.product.images) {
      return this.state.product.images.map((currentphoto) => {
        return <LittleImage photo={currentphoto} />;
      });
    }
  }

  onChangeAmount(e) {
    this.setState({
      amount: e.target.value,
    });
  }

  componentDidMount() {
    const obj = getFromStorage("the_main_app");
    if (obj && obj.cookie) {
      const { cookie } = obj;
      this.setState({
        cookie: obj.cookie._id,
      });
    }
    
    axios
    .get("http://localhost:5000/products/" + this.props.match.params.id)
    .then((response) => {
      this.setState({
        product: response.data,
      });
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const { cookie, amount } = this.state;

    const newProduct = {
      userid: cookie,
      productid: this.props.match.params.id,
      amount: amount,
    };

    console.log(newProduct);
    axios
      .post("http://localhost:5000/Cart/add", newProduct)
      .then((res) => console.log(res.data));

    window.location = "/product/" + this.props.match.params.id;
  }

  render() {
    return (
      <div className="seeproduct pb-5">
        <Navbar />
        <div className="container mt-5">
          <h5>Product detail</h5>
          <hr className="profile-hr"></hr>
          <div className="row d-flex justify-content-center mt-5 mb-5">
            <div className="product-images">
              <img
                className="product-image"
                src={"/productpics/" + this.state.product.image1}
              />
              <div className="col-md-12 d-flex products-row">
                {this.profilephotoslist()}
              </div>
            </div>
            <div>
              <div className="product-info">
                <p className="product-name"> {this.state.product.product}</p>
                <p className="product-price"> {this.state.product.price}€/kg</p>
                <h5>Description</h5>
                <p className="product-description">
                  {this.state.product.description}
                </p>
                <p className="product-season">
                  Season: <span>{this.state.product.season}</span>
                </p>
              </div>
              <div className="product-actions d-flex justify-content-around align-items-center">
                <form
                  onSubmit={this.onSubmit}
                  className=" d-flex justify-content-around align-items-center w-100"
                >
                  <div className="product-amount  d-flex justify-content-center align-items-center">
                    +
                    <input
                      type="number"
                      className="form-control product-input"
                      value={this.state.amount}
                      min="1"
                      onChange={this.onChangeAmount}
                    />
                    - kg
                  </div>

                  <div className="product-add d-flex justify-content-center align-items-center">
                    <input
                      type="submit"
                      value=" Add to cart"
                      className="product-add-btn"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>

          <h5>Related products</h5>
          <hr className="profile-hr mb-5"></hr>

          <div className="col-md-12 products-row d-flex justify-content-between">
            <img className="related-product related-0" />
            <img className="related-product related-1" />
            <img className="related-product related-2" />
            <img className="related-product related-3" />
          </div>
        </div>
      </div>
    );
  }
}
