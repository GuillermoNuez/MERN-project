const router = require("express").Router();
let User = require("../models/user.model");
router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      user.confirmed = true;
      user.save().then(res.json("USER VERIFIED"));
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
