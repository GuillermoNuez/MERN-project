const router = require("express").Router();

router.route("/upload").post((req, res) => {
  if (req.files === null) {
    res.status(400).json("No file was uploaded");
    console.log("Empty");
  } else {
    console.log("NAME");
    console.log(req.files.files);
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
  if (req.files === null) {
    res.status(400).json("No file was uploaded");
    console.log("Empty");
  } else {
    console.log("NAME");
    console.log(req.files.files);
    let file = req.files.files;
    file.mv(`../public/productpics/${file.name}`, (err) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }
      console.log("FINISHED");
      res.json("Upload completed");
    });
  }
});

router.route("/uploadproductphotos").post((req, res) => {
  console.log("NAME");
  console.log(req.files.files);


  // for (let index = 0; index < req.files.files.length; index++) {
  //   let file = req.files.files[index];
  //   file.mv(`../public/productpics/${file.name}`, (err) => {
  //     if (err) {
  //       console.log(err);
  //       res.status(500).send(err);
  //     }
  //     console.log("FINISHED");
  //     res.json("Upload completed");
  //   });
  // }
});

module.exports = router;
