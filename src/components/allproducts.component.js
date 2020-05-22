import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../src/index.css";
import Navbar from "./navbar.component";

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
      </div>
    </div>
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
    axios
      .get("http://localhost:5000/products/")
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
    console.log(e.target.value);
    this.setState({
      location: e.target.value,
    });
    if (e.target.value == "") {
      this.setState({
        products: this.state.originalproducts,
      });
    } else {
      this.state = {
        products: [],
      };

      axios
        .get(
          "http://localhost:5000/Users/getproductsbylocation/" + e.target.value
        )
        .then((response) => {
          this.setState({
            products: response.data,
          });
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
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
        })
      });
    }
  }
  productList() {
    return this.state.products.map((currentexercise) => {
      return <Product exercise={currentexercise} key={currentexercise._id} />;
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
    return (
      <div>
        <Navbar />
        <div className="container mt-5">
          <div className="row mb-5">
            <input
              type="text"
              className="form-control search-form"
              placeholder="Search"
              value={this.state.search}
              onChange={this.onChangeSearch}
            />
            <select onChange={this.onChangeSeason} value={this.state.season}>
              <option>All</option>
              <option>Spring</option>
              <option>Summer</option>
              <option>Fall</option>
              <option>Winter</option>
            </select>

            <select
              onChange={this.onChangeLocation}
              value={this.state.location}
            >
              <option></option>
              {this.locationList()}
            </select>

            <label>Price : </label>

            <select onChange={this.onChangePrice} value={this.state.price}>
              <option></option>
              <option>Lower to higher</option>
              <option>Higher to lower</option>
            </select>

            <select onChange={this.onChangeType} value={this.state.type}>
              <option></option>
              {this.typeList()}
            </select>
          </div>

          <div className="row">{this.productList()}</div>
        </div>
      </div>
    );
  }
}
