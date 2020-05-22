const router = require("express").Router();
let User = require("../models/user.model");
let Product = require("../models/product.model");

router.route("/").get((req, res) => {
  User.find({
    role: "Farmer",
  })
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/:id").get((req, res) => {
  let username;
  let email;

  User.findById(req.params.id)
    .then((user) => {
      username = user.username;
      email = user.email;
    })
    .catch((err) => res.status(400).json("Error:" + err))
    .then(
      Product.find({
        userid: req.params.id,
      })

        .then((products) => {
          const info = {
            username: username,
            email: email,
            products: products,
          };

          res.json(info);
        })
        .catch((err) => res.status(400).json("Error:" + err))
    );
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const bio = req.body.bio;
  const location = req.body.location;
  const role = req.body.role;

  const newUser = new User({ username, email, password, bio, location, role });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/login").post((req, res) => {
  console.log("entrmoas");
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
          const test = {
            userid: users[0]._id,
            username: users[0].username,
            email: users[0].email,
            password: users[0].password,
            role: users[0].role,
          };
          console.log(users[0]);
          return res.send({
            success: true,
            mes: "Valid sign in.",
            user: users[0],
          });
        }
      } catch {
        res.json("Wrong Parameters");
      }
    }
  );
});
router.route("/verify").post((req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;

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
        if (
          username == user.username &&
          email == user.email &&
          password == user.password &&
          role == user.role
        ) {
          return res.send({
            success: true,
            mes: "User Verified",
          });
        }
      } catch {
        res.json("User not valid");
      }
    }
  );
});

router.route("/update/:id").post((req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      user.username = req.body.username;
      user.email = req.body.email;
      user.password = req.body.password;
      user.role = req.body.role;

      user
        .save()
        .then(() =>
          res.json({
            success: true,
            mes: "User Updated",
          })
        )
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
