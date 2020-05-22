import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../src/index.css";
import Navbar from "./navbar.component";
import { getFromStorage } from "../utils/storage";

const Exercise = (props) => (
  <div className="ml-2 mr-2 productcard">
    <div className="card-body">
      <h5 className="card-title">{props.exercise.product}</h5>
      <p className="card-text">{props.exercise.type}</p>
      <p className="card-text">{props.exercise.price} €</p>
      <div class="row">
        <div class="col-md-7">
          <Link to={"/product/" + props.exercise._id}>See more</Link>
        </div>
        {/* <div class="col-md-3">
          <Link to={"/edit/" + props.exercise._id}>edit</Link>
        </div> */}
        {/* <div class="col-md-3">
          <a
            href="#"
            className="btn btn-primary"
            onClick={() => {
              props.deleteExercise(props.exercise._id);
            }}
          >
            delete
          </a>
        </div> */}

        <div class="col-md-1">
          <a
            href="#"
            className="btn btn-primary"
            onClick={() => {
              props.addtocart(props.exercise._id);
            }}
          >
            +
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.deleteExercise = this.deleteExercise.bind(this);
    this.addtocart = this.addtocart.bind(this);
    this.state = { products: [], cookie: "", username: "", email: "" };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/users/" + this.props.match.params.id)
      .then((response) => {
        console.log(response.data);
        this.setState({
          products: response.data.products,
          username: response.data.username,
          email: response.data.email,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    const { cookie } = getFromStorage("the_main_app");

    this.setState({
      cookie: cookie._id,
    });
  }

  deleteExercise(id) {
    axios.delete("http://localhost:5000/products/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      products: this.state.products.filter((el) => el._id !== id),
    });
  }

  addtocart(id) {
    const { cookie } = this.state;

    const newProduct = {
      userid: cookie,
      productid: id,
      amount: 1,
    };

    axios
      .post("http://localhost:5000/Cart/add", newProduct)
      .then((res) => console.log(res.data));
  }

  exerciseList() {
    return this.state.products.map((currentexercise) => {
      return (
        <Exercise
          exercise={currentexercise}
          deleteExercise={this.deleteExercise}
          addtocart={this.addtocart}
          key={currentexercise._id}
        />
      );
    });
  }

  render() {
    const { cookie } = this.state;
    if (cookie) {
      return (
        <div>
          <Navbar />

          <div className="container mt-5">
            <div className="row myprofile">
              <div className="profile">
                <div className="profilepic"></div>
                <div className="profileinfo">
                  <h3>{this.state.username}</h3>
                  <hr className="profile-hr"></hr>
                  <h5>Biography{this.state.bio}</h5>
                  <hr className="profile-hr"></hr>
                  <h5 className="mt-3">Granada, Spain</h5>
                  <h5 className="mt-3">+34677896912</h5>
                  <Link
                    className="contactme mt-4"
                    to={"/chat/" + this.props.match.params.id}
                  >
                    Contact
                  </Link>
                </div>
              </div>
              <div className="profileproducts">
                <div className="profileproducts-content">
                  <div className="row">
                    <div>
                      <h3>Pictures</h3>
                      <hr className="profile-hr"></hr>
                    </div>
                  </div>
                  <div className="row profile-content">
                    <div className="ml-2 mr-2 profile-photo">
                      <div className="card-body"></div>
                    </div>
                  </div>
                  <div className="row">
                    <div>
                      <h3>Products</h3>
                      <hr className="profile-hr"></hr>
                    </div>
                  </div>
                  <div className="row profile-content">
                    {this.exerciseList()}
                  </div>
                </div>
              </div>
              <div></div>
            </div>
            <div className="row">
              <div className="mt-5 mb-3">
                <h3>Reviews</h3>
                <hr className="profile-hr"></hr>
              </div>
            </div>
            <div className="row profile-content">
              <div className="review">
                <div className="col-md-12 d-flex align-items-center pt-3">
                  <div className="review-img"></div>
                  <span>Username</span>
                </div>
                <div className="col-md-12 d-flex align-items-center pt-3 mt-3">
                  Tomatoes
                </div>
                <div className="col-md-12 d-flex align-items-center pt-3 mt-3">
                  "Comentario"
                </div>
              </div>
              <div className="review">
                <div className="col-md-12 d-flex align-items-center pt-3">
                  <div className="review-img"></div>
                  <span>Username</span>
                </div>
                <div className="col-md-12 d-flex align-items-center pt-3 mt-3">
                  Tomatoes
                </div>
                <div className="col-md-12 d-flex align-items-center pt-3 mt-3">
                  "Comentario"
                </div>
              </div>
              <div className="review">
                <div className="col-md-12 d-flex align-items-center pt-3">
                  <div className="review-img"></div>
                  <span>Username</span>
                </div>
                <div className="col-md-12 d-flex align-items-center pt-3 mt-3">
                  Tomatoes
                </div>
                <div className="col-md-12 d-flex align-items-center pt-3 mt-3">
                  "Comentario"
                </div>
              </div>
              <div className="review">
                <div className="col-md-12 d-flex align-items-center pt-3">
                  <div className="review-img"></div>
                  <span>Username</span>
                </div>
                <div className="col-md-12 d-flex align-items-center pt-3 mt-3">
                  Tomatoes
                </div>
                <div className="col-md-12 d-flex align-items-center pt-3 mt-3">
                  "Comentario"
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h2>NOT LOGGED LMAO</h2>
        </div>
      );
    }
  }
}
