import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../src/index.css";
import Navbar from "./navbar.component";
import { getFromStorage } from "../utils/storage";

const Product = (props) => (
  <div className="ml-2 mr-2 productcard">
    <div className="card-body">
      <h5 className="card-title">{props.exercise.product}</h5>
      <p className="card-text">{props.exercise.type}</p>
      <p className="card-text">{props.exercise.price} €</p>
      <div class="row">
        <div class="col-md-7">
          <Link to={"/product/" + props.exercise._id}>See more</Link>
        </div>
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

const Comment1 = (props) => (
  <div className="review">
    <div className="col-md-12 d-flex align-items-center pt-3">
      <img className="review-img" src={"/userpics/" + props.comment.photo}></img>
      <span>{props.comment.username}</span>
    </div>
    <div className="col-md-12 d-flex align-items-center pt-3 mt-3 justify-content-around">
      <p className="tomato"></p>
      <p className="tomato"></p>
    </div>
    <div className="col-md-12 d-flex align-items-center mt-3">
      {props.comment.mensaje}
    </div>
  </div>
);
const Comment2 = (props) => (
  <div className="review">
    <div className="col-md-12 d-flex align-items-center pt-3">
      <img className="review-img" src={"/userpics/" + props.comment.photo}></img>
      <span>{props.comment.username}</span>
    </div>
    <div className="col-md-12 d-flex align-items-center pt-3 mt-3 justify-content-around">
      <p className="tomato"></p>
      <p className="tomato"></p>
    </div>
    <div className="col-md-12 d-flex align-items-center mt-3">
      {props.comment.mensaje}
    </div>
  </div>
);
const Comment3 = (props) => (
  <div className="review">
    <div className="col-md-12 d-flex align-items-center pt-3">
      <img className="review-img" src={"/userpics/" + props.comment.photo}></img>
      <span>{props.comment.username}</span>
    </div>
    <div className="col-md-12 d-flex align-items-center pt-3 mt-3 justify-content-around">
      <p className="tomato"></p>
      <p className="tomato"></p>
      <p className="tomato"></p>
    </div>
    <div className="col-md-12 d-flex align-items-center mt-3">
      {props.comment.mensaje}
    </div>
  </div>
);
const Comment4 = (props) => (
  <div className="review">
    <div className="col-md-12 d-flex align-items-center pt-3">
      <img className="review-img" src={"/userpics/" + props.comment.photo}></img>
      <span>{props.comment.username}</span>
    </div>
    <div className="col-md-12 d-flex align-items-center pt-3 mt-3 justify-content-around">
      <p className="tomato"></p>
      <p className="tomato"></p>
      <p className="tomato"></p>
      <p className="tomato"></p>
    </div>
    <div className="col-md-12 d-flex align-items-center mt-3">
      {props.comment.mensaje}
    </div>
  </div>
);

const Comment5 = (props) => (
  <div className="review">
    <div className="col-md-12 d-flex align-items-center pt-3">
      <img className="review-img" src={"/userpics/" + props.comment.photo}></img>
      <span>{props.comment.username}</span>
    </div>
    <div className="col-md-12 d-flex align-items-center pt-3 mt-3 justify-content-around">
      <p className="tomato"></p>
      <p className="tomato"></p>
      <p className="tomato"></p>
      <p className="tomato"></p>
      <p className="tomato"></p>
    </div>
    <div className="col-md-12 d-flex align-items-center mt-3">
      {props.comment.mensaje}
    </div>
  </div>
);

export default class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.deleteExercise = this.deleteExercise.bind(this);
    this.addtocart = this.addtocart.bind(this);
    this.onChangeCommentText = this.onChangeCommentText.bind(this);
    this.onChangeCommentRate = this.onChangeCommentRate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      products: [],
      cookie: "",
      username: "",
      email: "",
      photo: "",
      comments: [],

      commenttext: "",
      commentrate: "",
    };
  }

  onSubmit(e) {
    e.preventDefault();

    const comment = {
      ratingowner: this.state.cookie._id,
      iduser: this.props.match.params.id,
      message: this.state.commenttext,
      score: this.state.commentrate,
    };

    axios
      .post("http://localhost:5000/Rating/add/", comment)
      .then((res) => console.log(res.data));
  }

  commentList() {
    return this.state.comments.map((currentcomment) => {
      if (currentcomment.score == 1) {
        return <Comment1 comment={currentcomment} />;
      }
      if (currentcomment.score == 2) {
        return <Comment2 comment={currentcomment} />;
      }
      if (currentcomment.score == 3) {
        return <Comment3 comment={currentcomment} />;
      }
      if (currentcomment.score == 4) {
        return <Comment4 comment={currentcomment} />;
      }
      if (currentcomment.score == 5) {
        return <Comment5 comment={currentcomment} />;
      }
    });
  }
  componentDidMount() {
    try {
      const { cookie } = getFromStorage("the_main_app");
      this.setState({
        cookie: cookie,
      });
      console.log(cookie._id);
    } catch {}

    axios
      .get("http://localhost:5000/users/" + this.props.match.params.id)
      .then((response) => {
        console.log(response.data);
        this.setState({
          products: response.data.products,
          username: response.data.username,
          email: response.data.email,
          photo: response.data.photo,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(
        "http://localhost:5000/Rating/getrating/" + this.props.match.params.id
      )
      .then((response) => {
        this.setState({
          comments: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
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

  onChangeCommentText(e) {
    this.setState({
      commenttext: e.target.value,
    });
  }

  onChangeCommentRate(e) {
    this.setState({
      commentrate: e.target.value,
    });
  }

  exerciseList() {
    return this.state.products.map((currentexercise) => {
      return (
        <Product
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
                <img
                  className="profilepic"
                  src={"/userpics/" + this.state.photo}
                ></img>
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
            <div className="row profile-content">{this.commentList()}</div>
            <div className="row">
              <div className="mt-5 mb-3">
                <h3>Add Comment</h3>
                <hr className="profile-hr"></hr>
              </div>
            </div>
            <form onSubmit={this.onSubmit}>
              <input
                type="text"
                className="form-control"
                value={this.state.commenttext}
                onChange={this.onChangeCommentText}
              />
              <input
                type="number"
                className="form-control"
                max="5"
                min="1"
                value={this.state.commentrate}
                onChange={this.onChangeCommentRate}
              />

              <input type="submit" value="Comment" />
            </form>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Navbar />
          <div className="container mt-5">
            <h2>You must be logged in to see user</h2>
          </div>
        </div>
      );
    }
  }
}
