import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../src/index.css";
import Navbar from "./navbar.component";
import { getFromStorage } from "../utils/storage";

const User = (props) => (
  <div className="card ml-3 mt-5 carta ">
    <div className="card-body">
      <div className="row pl-3 mb-3">
     
        <img src={"/userpics/" + props.user.photo} class="user-image mr-3" />
        <h5 className="card-title">{props.user.username}</h5>
      </div>

      <div className="row mb-3">
        <div className="col-md-7">
          <p className="card-text description">{props.user.bio}</p>
        </div>
        <div className="col-md-5">
          <Link className="viewprofile" to={"/user/" + props.user._id}>
            View Profile
          </Link>
        </div>
      </div>
      <p className="localidad">{props.user.location}</p>
      <div class="col.md-6"></div>
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
      <div>
        <Navbar />
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-4 latest-farmers">
              <h2>Latest farmers</h2>
              <div className="col-md-12">{this.userList()}</div>
            </div>
            <div className="cold-md-8 season-products">
              <h2>
                Season products
                <select
                  onChange={this.onChangeSeason}
                  value={this.state.season}
                >
                  <option>Spring</option>
                  <option>Summer</option>
                  <option>Fall</option>
                  <option>Winter</option>
                </select>
              </h2>
              <div className="d-flex">{this.productsList()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
