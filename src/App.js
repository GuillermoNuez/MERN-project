import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import UsersList from "./components/users-list.component";
import ProductsList from "./components/products-list.component";
import CreateProduct from "./components/create-product.component";
import SeeProduct from "./components/seeproduct.component";
import CreateUser from "./components/create-user.component";
import EditExercise from "./components/edit-product.component";
import Index from "./components/index.component";
import Login from "./components/login.component";
import EditUser from "./components/edit-user.component";
import MyCart from "./components/cart-list.component";
import Chat from "./components/chat.component";
import AllProducts from "./components/allproducts.component";
import MyOrders from "./components/myorders.component";
import Requests from "./components/request.component";
import MyProfile from "./components/myprofile.component";
import AllUsers from "./components/allusers.component";
import ForgotPassword from "./components/forgotpassword.component";
import Chats from "./components/chats.component";
import AdminPanel from "./components/adminpanel.component";
import Notify from "./components/notify.component";
import Recover from "./components/recover.component";

function App() {
  return (
    <Router>
      <Route path="/" exact component={Index} />
      <Route path="/product/:id" exact component={SeeProduct} />
      <Route path="/edit/:id" component={EditExercise} />
      <Route path="/createproduct" component={CreateProduct} />
      <Route path="/createuser" component={CreateUser} />
      <Route path="/login" component={Login} />
      <Route path="/edituser" component={EditUser} />
      <Route path="/mycart" component={MyCart} />
      <Route path="/users" component={UsersList} />
      <Route path="/user/:id" exact component={ProductsList} />
      <Route path="/chat/:id" exact component={Chat} />
      <Route path="/products" exact component={AllProducts} />
      <Route path="/myorders" exact component={MyOrders} />
      <Route path="/requests" exact component={Requests} />
      <Route path="/myprofile" exact component={MyProfile} />
      <Route path="/allusers" exact component={AllUsers} />
      <Route path="/forgotpassword" exact component={ForgotPassword} />
      <Route path="/chats" exact component={Chats} />
      <Route path="/adminpanel" exact component={AdminPanel} />
      <Route path="/notify" exact component={Notify} />
      <Route path="/recover/:id" component={Recover} />
    </Router>
  );
}

export default App;
