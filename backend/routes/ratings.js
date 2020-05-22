const router = require("express").Router();
let Rating = require("../models/rating.model");
let User = require("../models/user.model");

router.route("/").get((req, res) => {
  Rating.find()
    .then((products) => res.json(products))
    .catch((err) => res.status(400).json("Error:" + err));
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

  Rating.find({ iduser: req.params.id }).then((ratings) => {
    for (let index = 0; index < ratings.length; index++) {
      userids.push(ratings[index].ratingowner);
    }

    User.find({ _id: { $in: userids } })
      .then((users) => {
        for (let i = 0; i < users.length; i++) {
          let data = {
            username: users[i].username,
            photo:users[i].photo,
            mensaje: ratings[i].message,
            score: ratings[i].score,
          };
          info.push(data);
        }
        res.json(info);
      })
      .catch((err) => res.status(400).json("Error:" + err));
  });
});

router.route("/:id").delete((req, res) => {
  Rating.findByIdAndDelete(req.params.id)
    .then((rating) => res.json("Rating deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
