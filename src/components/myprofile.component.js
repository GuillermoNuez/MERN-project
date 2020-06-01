import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar.component";
import axios from "axios";
import { getFromStorage, setInStorage } from "../utils/storage";
import { Modal } from "react-bootstrap";
import { Bar, Line, Pie, Bubble } from "react-chartjs-2";

const Product = (props) => (
  <div class="productcard ml-2 mr-2">
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

const ProfilePhoto = (props) => (
  <img
    className="ml-2 mr-2 profile-photo"
    src={"/userphotos/" + props.photo}
  ></img>
);

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.deleteproduct = this.deleteproduct.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.openmodal = this.openmodal.bind(this);
    this.closemodal = this.closemodal.bind(this); //

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeBio = this.onChangeBio.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);
    this.confirmEdit = this.confirmEdit.bind(this);

    this.state = {
      cookie: "",
      singUpError: "",
      singInError: "",
      email: "",
      password: "",
      products: [],
      comments: [],

      // Edit Params

      open: false,
      username: "",
      email: "",
      password: "",
      bio: "",
      location: "",
      role: "",
      file: "",

      // Graphs

      graphdata: "",
      graphstate: "hidden",
    };
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }
  filesSelectedHandler = (event) => {
    let data = new FormData();
    for (var x = 0; x < event.target.files.length; x++) {
      console.log(event.target.files[x]);
      data.append("files", event.target.files[x]);
    }

    axios
      .post(
        "http://localhost:5000/Upload/updateprofilephotos/" +
          this.state.cookie._id,
        data
      )

      .then((res) => {
        console.log(res.data.routes);
        const user = {
          _id: this.state.cookie._id,
          username: this.state.cookie.username,
          email: this.state.cookie.email,
          password: this.state.cookie.password,
          location: this.state.cookie.location,
          bio: this.state.cookie.bio,
          role: this.state.cookie.role,
          photo: this.state.cookie.photo,
          photos: res.data.routes,
        };
        setInStorage("the_main_app", { cookie: user });
      });
  };
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

  onChangeBio(e) {
    this.setState({
      bio: e.target.value,
    });
  }

  onChangeLocation(e) {
    this.setState({
      location: e.target.value,
    });
  }

  onChangeRole(e) {
    this.setState({
      role: e.target.value,
    });
  }

  fileSelectedHandler = (event) => {
    this.setState({
      file: event.target.files[0],
    });
  };
  confirmEdit() {
    fetch("http://localhost:5000/users/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.cookie.username,
        email: this.state.cookie.email,
        password: this.state.cookie.password,
        role: this.state.cookie.role,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          console.log("user verified");

          if (this.state.file) {
            const fd = new FormData();
            let aux = this.state.file.name.split(".");
            fd.append(
              "files",
              this.state.file,
              this.state.cookie._id + "." + aux[1]
            );
            axios
              .post("http://localhost:5000/Upload/upload", fd)
              .then((res) => {
                console.log(res);
              });

            const user = {
              _id: this.state.cookie._id,
              username: this.state.username,
              email: this.state.email,
              password: this.state.password,
              location: this.state.location,
              bio: this.state.bio,
              role: this.state.role,
              photo: this.state.cookie._id + "." + aux[1],
            };
            setInStorage("the_main_app", { cookie: user });
            fetch("http://localhost:5000/users/update/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(user),
            })
              .then((res) => res.json())
              .then((json) => {
                if (json.success) {
                  setInStorage("the_main_app", { cookie: user });
                  window.location = "/login";
                }
              });
          } else {
            const user = {
              _id: this.state.cookie._id,
              username: this.state.username,
              email: this.state.email,
              password: this.state.password,
              location: this.state.location,
              bio: this.state.bio,
              role: this.state.role,
              photo: this.state.cookie.photo,
            };
            fetch("http://localhost:5000/users/update/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(user),
            })
              .then((res) => res.json())
              .then((json) => {
                if (json.success) {
                  setInStorage("the_main_app", { cookie: user });
                  window.location = "/myprofile";
                }
              });
          }
        } else {
          console.log("Verification failed");
        }
      });
  }
  openmodal() {
    this.setState({ open: true });
  }
  closemodal() {
    this.setState({ open: false });
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

  profilephotoslist() {
    return this.state.cookie.photos.map((currentphoto) => {
      return <ProfilePhoto photo={currentphoto} />;
    });
  }
  componentDidMount() {
    // GET PRODUCTS

    const obj = getFromStorage("the_main_app");
    console.log(obj);
    if (obj && obj.cookie) {
      const { cookie } = obj;

      axios
        .get("http://localhost:5000/users/getuser/" + cookie._id)
        .then((response) => {
          this.setState({
            cookie: response.data,
            username: response.data.username,
            email: response.data.email,
            password: response.data.password,
            bio: response.data.bio,
            location: response.data.location,
            role: response.data.role,
          });
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

      axios
        .get("http://localhost:5000/Cart/getoverallinfo/" + cookie._id)
        .then((response) => {
          console.log(response.data);
          if (response.data.length > 0) {
            this.setState({ graphstate: "" });
          }
          let labels = [];
          let data = [];

          response.data.forEach((element) => {
            labels.push(element.Name);
            data.push(element.amount);
          });

          data.push(0); //WTF

          this.setState({
            graphdata: response.data,
            chartdata: {
              labels: labels,
              datasets: [
                {
                  label: "Purchases",
                  data: data,
                  backgroundColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235,1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                  ],

                  borderWidth: 1,
                },
              ],
            },
          });
        })
        .catch((error) => {
          console.log(error);
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
    localStorage.removeItem("the_main_app");
    window.location = "/login";
  }

  myorders() {
    window.location = "/myorders";
  }

  render() {
    const { cookie } = this.state;
    if (!cookie) {
      return (
        <div>
          <Navbar />
        </div>
      );
    } else {
      if (cookie.role == "Farmer") {
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
                    <h5 className="mt-3 d-flex align-items-center">
                      <p className="location mb-0 mr-3"> </p>
                      {this.state.cookie.location}
                    </h5>
                    <h5 className="mt-3">+34677896912</h5>
                    <button className="contactme mt-2" onClick={this.openmodal}>
                      Edit profile
                    </button>

                    <Link className="contactme mt-4 mb-2" to="/requests">
                      Requests
                    </Link>

                    <button className="logout" onClick={this.logout}>
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
                      <input
                        type="file"
                        className="ml-2"
                        multiple
                        accept="image/x-png,image/jpeg"
                        onChange={this.filesSelectedHandler}
                      />
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
              {/* <div className={this.state.graphstate}>
                <div className="row">
                  <div className="mt-5 mb-3">
                    <h3>My Charts</h3>
                    <hr className="profile-hr"></hr>
                  </div>
                </div>
                <Bar className="chart" data={this.state.chartdata} height="100"/>{" "}
              </div> */}
            </div>

            <Modal
              show={this.state.open}
              onHide={this.closemodal}
              centered
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
            >
              <Modal.Header closeButton className="modal-head">
                <Modal.Title>Edit profile</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form enctype="multipart/form-data">
                  <label>Username: </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                  />

                  <label>Email : </label>
                  <input
                    type="email"
                    className="form-control"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                  />

                  <label>Password: </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                  />

                  <label>Bio: </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.bio}
                    onChange={this.onChangeBio}
                  />

                  <label>location: </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.location}
                    onChange={this.onChangeLocation}
                  />

                  <label>Role: </label>
                  <select
                    className="form-control"
                    value={this.state.role}
                    onChange={this.onChangeRole}
                  >
                    <option>Client</option>
                    <option>Farmer</option>
                  </select>

                  <label>Image: </label>
                  <br />
                  <input
                    type="file"
                    accept="image/x-png,image/jpeg"
                    onChange={this.fileSelectedHandler}
                  />
                </form>
                <button
                  onClick={this.confirmEdit}
                  className="modal-accept2 mt-3"
                >
                  Confirm Changes
                </button>
              </Modal.Body>
            </Modal>
          </div>
        );
      }
      if (cookie.role == "Client") {
        return (
          <div className="gray">
            <Navbar />
            <div className="container d-flex justify-content-center">
              <div className="profile mt-5 pb-5 w-50">
                <img
                  className="profilepic"
                  src={"/userpics/" + this.state.cookie.photo}
                ></img>
                <div className="profileinfo">
                  <h3>{this.state.cookie.username}</h3>
                  <hr className="profile-hr w-25"></hr>
                  <h5>{this.state.cookie.bio}</h5>
                  <hr className="profile-hr w-25"></hr>
                  <h5 className="mt-3">{this.state.cookie.location}</h5>
                  <h5 className="mt-3">+34677896912</h5>
                  <button className="contactme mt-4" onClick={this.openmodal}>
                    Edit profile
                  </button>
                  <button className="contactme mt-4" onClick={this.logout}>
                    Logout
                  </button>
                  <button className="contactme mt-4" onClick={this.myorders}>
                    See my orders
                  </button>
                </div>
              </div>
            </div>
            <Modal
              show={this.state.open}
              onHide={this.closemodal}
              centered
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
            >
              <Modal.Header closeButton className="modal-head">
                <Modal.Title>Edit profile</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form enctype="multipart/form-data">
                  <label>Username: </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                  />

                  <label>Email : </label>
                  <input
                    type="email"
                    className="form-control"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                  />

                  <label>Password: </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                  />

                  <label>Bio: </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.bio}
                    onChange={this.onChangeBio}
                  />

                  <label>location: </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.location}
                    onChange={this.onChangeLocation}
                  />

                  <label>Role: </label>
                  <select
                    className="form-control"
                    value={this.state.role}
                    onChange={this.onChangeRole}
                  >
                    <option>Client</option>
                    <option>Farmer</option>
                  </select>

                  <label>Image: </label>
                  <br />
                  <input
                    type="file"
                    accept="image/x-png,image/jpeg"
                    onChange={this.fileSelectedHandler}
                  />
                </form>
                <button
                  onClick={this.confirmEdit}
                  className="modal-accept2 mt-3"
                >
                  Confirm Changes
                </button>
              </Modal.Body>
            </Modal>
          </div>
        );
      }
    }
  }
}
