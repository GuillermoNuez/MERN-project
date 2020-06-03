import React, { Component } from "react";
import axios from "axios";
import "../../src/index.css";
import Navbar from "./navbar.component";
import { getFromStorage } from "../utils/storage";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const Order = (props) => (
  <div className="myrequest ml-2 mr-2 mb-4">
    <p className="orderdate">Order : {props.order.idpedido}</p>
    <div className="ordercontainer d-flex flex-column align-items-center mt-3">
      <div className="col-md-12 d-flex flex-column orderproducts align-items-center mb-3">
        <div className="d-flex w-100">
          <p className="w-100 orderamount">
            <span className="bold">({props.order.products.length}) </span>{" "}
            article(s)
          </p>
        </div>
        <div className="products-container">
          {props.order.products.map((item) => {
            return (
              <div className="row w-100 justify-content-around mr-0">
                <p>{item.idproduct} </p>
                <p> {item.products.amount}</p>
              </div>
            );
          })}
        </div>
      </div>
      Status : {props.order.status}
      <br />
      <br />
      <button
        onClick={() => {
          props.changestatus(props.order.idpedido);
        }}
        className="btn btn-sm btn-info mr-2 mb-3"
      >
        <FontAwesomeIcon icon={faCheck} /> Mark as ready
      </button>
    </div>
  </div>
);

const Order2 = (props) => (
  <div className="myrequest ml-2 mr-2 mb-4">
    <p className="orderdate">Order : {props.order.idpedido}</p>
    <div className="ordercontainer d-flex flex-column align-items-center mt-3">
      <div className="col-md-12 d-flex flex-column orderproducts align-items-center mb-3">
        <div className="d-flex w-100">
          <p className="w-100 orderamount">
            <span className="bold">({props.order.products.length}) </span>{" "}
            article(s)
          </p>
        </div>
        <div className="products-container">
          {props.order.products.map((item) => {
            return (
              <div className="row w-100 justify-content-around mr-0">
                <p>{item.idproduct} </p>
                <p> {item.products.amount}</p>
              </div>
            );
          })}
        </div>
      </div>
      Status : {props.order.status}
      <br />
      <br />
      <button className="btn btn-sm btn-info mr-2 mb-3">
        <FontAwesomeIcon icon={faCheck} /> Ready
      </button>
    </div>
  </div>
);

export default class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.changestatus = this.changestatus.bind(this);
    this.state = {
      requests: [],
      cookie: "",
    };
  }

  componentDidMount() {
    const { cookie } = getFromStorage("the_main_app");

    this.setState({
      cookie: cookie,
    });

    axios
      .get("http://localhost:5000/Cart/request/" + cookie._id)
      .then((response) => {
        console.log(response.data);
        this.setState({
          requests: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  changestatus(id) {
    console.log("Changing : " + id);
    
    axios.get("http://localhost:5000/Cart/ready/" + id).then((response) => {
      if (response.data == "OK") {
        console.log("OK");
        axios
        .get("http://localhost:5000/Cart/request/" + this.state.cookie._id)
        .then((response) => {
          console.log(response.data);
          this.setState({
            requests: response.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
      }
    });
  }

  RequestList() {
    return this.state.requests.map((currentorder) => {
      if (currentorder.status == "in preparation") {
        return <Order order={currentorder} changestatus={this.changestatus} />;
      } else {
        return <Order2 order={currentorder} />;
      }
    });
  }

  render() {
    const { cookie } = this.state;
    if (cookie) {
      return (
        <div>
          <Navbar />

          <div className="container mt-5">
            <h2 className="mb-5">My requests</h2>
            <div className="row d-flex justify-content-center">
              {this.RequestList()}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Navbar />
          <div className="container mt-5">
            <h2>You must be logged in to see your request</h2>
          </div>
        </div>
      );
    }
  }
}
