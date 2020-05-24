import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar.component";
import axios from "axios";
import { getFromStorage, setInStorage } from "../utils/storage";

const Product = (props) => (
  <div class="productcard">
    <img src={"/productpics/" + props.product.image1} class="image" />
    <div class="middle">
      <p>{props.product.product}</p>
      <Link to={"/product/" + props.product._id}>See more</Link>
      <br />
      <Link to={"/edit/" + props.product._id}>edit</Link>
      <br />
      <a
        href="#"
        className="btn btn-primary"
        onClick={() => {
          props.deleteproduct(props.product._id);
        }}
      >
        delete
      </a>
    </div>
  </div>
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
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.deleteproduct = this.deleteproduct.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      isLoading: true,
      cookie: "",
      singUpError: "",
      singInError: "",
      email: "",
      password: "",
      products: [],
      comments: [],
    };
  }
  deleteproduct(id) {
    axios.delete("http://localhost:5000/products/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      products: this.state.products.filter((el) => el._id !== id),
    });
  }
  productList() {
    return this.state.products.map((currentproduct) => {
      console.log(currentproduct);
      return (
        <Product
          product={currentproduct}
          deleteproduct={this.deleteproduct}
          addtocart={this.addtocart}
          key={currentproduct._id}
        />
      );
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
    const obj = getFromStorage("the_main_app");

    if (obj && obj.cookie) {
      const { cookie } = obj;
      this.setState({
        cookie: cookie,
        isLoading: false,
      });
      // GET PRODUCTS
      axios
        .get("http://localhost:5000/products/getuser/" + cookie._id)
        .then((response) => {
          this.setState({
            products: response.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .get("http://localhost:5000/Rating/getrating/" + cookie._id)
        .then((response) => {
          this.setState({
            comments: response.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  logout() {
    try {
      localStorage
        .removeItem("the_main_app")
        .then((window.location = "/login"));
    } catch {
      console.log("Something went wrong");
      window.location = "/login";
    }
  }

  onSubmit(e) {
    e.preventDefault();

    this.setState({
      isLoading: true,
    });

    fetch("http://localhost:5000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setInStorage("the_main_app", { cookie: json.user });

          window.location = "/login";
        } else {
          this.setState({
            isLoading: false,
            email: "",
            password: "",
            cookie: json.cookie,
          });
        }
      });
  }

  render() {
    const { cookie } = this.state;
    if (!cookie) {
      // window.location = "/login";
      return (
        <div>
          <Navbar />
          Not logged
        </div>
      );
    } else {
      return (
        <div>
          <Navbar />

          <div className="container mt-5">
            <div className="row myprofile">
              <div className="profile">
                <img
                  className="profilepic"
                  src={"/userpics/" + this.state.cookie.photo}
                ></img>
                <div className="profileinfo">
                  <h3>{this.state.cookie.username}</h3>
                  <hr className="profile-hr"></hr>
                  <h5>{this.state.cookie.bio}</h5>
                  <hr className="profile-hr"></hr>
                  <h5 className="mt-3">{this.state.cookie.location}</h5>
                  <h5 className="mt-3">+34677896912</h5>
                  <Link className="contactme mt-4" to="/edituser">
                    Edit profile
                  </Link>

                  <button className="contactme mt-4" onClick={this.logout}>
                    Logout
                  </button>
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
                    {this.productList()}
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
          </div>
        </div>
      );
    }
  }
}
