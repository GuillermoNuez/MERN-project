import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../src/index.css";
import Navbar from "./navbar.component";
import { getFromStorage } from "../utils/storage";
import { Button, Modal } from "react-bootstrap";

const Product = (props) => (
  <div class="productcard">
    <img src={"/productpics/" + props.product.image1} class="image" />
    <div class="middle">
      <p>{props.product.product}</p>
      <Link to={"/product/" + props.product._id}>See more</Link>
      <br />
      <a
        href="#"
        className="btn btn-primary"
        onClick={() => {
          props.addtocart(props.product._id);
        }}
      >
        +
      </a>
    </div>
  </div>
);

const ProfilePhoto = (props) => (
  <img
    className="ml-2 mr-2 profile-photo"
    src={"/userphotos/" + props.photo}
  ></img>
);

const Comment1 = (props) => (
  <div className="review">
    <div className="col-md-12 d-flex align-items-center pt-3">
      <img
        className="review-img"
        src={"/userpics/" + props.comment.photo}
      ></img>
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
      <img
        className="review-img"
        src={"/userpics/" + props.comment.photo}
      ></img>
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
      <img
        className="review-img"
        src={"/userpics/" + props.comment.photo}
      ></img>
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
      <img
        className="review-img"
        src={"/userpics/" + props.comment.photo}
      ></img>
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
      <img
        className="review-img"
        src={"/userpics/" + props.comment.photo}
      ></img>
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
    this.postComment = this.postComment.bind(this);
    this.profilephotoslist = this.profilephotoslist.bind(this);
    this.openmodal = this.openmodal.bind(this);
    this.closemodal = this.closemodal.bind(this);

    this.state = {
      products: [],
      cookie: "",
      username: "",
      email: "",
      photo: "",
      photos: [],
      comments: [],

      commenttext: "",
      commentrate: "",
      open: false,
    };
  }
  openmodal() {
    this.setState({ open: true });
  }
  closemodal() {
    this.setState({ open: false });
  }

  postComment() {
    const comment = {
      ratingowner: this.state.cookie._id,
      iduser: this.props.match.params.id,
      message: this.state.commenttext,
      score: this.state.commentrate,
    };

    axios.post("http://localhost:5000/Rating/add/", comment).then((res) => {
      console.log(res.data);
      this.setState({ open: false });
      window.location = "/user/" + this.props.match.params.id;
    });
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
    } catch {}

    axios
      .get("http://localhost:5000/users/" + this.props.match.params.id)
      .then((response) => {

        this.setState({
          products: response.data.products,
          username: response.data.username,
          email: response.data.email,
          photo: response.data.photo,
          photos: response.data.photos,
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

  profilephotoslist() {
    console.log(this.state.photos);
    return this.state.photos.map((currentphoto) => {
      return <ProfilePhoto photo={currentphoto} />;
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
          product={currentexercise}
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
                    {this.profilephotoslist()}
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
            <div className="row d-flex align-items-center">
              <div className="mt-5 mb-3">
                <h3>Reviews</h3>
                <hr className="profile-hr"></hr>
              </div>

              <Button
                className=" ml-4 btn btn-sm h-25"
                onClick={this.openmodal}
              >
                Rate user
              </Button>
            </div>
            <div className="row profile-content">{this.commentList()}</div>
            <div className="row">
              <div className="mt-5 mb-2">
                <Modal
                  show={this.state.open}
                  onHide={this.closemodal}
                  centered
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Rate farmer</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Comment"
                      value={this.state.commenttext}
                      onChange={this.onChangeCommentText}
                    />
                    <input
                      type="number"
                      className="form-control"
                      max="5"
                      min="1"
                      placeholder="Rate"
                      value={this.state.commentrate}
                      onChange={this.onChangeCommentRate}
                    />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="primary" onClick={this.postComment}>
                      Post Comment
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
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
