const router = require("express").Router();
let Product = require("../models/product.model");
router.route("/upload").post((req, res) => {
  if (req.files === null) {
    res.status(400).json("No file was uploaded");
  } else {
    let file = req.files.files;
    file.mv(`../public/userpics/${file.name}`, (err) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }
      console.log("FINISHED");
      res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    });
  }
});

router.route("/uploadproductphoto").post((req, res) => {
  let file = req.files.files;
  file.mv(`../public/productpics/${file.name}`, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    console.log("FINISHED");
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
    (product.image2 = routes[0]),
      (product.image3 = routes[1]),
      (product.image4 = routes[2]),
      (product.image5 = routes[3]);

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
    console.log("FINISHED");
  });
  Product.findById(req.params.id).then((product) => {
    product.image1 = file.name
    product
      .save()
      .then(res.json({ status: "OK", message: "upload completed" }))
      .catch((err) => res.status(400).json("Error: " + err));
  });

});

module.exports = router;
