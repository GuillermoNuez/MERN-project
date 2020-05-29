import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class TodosList extends Component {
  render() {
    return (
      <div id="index">
        <div className="row header">
          <div className="header-img">
            <div className="row nav">
              <div className="nav2-logo">
                <Link to="/" className="navbar-brand header-logo"></Link>
              </div>
              <div className="nav2-links2">
                <a href="#about_us">About Us</a>
                <a href="#farmers">Farmers</a>
                <a href="#blog">Blog</a>
                <a href="#contact">Contact</a>
                <Link to="/users" className="nav-link">
                  App
                </Link>
              </div>
            </div>
            <div className="row w-100 mt-5 header-container d-flex flex-column">
              <h1>
                Always ,local<br></br>
                is better for everyone.
              </h1>
              <h3 className="mt-2">
                Huertup deliver directly to you from the best local farmers &
                the best product.
              </h3>
              <div className="header-button mt-4">DOWNLOAD APP</div>
            </div>
          </div>
        </div>
        <div id="about_us" className="row">
          <div className="col-md-6 about-Us-Box d-flex flex-column align-items-center justify-content-center">
            <h1>ABOUT US</h1>
            <hr className="hr-1"></hr>
            <h4>
              Almost half of the food grown by farmers in this country is{" "}
              <span className="bold">never sold</span> , but eating healthy
              keeps getting more expensive. This is a cycle of food waste that
              needs to end, and there's a very{" "}
              <span className="bold">simple</span> solution to this very ugly
              problem.<br></br>
              <br></br>
              That is why we work hard to count on the{" "}
              <span className="bold">local farmers</span> who have the best
              product and eliminate the intermediaries that destroy the{" "}
              <span className="bold">agriculture economy.</span>
            </h4>
          </div>
          <div className="col-md-6">
            <div className="bolsa">
              <div className="bolsa-img"></div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 d-flex align-items-end justify-content-center">
            <div className="verduras">
              <div className="verduras-img"></div>
            </div>
          </div>
          <div className="col-md-6 about-Us-Box d-flex flex-column align-items-center justify-content-center">
            <h1>HOW IT WORKS</h1>
            <hr className="hr-1"></hr>

            <h2>01</h2>
            <h3>Contact with local farmers</h3>
            <br></br>
            <h2>02</h2>
            <h3>Discover seasonal fruits and vegetables</h3>
            <br></br>
            <h2>03</h2>
            <h3>Get your groceries delivered</h3>
            <br></br>
            <a href="#">Any questions? -></a>
          </div>
        </div>
        <div id="farmers" className="row">
          <div className="col-md-12 d-flex flex-column align-items-center justify-content-center farmers pb-5">
            <div className="row">
              <div className="col-md-12 d-flex flex-column align-items-center">
                <h1 className="mt-5">FARMERS</h1>
                <hr className="hr-1"></hr>
                <h3>Discover some of our local farmers</h3>
              </div>
              <div className="mt-5 row d-flex justify-content-around  w-100">
                <div className="carrousel">
                  <input type="radio" name="slides" id="radio-1" checked />
                  <input type="radio" name="slides" id="radio-2" />
                  <input type="radio" name="slides" id="radio-3" />
                  <input type="radio" name="slides" id="radio-4" />
                  <ul className="slides">
                    <li className="slide">
                      <div className="col-md-3 d-flex flex-column align-items-center">
                        <div className="farmer-img mb-4">
                          <div className="farmer-img-1"></div>
                        </div>
                        <h2>Manuel Bosch Cano</h2>
                        <h3>- Motril -</h3>
                        <h4>Avocado farm on the coast of Granada</h4>
                      </div>
                      <div className="col-md-3 d-flex flex-column align-items-center">
                        <div className="farmer-img mb-4">
                          <div className="farmer-img-2"></div>
                        </div>
                        <h2>Martín Navarro Crespo</h2>
                        <h3>- Valle de Lecrín -</h3>
                        <h4>The best oranges from the region of Granada</h4>
                      </div>
                      <div className="col-md-3 d-flex flex-column align-items-center">
                        <div className="farmer-img mb-4">
                          <div className="farmer-img-3"></div>
                        </div>

                        <h2>Marcos Aguilar Torres</h2>
                        <h3>- Dúrcal -</h3>
                        <h4>All kinds of tomatoes and the best quality</h4>
                      </div>
                    </li>
                    <li className="slide">
                      <div className="col-md-3 d-flex flex-column align-items-center">
                        <div className="farmer-img mb-4">
                          <div className="farmer-img-1"></div>
                        </div>
                        <h2>Manuel Bosch Cano</h2>
                        <h3>- Motril -</h3>
                        <h4>Avocado farm on the coast of Granada</h4>
                      </div>
                      <div className="col-md-3 d-flex flex-column align-items-center">
                        <div className="farmer-img mb-4">
                          <div className="farmer-img-1"></div>
                        </div>
                        <h2>Manuel Bosch Cano</h2>
                        <h3>- Motril -</h3>
                        <h4>Avocado farm on the coast of Granada</h4>
                      </div>
                      <div className="col-md-3 d-flex flex-column align-items-center">
                        <div className="farmer-img mb-4">
                          <div className="farmer-img-1"></div>
                        </div>
                        <h2>Manuel Bosch Cano</h2>
                        <h3>- Motril -</h3>
                        <h4>Avocado farm on the coast of Granada</h4>
                      </div>
                    </li>
                  </ul>
                  <div className="slidesNavigation">
                    <label for="radio-1" id="dotForRadio-1"></label>
                    <label for="radio-2" id="dotForRadio-2"></label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="blog" className="row">
          <div className="col-md-12 d-flex flex-column align-items-center">
            <h1 className="mt-5">BLOG</h1>
            <hr className="hr-1"></hr>
          </div>
          <div className="row d-flex justify-content-around pb-5 w-100">
            <div className="col-md-3 d-flex flex-column">
              <div className="blog-img">
                <div className="blog-img-1"></div>
              </div>
              <p>01-02-2019</p>
              <h2>Why buying local benefits the economy</h2>
              <h4 className="mt-2">
                You should know that you can contribute to the economy of your
                neighbourhood and...
              </h4>
              <a className="mt-3 readmore-btn">Read More</a>
            </div>
            <div className="col-md-3 d-flex flex-column">
              <div className="blog-img">
                <div className="blog-img-2"></div>
              </div>
              <p>10-09-2019</p>
              <h2>10 thing you dont know about vegetables</h2>
              <h4 className="mt-2">
                You will be surprised at the ammount of benefits that vegetables
                can have, especially if...
              </h4>
              <a className="mt-3 readmore-btn">Read More</a>
            </div>
            <div className="col-md-3 d-flex flex-column">
              <div className="blog-img">
                <div className="blog-img-3"></div>
              </div>
              <p>21-12-2019</p>
              <h2>Easy recipes to save money and stop wasting products</h2>
              <h4 className="mt-2">
                The recipes are so easy and delicius that yoiu will make them
                daily and you won't...
              </h4>
              <a className="mt-3 readmore-btn">Read More</a>
            </div>
          </div>
          <div className="col-md-12 d-flex align-items-center justify-content-center pb-5 pt-2">
            <a className="mt-3 readmore-btn-2">Show More</a>
          </div>
        </div>
        <div id="contact" className="row contact-us pb-5">
          <div className="col-md-12 d-flex flex-column align-items-center">
            <h1 className="mt-5">CONTACT US</h1>
            <hr className="hr-1"></hr>
          </div>
          <div className="row justify-content-center w-100">
            <div className="col-md-3">
              <input
                type="text"
                placeholder="Your name"
                className="contact-input mb-4"
              ></input>
              <input
                type="text"
                placeholder="Subject"
                className="contact-input"
              ></input>
            </div>
            <div className="col-md-3">
              <input
                type="text"
                placeholder="Description"
                className="contact-input-2 mb-4"
              ></input>
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
        <div className="row footer pb-5 justify-content-around pt-5">
          <div className="col-md-2 d-flex flex-column">
            <a href="#about_us">About Us</a>
            <a href="#farmers">Farmers</a>
            <a href="#blog">Blog</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="col-md-3">
            <div className="footer-img"></div>
          </div>
          <div className="col-md-3">
            <div className="row mb-3">
              <h4>Subscribe to the newsletter</h4>
            </div>
            <div className="row justify-content-between">
              <input
                type="text"
                placeholder="Description"
                className="contact-input-3"
              ></input>
              <div className="footer-button">Submit</div>
            </div>
          </div>
        </div>
        <div class="row footer pb-3 justify-content-around">
          <p>
            Copytight huertup 2019. All rights reserved.{" "}
            <a href="#">Terms of Service</a> - <a href="#">Privacy Policy</a>
          </p>
        </div>
      </div>
    );
  }
}
