const router = require("express").Router();
let User = require("../models/user.model");
let Product = require("../models/product.model");
let Rating = require("../models/rating.model");
let FarmerCheckout = require("../models/farmercheckout.model");
let Checkout = require("../models/checkout.model");
let Recover = require("../models/recover.model");

const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const inlineCss = require("nodemailer-juice");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "youremail@email.com",
    pass: "yourpassword",
  },
});

transporter.use("compile", inlineCss());

router.route("/recoverpassword/:email").get((req, res) => {
  User.findOne({ email: req.params.email })
    .then((user) => {
      if (user) {
        try {
          const recover = new Recover({ userid: user._id });
          recover.save();
        } catch {}
        transporter.sendMail({
          to: user.email,
          subject: "Recover password",
          html:
            '<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>Email</title> </head> <body> <div class="head"><img class="logo" src="cid:unique@logo.ee" /></div> <div class="container"> <div class="container-body"><br/><br/> <h1>' +
            "Recover your password <a href='http://localhost:3000/recover/" +
            user._id +
            "'>Here</a></h1><br/><h3>This operation will expire in 5 mins<br/><br/>" +
            ' <br/></div> </div> </div> <div class="head"></div> <style> body { margin: 0 !important; font-family: Arial, Helvetica, sans-serif; text-align: center; color: black; } .head { background-color: #f1c34a; width: 100%; height: 100px; text-align: center; } .logo { width: 258px; object-fit: cover; height: 80px; text-align: center; margin-top: 13px; } .container { width: 100%; text-align: center; } .container-body { margin-top: 25px; text-align: center; } .minicard { text-align: center; padding-bottom: 25px; margin-top: 25px; } .shop { font-weight: bold; width: 150px; height: 50px; background-color: #f1c34a; text-align: center; text-decoration: none; color: black; padding: 15px; margin-top: 50px; } .productimage { width: 400px; height: 400px; object-fit: cover; text-align: center; } </style> </body> </html>',
          attachments: [
            {
              filename: "Logo-min.png",
              path: "../src/fotos/Logo-min.png",
              cid: "unique@logo.ee", //same cid value as in the html img src
            },
          ],
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
          '<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>Email</title> </head> <body> <div class="head"><img class="logo" src="cid:unique@logo.ee" /></div> <div class="container"> <div class="container-body"><br/><br/> <h1>' +
          "Click <a href='http://localhost:5000/verify/" +
          newUser._id +
          "'>Here</a> to verify your email" +
          "</h1><br/><br/>" +
          ' <br/></div> </div> </div> <div class="head"></div> <style> body { margin: 0 !important; font-family: Arial, Helvetica, sans-serif; text-align: center; color: black; } .head { background-color: #f1c34a; width: 100%; height: 100px; text-align: center; } .logo { width: 258px; object-fit: cover; height: 80px; text-align: center; margin-top: 13px; } .container { width: 100%; text-align: center; } .container-body { margin-top: 25px; text-align: center; } .minicard { text-align: center; padding-bottom: 25px; margin-top: 25px; } .shop { font-weight: bold; width: 150px; height: 50px; background-color: #f1c34a; text-align: center; text-decoration: none; color: black; padding: 15px; margin-top: 50px; } .productimage { width: 400px; height: 400px; object-fit: cover; text-align: center; } </style> </body> </html>',
        attachments: [
          {
            filename: "Logo-min.png",
            path: "../src/fotos/Logo-min.png",
            cid: "unique@logo.ee", //same cid value as in the html img src
          },
        ],
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

router.route("/testemail").post((req, res) => {
  try {
    let title = req.body.title;
    let body = req.body.body;
    let price = req.body.price;
    let product = req.body.product;
    let username = req.body.username;
    let id = req.body.userid;

    let idclients = [];
    let checkouts = [];
    let emailList = [];

    FarmerCheckout.find({ idfarmer: id })
      .then((checkout) => {
        checkout.forEach((element) => {
          checkouts.push(element.idpedido);
        });
        Checkout.find({
          _id: { $in: checkouts },
        }).then((res) => {
          let group2 = res.reduce((r, a) => {
            r[a.idclient] = [...(r[a.idclient] || []), a];
            return r;
          }, {});

          Object.entries(group2).forEach(([key, value]) => {
            idclients.push(key);
          });
          User.find({
            _id: { $in: idclients },
          }).then((res) => {
            res.forEach((element) => {
              emailList.push(element.email);
            });
            transporter.sendMail({
              to: emailList,
              subject: "News",
              html:
                '<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>Email</title> </head> <body> <div class="head"><img class="logo" src="cid:unique@logo.ee" /></div> <div class="container"> <div class="container-body"> <h1>' +
                title +
                "</h1> <h4>Good news, a new product from " +
                username +
                "</h4><h4>" +
                body +
                '</h4> <img class="productimage" src="cid:unique@kreata.ee" /> <div class="minicard"> <h1>' +
                product.product +
                "</h1> <h3>Price : " +
                price +
                '€ </h3> <br/> <a href="http://localhost:3000/product/' +
                product._id +
                '" class="shop">Shop now</a> <br/></div> </div> </div> <div class="head"></div> <style> body { margin: 0 !important; font-family: Arial, Helvetica, sans-serif; text-align: center; color: black; } .head { background-color: #f1c34a; width: 100%; height: 100px; text-align: center; } .logo { width: 258px; object-fit: cover; height: 80px; text-align: center; margin-top: 13px; } .container { width: 100%; text-align: center; } .container-body { margin-top: 25px; text-align: center; } .minicard { text-align: center; padding-bottom: 25px; margin-top: 25px; } .shop { font-weight: bold; width: 150px; height: 50px; background-color: #f1c34a; text-align: center; text-decoration: none; color: black; padding: 15px; margin-top: 50px; } .productimage { width: 400px; height: 400px; object-fit: cover; text-align: center; } </style> </body> </html>',
              attachments: [
                {
                  filename: product.image1,
                  path: "../public/productpics/" + product.image1,
                  cid: "unique@kreata.ee", //same cid value as in the html img src
                },
                {
                  filename: "Logo-min.png",
                  path: "../src/fotos/Logo-min.png",
                  cid: "unique@logo.ee", //same cid value as in the html img src
                },
              ],
              template: "mail.handlebars",
            });
            console.log("Email sent");
          });
        });
      })
      .catch((err) => res.status(400).json("Error:" + err));
  } catch {
    res.json("Something went wrong");
  }
});

router.route("/updatepassword").post((req, res) => {
  Recover.findOne({ userid: req.body.userid }).then((users) => {
    console.log(users);
    User.findById(users.userid).then((user) => {
      console.log(user);
      user.password = req.body.password;
      user.save().then(() => {
        res.json({
          success: true,
          mes: "User Updated",
        });
        console.log("password updated");
      });
    });
  });
});

module.exports = router;
