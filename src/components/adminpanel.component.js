import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar.component";
import axios from "axios";
import { getFromStorage } from "../utils/storage";
import { Modal } from "react-bootstrap";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faTrashAlt,
  faPencilAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const User = (props) => (
  <tr>
    <td>{props.user.username}</td>
    <td>{props.user.location}</td>
    <td>{props.user.role}</td>
    <td>
      <Link
        to={"/user/" + props.user._id}
        className="btn btn-sm btn-primary mr-2"
      >
        <FontAwesomeIcon icon={faEye} />
      </Link>
      <button
        onClick={() => {
          props.openedituser(props.user);
        }}
        className="btn btn-sm btn-warning mr-2"
      >
        <FontAwesomeIcon icon={faPencilAlt} />
      </button>
      <button
        onClick={() => {
          props.opendeleteuser(props.user._id);
        }}
        className="btn btn-sm btn-danger mr-2"
      >
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
    </td>
  </tr>
);

const Product = (props) => (
  <tr>
    <td>{props.product.product}</td>
    <td>{props.product.price}</td>
    <td>{props.product.season}</td>
    <td>
      <Link
        to={"/product/" + props.product._id}
        className="btn btn-sm btn-primary mr-2"
      >
        <FontAwesomeIcon icon={faEye} />
      </Link>
      <button
        onClick={() => {
          props.openeditproduct(props.product);
        }}
        className="btn btn-sm btn-warning mr-2"
      >
        <FontAwesomeIcon icon={faPencilAlt} />
      </button>
      <button
        onClick={() => {
          props.opendeleteproduct(props.product._id);
        }}
        className="btn btn-sm btn-danger mr-2"
      >
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
    </td>
  </tr>
);

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.userList = this.userList.bind(this);
    this.productList = this.productList.bind(this);
    this.opendeleteproduct = this.opendeleteproduct.bind(this);
    this.closedeleteproduct = this.closedeleteproduct.bind(this);
    this.opendeleteuser = this.opendeleteuser.bind(this);
    this.closedeleteuser = this.closedeleteuser.bind(this);
    this.deleteproduct = this.deleteproduct.bind(this);
    this.deleteuser = this.deleteuser.bind(this);
    this.openedituser = this.openedituser.bind(this);
    this.closeedituser = this.closeedituser.bind(this);
    this.openeditproduct = this.openeditproduct.bind(this);
    this.closeeditproduct = this.closeeditproduct.bind(this);
    this.confirmedituser = this.confirmedituser.bind(this);
    this.confirmeditproduct = this.confirmeditproduct.bind(this);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeBio = this.onChangeBio.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);

    this.onChangeProduct = this.onChangeProduct.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeSeason = this.onChangeSeason.bind(this);

    this.state = {
      cookie: "",
      users: "",
      products: "",

      opendeleteproduct: false,
      openeditproduct: false,
      opendeleteuser: false,
      openedituser: false,
      openeditproduct: false,
      idtoremove: "",
      idtoedit: "",

      // User

      username: "",
      email: "",
      password: "",
      bio: "",
      location: "",
      role: "",

      // Product

      product: "",
      description: "",
      price: "",
      season: "",
      type: "",
    };
  }

  opendeleteproduct(id) {
    this.setState({ opendeleteproduct: true, idtoremove: id });
  }

  closedeleteproduct() {
    this.setState({ opendeleteproduct: false, idtoremove: "" });
  }

  opendeleteuser(id) {
    this.setState({ opendeleteuser: true, idtoremove: id });
  }

  closedeleteuser() {
    this.setState({ opendeleteuser: false, idtoremove: "" });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
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

  openedituser(info) {
    console.log(info);

    this.setState({
      openedituser: true,
      username: info.username,
      email: info.email,
      password: info.password,
      bio: info.bio,
      location: info.location,
      role: info.role,
      idtoedit: info._id,
    });
  }

  closeedituser() {
    this.setState({ openedituser: false, idtoedit: "" });
  }

  openeditproduct(info) {
    console.log(info);

    this.setState({
      openeditproduct: true,
      product: info.product,
      description: info.description,
      price: info.price,
      season: info.season,
      type: info.type,
      idtoedit: info._id,
    });
  }

  closeeditproduct() {
    this.setState({ openeditproduct: false, idtoedit: "" });
  }

  componentDidMount() {
    const obj = getFromStorage("the_main_app");
    try {
      if (obj && obj.cookie) {
        const { cookie } = obj;
        this.setState({
          cookie: cookie,
        });

        axios.get("http://localhost:5000/users/all").then((response) => {
          this.setState({
            users: response.data,
          });
        });

        axios.get("http://localhost:5000/products/").then((response) => {
          this.setState({
            products: response.data,
          });
        });
      }
    } catch {}
  }

  userList() {
    if (this.state.users.length != 0) {
      return this.state.users.map((currentuser) => {
        return (
          <User
            user={currentuser}
            key={currentuser._id}
            opendeleteuser={this.opendeleteuser}
            openedituser={this.openedituser}
          />
        );
      });
    }
  }

  productList() {
    if (this.state.products.length != 0) {
      return this.state.products.map((currentproduct) => {
        return (
          <Product
            product={currentproduct}
            key={currentproduct._id}
            opendeleteproduct={this.opendeleteproduct}
            openeditproduct={this.openeditproduct}
          />
        );
      });
    }
  }

  deleteproduct() {
    console.log("deleting product " + this.state.idtoremove);
    this.setState({
      opendeleteproduct: false,
    });

    axios
      .delete("http://localhost:5000/products/" + this.state.idtoremove)
      .then((response) => {
        console.log(response.data);
        axios.get("http://localhost:5000/products/").then((response) => {
          this.setState({
            products: response.data,
          });
        });
      });
  }

  deleteuser() {
    console.log("deleting user " + this.state.idtoremove);
    this.setState({
      opendeleteuser: false,
    });

    axios
      .delete("http://localhost:5000/users/" + this.state.idtoremove)
      .then((response) => {
        console.log(response.data);
        axios.get("http://localhost:5000/users/all").then((response) => {
          this.setState({
            users: response.data,
          });
        });
      });
  }

  confirmedituser() {
    this.setState({
      openedituser: false,
    });

    let user = {
      _id: this.state.idtoedit,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      bio: this.state.bio,
      location: this.state.location,
      role: this.state.role,
    };

    console.log(user);
    fetch("http://localhost:5000/users/update/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    axios.get("http://localhost:5000/users/all").then((response) => {
      this.setState({
        users: response.data,
      });
      window.location = "/adminpanel";
    });
  }

  confirmeditproduct() {
    this.setState({
      openeditproduct: false,
    });

    let product = {
      _id: this.state.idtoedit,
      product: this.state.product,
      description: this.state.description,
      type: this.state.type,
      price: this.state.price,
      season: this.state.season,
    };

    fetch("http://localhost:5000/products/update/" + product._id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    window.location = "/adminpanel";
  }

  logout() {
    localStorage.removeItem("the_main_app");
    window.location = "/login";
  }

  render() {
    const { cookie } = this.state;
    if (!cookie) {
      return (
        <div>
          <Navbar />
          <div className="container mt-5">
            You must log in to see this window
          </div>
        </div>
      );
    } else {
      console.log(cookie.role);
      if (cookie.role == "Admin") {
        return (
          <div>
            <Navbar />
            <div className="container ">
              <div className="row mt-5 mb-5">
                <div className="col-md-12 d-flex justify-content-center align-items-center">
                  <h2 className="mb-0 mr-4">Welcome to the admin panel</h2>
                  <button
                    onClick={this.logout}
                    className="btn btn-sm btn-primary mr-2 ml-2"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                  </button>
                </div>
              </div>
              <div className="cold-md-12 d-flex flex-column align-items-center mt-5 mb-5">
                <div className="col-md-8 pl-0">
                  <h2 className="mb-5">Users</h2>

                  <table class="table table-hover mb-5">
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Location</th>
                        <th scope="col">Role</th>
                        <th className="w-25" scope="col">
                          Options
                        </th>
                      </tr>
                    </thead>
                    <tbody>{this.userList()}</tbody>
                  </table>
                </div>
                <div className="col-md-8 pl-0">
                  <h2 className="mb-5">Products</h2>
                  <table class="table table-hover">
                    <thead className="thead-dark">
                      <tr>

                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Season</th>
                        <th className="w-25" scope="col">
                          Options
                        </th>
                      </tr>
                    </thead>
                    <tbody>{this.productList()}</tbody>
                  </table>
                </div>
              </div>
            </div>
            <Modal //DeleteUser
              show={this.state.opendeleteuser}
              onHide={this.closedeleteuser}
              centered
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
            >
              <Modal.Header closeButton className="modal-head">
                <Modal.Title>
                  <span className="deletehead">Delete User</span>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="pt-4 pb-4 d-flex flex-column align-items-center">
                <span className="deletebody">
                  Are you sure you want to
                  <span className="bold"> delete </span> this user, this action
                  is
                  <span className="bold"> irreversible</span>
                </span>

                <button
                  variant="primary"
                  onClick={this.deleteuser}
                  className="deleteorder mt-3"
                >
                  Delete
                </button>
              </Modal.Body>
            </Modal>
            <Modal //DeleteProduct
              show={this.state.opendeleteproduct}
              onHide={this.closedeleteproduct}
              centered
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
            >
              <Modal.Header closeButton className="modal-head">
                <Modal.Title>
                  <span className="deletehead">Delete Product</span>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="pt-4 pb-4 d-flex flex-column align-items-center">
                <span className="deletebody">
                  Are you sure you want to
                  <span className="bold"> delete </span> this product, this
                  action is
                  <span className="bold"> irreversible</span>
                </span>

                <button
                  variant="primary"
                  onClick={this.deleteproduct}
                  className="deleteorder mt-3"
                >
                  Delete
                </button>
              </Modal.Body>
            </Modal>

            <Modal //edituser
              show={this.state.openedituser}
              onHide={this.closeedituser}
              centered
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
            >
              <Modal.Header closeButton className="modal-head">
                <Modal.Title>Edit user</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form enctype="multipart/form-data">
                  <label>Username: </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                  />asda

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
                </form>
                <button
                  onClick={this.confirmedituser}
                  className="modal-accept2 mt-3"
                >
                  Confirm Changes
                </button>
              </Modal.Body>
            </Modal>

            <Modal //editproduct
              show={this.state.openeditproduct}
              onHide={this.closeeditproduct}
              centered
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
            >
              <Modal.Header closeButton className="modal-head">
                <Modal.Title>Edit product</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form enctype="multipart/form-data">
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
                  </div>
                </form>
                <button
                  onClick={this.confirmeditproduct}
                  className="modal-accept2 mt-3"
                >
                  Confirm Changes
                </button>
              </Modal.Body>
            </Modal>
          </div>
        );
      } else {
        return (
          <div>
            <Navbar />
            <div className="container mt-5">
              You dont have permision to be here
            </div>
          </div>
        );
      }
    }
  }
}