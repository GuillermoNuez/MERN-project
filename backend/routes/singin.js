const router = require("express").Router();
let User = require("../models/user.model");
let UserSession = require("../models/usersession.model");

router.route("/login").post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.find(
    {
      email: email,
      password: password,
    },
    (err, users) => {
      if (err) {
        res.json("Server Error");
      }
      try {
        const user = users[0];
        if (email == user.email && password == user.password) {
          const usersession = new UserSession();
          usersession.userid = user._id;

          usersession.save((err, doc) => {
            if (err) {
              res.json("Server Error "+err);
            }
              res.json("Valid Sign in "+doc._id);

          });
        }
      } catch {
        res.json("Wrong Parameters");
      }
    }
  );
});

module.exports = router;
