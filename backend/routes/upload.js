const router = require("express").Router();
let Product = require("../models/product.model");
let User = require("../models/user.model");

router.route("/upload").post((req, res) => {
  let file = req.files.files;
  file.mv(`../public/userpics/${file.name}`, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

router.route("/uploadproductphoto").post((req, res) => {
  let file = req.files.files;
  file.mv(`../public/productpics/${file.name}`, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    res.json("Upload completed");
  });
});

router.route("/uploadproductphotos/:id").post((req, res) => {
  let routes = [];
  for (let index = 0; index < req.files.files.length; index++) {
    let aux = req.files.files[index].name.split(".");
    let name = `${req.params.id}` + `-` + `${index}` + `.` + `${aux[1]}`;
    let file = req.files.files[index];
    file.mv(`../public/productpics/${name}`, (err) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }
    });
    routes.push(name);
  }
  Product.findById(req.params.id).then((product) => {
    product.images = routes;
    product
      .save()
      .then(res.json({ status: "OK", message: "upload completed" }))
      .catch((err) => res.status(400).json("Error: " + err));
  });
});

router.route("/updatemainphoto/:id").post((req, res) => {
  let file = req.files.files;
  file.mv(`../public/productpics/${file.name}`, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
  });
  Product.findById(req.params.id).then((product) => {
    product.image1 = file.name;
    product
      .save()
      .then(res.json({ status: "OK", message: "upload completed" }))
      .catch((err) => res.status(400).json("Error: " + err));
  });
});

router.route("/updateprofilephotos/:id").post((req, res) => {
  let routes = [];
  if (req.files.files.length > 0) {
    for (let index = 0; index < req.files.files.length; index++) {
      let aux = req.files.files[index].name.split(".");
      let name = `${req.params.id}` + `-` + `${index}` + `.` + `${aux[1]}`;
      let file = req.files.files[index];
      file.mv(`../public/userphotos/${name}`, (err) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        }
      });
      routes.push(name);
    }
  } else {
    let aux = req.files.files.name.split(".");
    let name = `${req.params.id}` + `-` + `${0}` + `.` + `${aux[1]}`;
    let file = req.files.files;
    file.mv(`../public/userphotos/${name}`, (err) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }
    });
    routes.push(name);
  }

  User.findById(req.params.id).then((user) => {
    user.photos = routes;
    user
      .save()
      .then(
        res.json({ status: "OK", message: "upload completed", routes: routes })
      )
      .catch((err) => res.status(400).json("Error: " + err));
  });
});
module.exports = router;
