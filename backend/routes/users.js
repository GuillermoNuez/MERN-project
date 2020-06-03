const router = require("express").Router();
let User = require("../models/user.model");
let Product = require("../models/product.model");
let Rating = require("../models/rating.model");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "HuertUpProject@gmail.com",
    pass: "huertup123",
  },
});

router.route("/recoverpassword/:email").get((req, res) => {
  User.findOne({ email: req.params.email })
    .then((user) => {
      if (user) {
        transporter.sendMail({
          to: user.email,
          subject: "Recover password",
          html: "<p>Your password is : " + user.password + "</p>",
        });
        res.json("Email sent");
      } else {
        res.json("Fake Email sent");
      }
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/").get((req, res) => {
  User.find({
    role: "Farmer",
  })
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/allusers").get((req, res) => {
  User.find({
    role: "Farmer",
  })
    .then((users) => {
      let data = [];
      let aux = [];
      users.forEach((element) => {
        aux.push(element._id);
      });

      Rating.find({
        iduser: { $in: aux },
      })
        .then((products) => {
          let info = [];
          let group = products.reduce((r, a) => {
            r[a.iduser] = [...(r[a.iduser] || []), a];
            return r;
          }, {});

          Object.entries(group).forEach(([key, value]) => {
            let rating = 0;
            let total = 0;

            value.forEach((element) => {
              rating += element.score;
              total++;
            });

            rating = rating / total;
            info.push({ Id: key, score: rating });
          });
          let s;

          users.forEach((element) => {
            s = 0;

            info.forEach((e) => {
              if (e.Id == element._id) {
                s = e.score;
              }
            });

            let p = {
              _id: element._id,
              location: element.location,
              username: element.username,
              photo: element.photo,
              score: s,
            };
            data.push(p);
          });
          res.json(data);
        })
        .catch((err) => res.status(400).json("Error:" + err));
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((product) => res.json("User deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/all").get((req, res) => {
  User.find({ $or: [{ role: "Client" }, { role: "Farmer" }] })
    .then((users) => {
      res.json(users);
    })
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
  let bio;
  User.findById(req.params.id)
    .then((user) => {
      username = user.username;
      email = user.email;
      photo = user.photo;
      location = user.location;
      photos = user.photos;
      bio = user.bio;
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
            bio: bio,
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
      console.log("User added!");
      res.json("User added!");
    })
    .catch((err) => {
      console.log("Error: " + err);
      res.status(400).json("Error: " + err);
    });
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
