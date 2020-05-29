const router = require("express").Router();
let User = require("../models/user.model");
let Product = require("../models/product.model");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "HuertUpProject@gmail.com",
    pass: "huertup123",
  },
});

router.route("/").get((req, res) => {
  User.find({
    role: "Farmer",
  })
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/locations").get((req, res) => {
  let list = [];
  User.find()
    .then((users) => {
      users.forEach((user) => {
        if (user.location) {
          list.push(user.location);
        }
      });
      let unique = [...new Set(list)];
      res.json(unique);
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/:id").get((req, res) => {
  let username;
  let email;
  let location;
  let photo;
  let photos;
  User.findById(req.params.id)
    .then((user) => {
      username = user.username;
      email = user.email;
      photo = user.photo;
      location = user.location;
      photos = user.photos;
      Product.find({
        userid: req.params.id,
      })
        .then((products) => {
          const info = {
            username: username,
            email: email,
            products: products,
            photo: photo,
            location: location,
            photos: photos,
          };

          res.json(info);
        })
        .catch((err) => res.status(400).json("Error:" + err));
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/getproductsbylocation/:id").get((req, res) => {
  User.find({ location: req.params.id })
    .then((user) => {
      let idlist = [];
      user.forEach((element) => {
        idlist.push(element._id);
      });
      Product.find({
        userid: { $in: idlist },
      })
        .then((products) => {
          res.json(products);
        })
        .catch((err) => res.status(400).json("Error:" + err));
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;
  const newUser = new User({ username, email, password, role });
  console.log(newUser._id);
  newUser
    .save()
    .then(() => {
      transporter.sendMail({
        to: email,
        subject: "Confirm Email",
        html:
          '<p>Click <a href="http://localhost:5000/verify/' +
          newUser._id +
          '">here</a> to verify your email</p>',
      });
      res.json("User added!");
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

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
          if (user.confirmed == false) {
            res.json("Please confirm your email");
            console.log("EMAIL NOT CONFIRMED");
          } else {
            return res.send({
              success: true,
              mes: "Valid sign in.",
              user: users[0],
            });
          }
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

router.route("/update/").post((req, res) => {
  User.findById(req.body._id)
    .then((user) => {
      user.username = req.body.username;
      user.email = req.body.email;
      user.password = req.body.password;
      user.location = req.body.location;
      user.bio = req.body.bio;
      user.role = req.body.role;
      if (req.body.photo) {
        user.photo = req.body.photo;
      }
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

router.route("/getuser/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
