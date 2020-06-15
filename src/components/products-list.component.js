import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../src/index.css";
import Navbar from "./navbar.component";
import { getFromStorage } from "../utils/storage";
import { Button, Modal } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";

const Product = (props) => (
  <div class="productcard ml-2 mr-2">
    <img src={"/productpics/" + props.product.image1} class="image" />
    <div class="middle">
    <p className="bold">{props.product.product}</p>
      <Link className="btn btn-sm btn-primary" to={"/product/" + props.product._id}><FontAwesomeIcon icon={faEye}/></Link>
      <br />
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
  <div className="review mb-3">
    <div className="col-md-12 d-flex align-items-center pt-3">
      <img
        className="review-img"
        src={"/userpics/" + props.comment.photo}
      ></img>
      <span>{props.comment.username}</span>
    </div>
    <div className="col-md-12 d-flex align-items-center pt-3 mt-3 justify-content-between">
      <p className="tomato"></p>
    </div>
    <div className="col-md-12 d-flex align-items-center mt-3 italic">
      "{props.comment.mensaje}"
    </div>
  </div>
);

const Comment2 = (props) => (
  <div className="review mb-3">
    <div className="col-md-12 d-flex align-items-center pt-3">
      <img
        className="review-img"
        src={"/userpics/" + props.comment.photo}
      ></img>
      <span>{props.comment.username}</span>
    </div>
    <div className="col-md-12 d-flex align-items-center pt-3 mt-3">
      <p className="tomato mr-5"></p>
      <p className="tomato"></p>
    </div>
    <div className="col-md-12 d-flex align-items-center mt-3 italic">
      "{props.comment.mensaje}"
    </div>
  </div>
);
const Comment3 = (props) => (
  <div className="review mb-3">
    <div className="col-md-12 d-flex align-items-center pt-3">
      <img
        className="review-img"
        src={"/userpics/" + props.comment.photo}
      ></img>
      <span>{props.comment.username}</span>
    </div>
    <div className="col-md-12 d-flex align-items-center pt-3 mt-3">
      <p className="tomato mr-5"></p>
      <p className="tomato mr-5"></p>
      <p className="tomato"></p>
    </div>
    <div className="col-md-12 d-flex align-items-center mt-3 italic">
      "{props.comment.mensaje}"
    </div>
  </div>
);
const Comment4 = (props) => (
  <div className="review mb-3">
    <div className="col-md-12 d-flex align-items-center pt-3">
      <img
        className="review-img"
        src={"/userpics/" + props.comment.photo}
      ></img>
      <span>{props.comment.username}</span>
    </div>
    <div className="col-md-12 d-flex align-items-center pt-3 mt-3 justify-content-between">
      <p className="tomato"></p>
      <p className="tomato"></p>
      <p className="tomato"></p>
      <p className="tomato"></p>
    </div>
    <div className="col-md-12 d-flex align-items-center mt-3 italic">
      "{props.comment.mensaje}"
    </div>
  </div>
);

const Comment5 = (props) => (
  <div className="review mb-3">
    <div className="col-md-12 d-flex align-items-center pt-3">
      <img
        className="review-img"
        src={"/userpics/" + props.comment.photo}
      ></img>
      <span>{props.comment.username}</span>
    </div>
    <div className="col-md-12 d-flex align-items-center pt-3 mt-3 justify-content-between">
      <p className="tomato"></p>
      <p className="tomato"></p>
      <p className="tomato"></p>
      <p className="tomato"></p>
      <p className="tomato"></p>
    </div>
    <div className="col-md-12 d-flex align-items-center mt-3 italic">
      "{props.comment.mensaje}"
    </div>
  </div>
);

export default class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.deleteExercise = this.deleteExercise.bind(this);
    this.addtocart = this.addtocart.bind(this);
    this.onChangeCommentText = this.onChangeCommentText.bind(this);
    this.postComment = this.postComment.bind(this);
    this.profilephotoslist = this.profilephotoslist.bind(this);
    this.openmodal = this.openmodal.bind(this);
    this.closemodal = this.closemodal.bind(this);
    this.onChangeRating = this.onChangeRating.bind(this);

    this.state = {
      products: [],
      cookie: "",
      username: "",
      email: "",
      bio:"",
      location:"",
      photo: "",
      photos: [],
      comments: [],

      commenttext: "",
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
      score: this.state.rating,
    };

    axios.post("http://localhost:5000/Rating/add/", comment).then((res) => {
      console.log(res.data);
      this.setState({ open: false });
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
        console.log(response.data);
        this.setState({
          products: response.data.products,
          username: response.data.username,
          email: response.data.email,
          photo: response.data.photo,
          photos: response.data.photos,
          location:response.data.location,
          bio:response.data.bio
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

  onChangeRating(e) {
    console.log("Changing rating to : " + e.target.value);
    this.setState({
      rating: e.target.value,
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
                  <h5>{this.state.bio}</h5>
                  <hr className="profile-hr"></hr>
                  <h5 className="mt-3">{this.state.location}</h5>
                  {/* <h5 className="mt-3">+34677896912</h5> */}
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
                  size="md"
                  aria-labelledby="contained-modal-title-vcenter"
                >
                  <Modal.Header closeButton className="modal-head">
                    <Modal.Title>Rate farmer</Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="pt-4 pb-4 d-flex flex-column align-items-center">
                    <div className="row w-100 d-flex justify-content-center mb-3 align-itmems-center">
                      <span className="modal-left">Rate</span>
                      <Box
                        component="fieldset"
                        mb={3}
                        borderColor="transparent"
                      >
                        <Rating
                          name="simple-controlled"
                          value={this.state.rating}
                          onChange={this.onChangeRating}
                          size="large"
                        />
                      </Box>
                    </div>
                    <div className="row w-100 d-flex justify-content-center">
                      <span className="modal-left">Comment</span>
                      <textarea
                        type="text"
                        className="form-control modal-form2"
                        value={this.state.commenttext}
                        onChange={this.onChangeCommentText}
                      />
                    </div>

                    <button
                      variant="primary"
                      onClick={this.postComment}
                      className="modal-accept3 mt-3"
                    >
                      Save
                    </button>
                  </Modal.Body>
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
