import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../src/index.css";
import Navbar from "./navbar.component";
import { getFromStorage } from "../utils/storage";

const User = (props) => (
  <div className="card carta mb-4">
    <div className="card-body d-flex">
      <div className="col-md-3 pl-0">
        <img src={"/userpics/" + props.user.photo} class="user-image mr-3" />
      </div>
      <div className="col-md-9">
        <div className="colm-md-12 mr-0 ml-0 d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">{props.user.username}</h5>
        <Link className="viewprofile" to={"/user/" + props.user._id}>
          View profile
        </Link>
        </div>

        <p className="card-text descriptionc mt-4">{props.user.bio}</p>
        <p className="localidad">{props.user.location}</p>
      </div>
    </div>
  </div>
);

const Product = (props) => (
  <div class="productcard">
    <img src={"/productpics/" + props.product.image1} class="image" />
    <div class="middle">
      <h5 className="card-title">{props.product.product}</h5>
      <p className="card-text description">{props.product.description}</p>
      <p className="localidad">{props.product.price}€/Kg</p>
      <Link to={"/product/" + props.product._id}>View Product</Link>
      <br />
    </div>
  </div>
);

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSeason = this.onChangeSeason.bind(this);
    this.state = { users: [], cookie: "", products: [], season: "Spring" };
  }

  onChangeSeason(e) {
    console.log(e.target.value);
    this.setState({
      season: e.target.value,
      products: "",
    });

    axios
      .get("http://localhost:5000/Products/season/" + e.target.value)
      .then((response) => {
        this.setState({ products: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  seeAllProducts() {
    window.location = "/products";
  }

  seeAllUsers() {
    window.location = "/allusers";
  }
  componentDidMount() {
    try {
      const { cookie } = getFromStorage("the_main_app");
      this.setState({
        cookie: cookie,
      });
    } catch {}

    axios
      .get("http://localhost:5000/Users/")
      .then((response) => {
        this.setState({ users: response.data });
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(this.state.season);
    axios
      .get("http://localhost:5000/Products/season/" + this.state.season)
      .then((response) => {
        this.setState({ products: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  userList() {
    return this.state.users.map((currentuser) => {
      console.log(currentuser);
      if (this.state.cookie) {
        if (currentuser._id != this.state.cookie._id) {
          return (
            <User
              user={currentuser}
              deleteUser={this.deleteUser}
              addtocart={this.addtocart}
              key={currentuser._id}
            />
          );
        }
      } else {
        return (
          <User
            user={currentuser}
            deleteUser={this.deleteUser}
            addtocart={this.addtocart}
            key={currentuser._id}
          />
        );
      }
    });
  }

  productsList() {
    if (this.state.products) {
      console.log(this.state.products);
      return this.state.products.map((currentproduct) => {
        return <Product product={currentproduct} key={currentproduct._id} />;
      });
    }
  }

  render() {
    return (
      <div className="gray">
        <Navbar />
        <div className="container mt-5">
          <div className="col-md-12 d-flex justify-content-center">
            <div>
              <h2 className="mb-4">Latest farmers</h2>
              <div className="col-md-12 latest-farmers pl-0 pr-0">
                <div className="col-md-12 pl-0 pr-0">{this.userList()}</div>
              </div>
              <button className="viewall" onClick={this.seeAllUsers}>
                See all users
              </button>
            </div>
            <div className="season-products">
              <h2 className="w-100 text-left mb-4">
                Products from this season
              </h2>
              <div className="d-flex justify-content-center mb-4">
                {/* {this.productsList()} */}
                <div className="seasonproduct mr-5">
                  <div className="seasonproduct-img1"></div>
                  <div className="col-md-12 d-flex flex-row justify-content-center align-items-center">
                    <p className="tomato mr-2"></p>
                    <h5>Tomatoes</h5>
                  </div>
                </div>
                <div className="seasonproduct">
                  <div className="seasonproduct-img2"></div>
                  <div className="col-md-12 d-flex flex-row justify-content-center align-items-center">
                    <p className="eggplant mr-2"></p>
                    <h5>Eggplant</h5>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                {/* {this.productsList()} */}
                <div className="seasonproduct mr-5">
                  <div className="seasonproduct-img3"></div>
                  <div className="col-md-12 d-flex flex-row justify-content-center align-items-center">
                    <p className="avocado mr-2"></p>
                    <h5>Avocados</h5>
                  </div>
                </div>
                <div className="seasonproduct">
                  <div className="seasonproduct-img4"></div>
                  <div className="col-md-12 d-flex flex-row justify-content-center align-items-center">
                    <p className="orange mr-2"></p>
                    <h5>Oranges</h5>
                  </div>
                </div>
              </div>
              <button className="viewall" onClick={this.seeAllProducts}>
                See all products
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
