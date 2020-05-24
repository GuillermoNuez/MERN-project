const router = require("express").Router();
let Product = require("../models/product.model");

router.route("/").get((req, res) => {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/season/:id").get((req, res) => {
  Product.find({ season: req.params.id })
    .then((product) => res.json(product))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const userid = req.body.userid;

  const product = req.body.product;
  const description = req.body.description;
  const type = req.body.type;
  const price = req.body.price;
  const season = req.body.season;

  const newProduct = new Product({
    userid,
    product,
    description,
    type,
    price,
    season,
    image1: "",
  });
  newProduct.image1 = newProduct._id + "-main." + req.body.format;
  
  console.log(newProduct);
  newProduct
    .save()
    .then(() => res.json({ status: "OK", id: newProduct._id }))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Product.findById(req.params.id)
    .then((product) => res.json(product))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/getuser/:id").get((req, res) => {
  Product.find({ userid: req.params.id })
    .then((product) => {
      res.json(product);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then((product) => res.json("Product deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      product.username = req.body.username;
      product.product = req.body.product;
      product.type = req.body.type;
      product.season = req.body.season;
      product.price = Number(req.body.price);

      product
        .save()
        .then(() => res.json("Product updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
module.exports = router;
