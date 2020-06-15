const router = require("express").Router();
let Product = require("../models/product.model");
let User = require("../models/user.model");

router.route("/").get((req, res) => {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/getallinfo/").get((req, res) => {
  Product.find()
    .then((products) => {
      let info = [];
      let data = [];

      products.forEach((element) => {
        info.push(element.userid);
      });

      User.find({ _id: { $in: info } }, function (err, array) {
        if (err) {
          // handle error
        } else {
          var objects = {};
          array.forEach((o) => (objects[o._id] = o));
          var dupArray = info.map((id) => objects[id]);
          // here you have objects with duplicates in dupArray:
          for (let index = 0; index < dupArray.length; index++) {
            let aux = {
              userphoto: dupArray[index].photo,
              username: dupArray[index].username,
              location: dupArray[index].location,
              product: products[index].product,
              _id: products[index]._id,
              description: products[index].description,
              type: products[index].type,
              price: products[index].price,
              season: products[index].season,
              image1: products[index].image1,
              onsale:products[index].onsale,
            };
            data.push(aux);
          }

          res.json(data);
        }
      });

    })
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
      product.description = req.body.description;
      product.price = Number(req.body.price);
      product.onsale = req.body.onSale;
      product
        .save()
        .then(() => res.json("Product updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
module.exports = router;
