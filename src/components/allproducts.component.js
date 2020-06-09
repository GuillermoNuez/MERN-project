import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../src/index.css";
import Navbar from "./navbar.component";
import { getFromStorage } from "../utils/storage";

const Product = (props) => (
  <div class="product-box ml-2 mr-2 mb-4">
    <img src={"/productpics/" + props.product.image1} class="product-box-img" />
    <h4>{props.product.product}</h4>
    <h3 className="bold">{props.product.price}€/Kg</h3>
    <div className="product-box-info">
      <div class="d-flex align-items-center justify-content-between">
        <img
          className="product-box-userpic "
          src={"/userpics/" + props.product.userphoto}
        ></img>
        <p className="mb-0">{props.product.username}</p>
      </div>
      <div class="product-sidebox">
        <p className="mb-0 location"></p>
        <p className="mb-0">{props.product.location}</p>
      </div>
    </div>
    <Link className="viewproduct" to={"/product/" + props.product._id}>
      <h5 className="mb-0 Montserrat">View product</h5>
    </Link>
  </div>
);

export default class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onChangeSeason = this.onChangeSeason.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeType = this.onChangeType.bind(this);

    this.state = {
      cookie: "",
      originalproducts: [],
      products: [],
      season: "All",
      locations: [],
      location: "",
      price: "",
      types: [],
      type: "",
    };
  }

  componentDidMount() {
    const obj = getFromStorage("the_main_app");
    console.log(obj);
    if (obj && obj.cookie) {
      const { cookie } = obj;
      this.setState({ cookie: cookie });
    }
    axios
      .get("http://localhost:5000/products/getallinfo/")
      .then((response) => {
        console.log(response.data);
        this.setState({
          originalproducts: response.data,
          products: response.data,
        });

        // Para ordenar por type
        let aux = [];
        response.data.forEach((element) => {
          aux.push(element.type);
        });
        let unique = [...new Set(aux)];
        console.log(unique);
        this.setState({
          types: aux,
        });
        //
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost:5000/Users/locations")
      .then((response) => {
        console.log(response.data);
        this.setState({
          locations: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeSeason(e) {
    console.log(e.target.value);
    this.setState({
      season: e.target.value,
    });
    if (e.target.value == "All") {
      this.setState({
        products: this.state.originalproducts,
      });
    } else {
      this.setState({
        location: "",

        products: this.state.originalproducts.filter((p) => {
          return p.season.includes(e.target.value);
        }),
      });
    }
  }

  onChangeLocation(e) {
    this.setState({
      location: e.target.value,
    });
    if (e.target.value == "") {
      console.log("RESETING");
      this.setState({
        products: this.state.originalproducts,
      });
    } else {
      this.setState({
        season: "All",
        products: this.state.originalproducts.filter((p) => {
          return p.location.includes(e.target.value);
        }),
      });
    }
  }

  onChangeSearch(e) {
    let products = this.state.originalproducts;

    if (e.target.value == "") {
      this.setState({
        location: "",
        products: this.state.originalproducts,
      });
    } else {
      console.log(e.target.value.toLowerCase());
      this.setState({
        location: "",
        products: products.filter((p) => {
          return p.product.toLowerCase().includes(e.target.value.toLowerCase());
        }),
      });
    }
  }

  onChangePrice(e) {
    this.setState({
      price: e.target.value,
    });
    if (e.target.value == "") {
      this.setState({
        location: "",
        products: this.state.originalproducts,
      });
    } else {
      if (e.target.value == "Lower to higher") {
        this.setState({
          products: this.state.originalproducts,
        });
        this.state.products.sort((a, b) => a.price - b.price);
      } else {
        this.setState({
          products: this.state.originalproducts,
        });
        this.state.products.sort((a, b) => b.price - a.price);
      }
    }
  }

  onChangeType(e) {
    console.log(e.target.value);
    this.setState({
      type: e.target.value,
    });
    if (e.target.value == "") {
      this.setState({
        products: this.state.originalproducts,
      });
    } else {
      this.setState({
        products: this.state.originalproducts,
      });
      console.log(e.target.value.toLowerCase());
      this.setState({
        products: this.state.originalproducts.filter((p) => {
          return p.type.includes(e.target.value);
        }),
      });
    }
  }
  productList() {
    return this.state.products.map((currentproduct) => {
      console.log(currentproduct);
      return <Product product={currentproduct} key={currentproduct._id} />;
    });
  }

  locationList() {
    return this.state.locations.map((current) => {
      return <option>{current}</option>;
    });
  }

  typeList() {
    return this.state.types.map((current) => {
      return <option>{current}</option>;
    });
  }

  render() {
    const { cookie } = this.state;
    if (!cookie) {
      return (
        <div className="gray">
          <Navbar />
          <div className="container mt-5">
            <div className="row mb-5 d-flex align-items-center">
              <h3>
                All <span className="bold">products</span> from our{" "}
                <span className="bold">farmers</span>
              </h3>
              <input
                type="text"
                className="form-control search-form ml-4 mr-4"
                placeholder="Search product..."
                value={this.state.search}
                onChange={this.onChangeSearch}
              />
              <span>Season</span>
              <select
                className="ml-4 mr-4"
                onChange={this.onChangeSeason}
                value={this.state.season}
              >
                <option>All</option>
                <option>Spring</option>
                <option>Summer</option>
                <option>Fall</option>
                <option>Winter</option>
              </select>
              <span>Location</span>
              <select
                className="ml-4 mr-4"
                onChange={this.onChangeLocation}
                value={this.state.location}
              >
                <option></option>
                {this.locationList()}
              </select>

              <span>Price : </span>

              <select
                onChange={this.onChangePrice}
                value={this.state.price}
                className="ml-4 mr-4"
              >
                <option></option>
                <option>Lower to higher</option>
                <option>Higher to lower</option>
              </select>
            </div>

            <div className="row">{this.productList()}</div>
          </div>
        </div>
      );
    } else {
      if (cookie.role == "Farmer") {
        return (
          <div className="gray">
            <Navbar />
            <div className="container mt-5">
              <Link to={"/createproduct"}>
                <h5 className="mb-5 createproduct">Create product</h5>
              </Link>
              <div className="row mb-5 d-flex align-items-center">
                <h3>
                  All <span className="bold">products</span> from our{" "}
                  <span className="bold">farmers</span>
                </h3>
                <input
                  type="text"
                  className="form-control search-form ml-4 mr-4"
                  placeholder="Search product..."
                  value={this.state.search}
                  onChange={this.onChangeSearch}
                />
                <span>Season</span>
                <select
                  className="ml-4 mr-4"
                  onChange={this.onChangeSeason}
                  value={this.state.season}
                >
                  <option>All</option>
                  <option>Spring</option>
                  <option>Summer</option>
                  <option>Fall</option>
                  <option>Winter</option>
                </select>
                <span>Location</span>
                <select
                  className="ml-4 mr-4"
                  onChange={this.onChangeLocation}
                  value={this.state.location}
                >
                  <option></option>
                  {this.locationList()}
                </select>

                <span>Price : </span>

                <select
                  onChange={this.onChangePrice}
                  value={this.state.price}
                  className="ml-4 mr-4"
                >
                  <option></option>
                  <option>Lower to higher</option>
                  <option>Higher to lower</option>
                </select>
              </div>

              <div className="row">{this.productList()}</div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="gray">
            <Navbar />
            <div className="container mt-5">
              <div className="row mb-5 d-flex align-items-center">
                <h3>
                  All <span className="bold">products</span> from our{" "}
                  <span className="bold">farmers</span>
                </h3>
                <input
                  type="text"
                  className="form-control search-form ml-4 mr-4"
                  placeholder="Search product..."
                  value={this.state.search}
                  onChange={this.onChangeSearch}
                />
                <span>Season</span>
                <select
                  className="ml-4 mr-4"
                  onChange={this.onChangeSeason}
                  value={this.state.season}
                >
                  <option>All</option>
                  <option>Spring</option>
                  <option>Summer</option>
                  <option>Fall</option>
                  <option>Winter</option>
                </select>
                <span>Location</span>
                <select
                  className="ml-4 mr-4"
                  onChange={this.onChangeLocation}
                  value={this.state.location}
                >
                  <option></option>
                  {this.locationList()}
                </select>

                <span>Price : </span>

                <select
                  onChange={this.onChangePrice}
                  value={this.state.price}
                  className="ml-4 mr-4"
                >
                  <option></option>
                  <option>Lower to higher</option>
                  <option>Higher to lower</option>
                </select>
              </div>

              <div className="row">{this.productList()}</div>
            </div>
          </div>
        );
      }
    }
  }
}
