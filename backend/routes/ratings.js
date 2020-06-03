const router = require("express").Router();
let Rating = require("../models/rating.model");
let User = require("../models/user.model");

router.route("/").get((req, res) => {
  Rating.find()
    .then((products) => res.json(products))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/getallinfo").get((req, res) => {
  User.find({
    role: "Farmer",
  }).then((users) => {
    let userids = [];

    users.forEach((element) => {
      userids.push(element._id);
    });

    Rating.find({ ratingowner: { $in: userids } }, function (err, array) {
      if (err) {
        res.json(err);
      } else {
        let data = [];
        var objects = {};
        array.forEach((o) => (objects[o._id] = o));
        var dupArray = userids.map((id) => objects[id]);

        res.json(dupArray);
      }
    });
  });
});

router.route("/add").post((req, res) => {
  const ratingowner = req.body.ratingowner;
  const iduser = req.body.iduser;
  const message = req.body.message;
  const score = req.body.score;

  const newRating = new Rating({
    ratingowner,
    iduser,
    message,
    score,
  });

  newRating
    .save()
    .then(() => res.json("Rating added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Rating.findById(req.params.id)
    .then((rating) => res.json(rating))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/getrating/:id").get((req, res) => {
  let info = [];
  let userids = [];
  let data = [];
  Rating.find({ iduser: req.params.id }).then((ratings) => {
    for (let index = 0; index < ratings.length; index++) {
      userids.push(ratings[index].ratingowner);
    }

    User.find({ _id: { $in: userids } }, function (err, array) {
      if (err) {
        // handle error
      } else {
        var objects = {};
        array.forEach((o) => (objects[o._id] = o));
        var dupArray = userids.map((id) => objects[id]);
        // here you have objects with duplicates in dupArray:
        for (let index = 0; index < dupArray.length; index++) {
          let aux = {
            photo: dupArray[index].photo,
            username: dupArray[index].username,
            mensaje: ratings[index].message,
            score: ratings[index].score,
          };
          data.push(aux);
        }

        res.json(data);
      }
    });
  });
});

router.route("/:id").delete((req, res) => {
  Rating.findByIdAndDelete(req.params.id)
    .then((rating) => res.json("Rating deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
