const router = require("express").Router();
let ShoppingCart = require("../models/shoppingcart.model");
let Product = require("../models/product.model");
let Checkout = require("../models/checkout.model");
let FarmerCheckout = require("../models/farmercheckout.model");

router.route("/:userid").get((req, res) => {
  const id = req.params.userid;
  ShoppingCart.find({
    userid: id,
  })
    .then((products) => {
      let idlist = [];
      let productList = [];

      for (let index = 0; index < products.length; index++) {
        idlist.push(products[index].productid);
      }
      Product.find(
        {
          _id: { $in: idlist },
        },
        (err, result) => {
          if (err) {
            res.json("Server Error");
          }
          try {
            for (let index = 0; index < result.length; index++) {
              let info = {
                productid: idlist[index],
                product: result[index].product,
                type: result[index].type,
                shipping: result[index].shipping,
                price: result[index].price,
                amount: products[index].amount,
                image: result[index].image1,
              };
              productList.push(info);
            }
            res.json(productList);
          } catch {
            res.json("Something went Wrong");
          }
        }
      );
    })
    // res.json(products))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/ready/:userid").get((req, res) => {
  Checkout.findOne({
    _id: req.params.userid,
  })
    .then((order) => {
      order.status = "ready";
      order.save().then(res.json("OK"));
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/add").post((req, res) => {
  const userid = req.body.userid;
  const productid = req.body.productid;
  const amount = req.body.amount;

  ShoppingCart.find(
    {
      userid: userid,
      productid: productid,
    },
    (err, cart) => {
      if (err) {
        res.json("Server Error");
      }
      try {
        if (cart.length == 0) {
          const newProduct = new ShoppingCart({
            userid,
            productid,
            amount,
          });
          newProduct
            .save()
            .then(() => res.json("product added to shopping cart"))
            .catch((err) => res.status(400).json("Error: " + err));
        } else {
          ShoppingCart.findById(cart[0]._id)
            .then((product) => {
              product.amount = cart[0].amount + amount;

              product
                .save()
                .then(() => res.json("ShoppingCart updated!"))
                .catch((err) => res.status(400).json("Error: " + err));
            })
            .catch((err) => res.status(400).json("Error: " + err));
        }
      } catch {
        res.json("Something went Wrong");
      }
    }
  );
});

router.route("/").delete((req, res) => {
  ShoppingCart.findOneAndDelete({
    userid: req.body.userid,
    productid: req.body.id,
  })
    .then(res.json("Cart product deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/delete").delete((req, res) => {
  ShoppingCart.deleteMany({
    userid: req.body.userid,
  })
    .then(res.json("OK"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  ShoppingCart.findById(req.params.id)
    .then((product) => {
      if (product.amount != 0) {
        product.amount = req.body.amount;
        product
          .save()
          .then(() => res.json("ShoppingCart updated!"))
          .catch((err) => res.status(400).json("Error: " + err));
      } else {
        ShoppingCart.findByIdAndDelete(req.params.id)
          .then((product) => res.json("ShoppingCart deleted"))
          .catch((err) => res.status(400).json("Error: " + err));
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/addcheckout").post((req, res) => {
  let idclient = req.body.idclient;
  let products = req.body.products;
  let name = req.body.name;
  let adress = req.body.adress;
  let phonenumber = req.body.phonenumber;
  let zipcode = req.body.zipcode;
  let payment = req.body.payment;

  const newCheckout = new Checkout({
    idclient,
    products,
    name,
    adress,
    phonenumber,
    zipcode,
    payment,
  });

  newCheckout
    .save()
    .then(() => {
      let idlist = [];
      products.forEach((element) => {
        idlist.push(element.productid);
      });
      Product.find(
        {
          _id: { $in: idlist },
        },
        (err, result) => {
          if (err) {
            res.json("Server Error");
          }
          try {
            for (let index = 0; index < result.length; index++) {
              let newFarmerCheckout = new FarmerCheckout({
                idfarmer: result[index].userid,
                idproduct: result[index]._id,
                idpedido: newCheckout._id,
                amount: products[index].amount,
              });
              newFarmerCheckout
                .save()
                .catch((err) => res.status(400).json("Error: " + err));
            }
            ShoppingCart.deleteMany({
              userid: idclient,
            })
              .then(res.json("OK"))
              .catch((err) => res.status(400).json("Error: " + err));
          } catch {
            res.json("Something went Wrong");
          }
        }
      );
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/getcheckout/:userid").get((req, res) => {
  // const id = req.params.userid;
  Checkout.find({
    idclient: req.params.userid,
  })
    .then((order) => {
      res.json(order);
    })
    // res.json(products))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/request/:userid").get((req, res) => {
  // const id = req.params.userid;
  FarmerCheckout.find({
    idfarmer: req.params.userid,
  })
    .then((orders) => {
      let group2 = orders.reduce((r, a) => {
        r[a.idproduct] = [...(r[a.idproduct] || []), a];
        return r;
      }, {});
      let idarray = [];
      Object.entries(group2).forEach(([key, value]) => {
        value.forEach((element) => {
          idarray.push(element.idproduct);
        });
      });

      Product.find({ _id: { $in: idarray } }, function (err, array) {
        if (err) {
          res.json(err);
        } else {
          var dict = []; // create an empty array

          array.forEach((element) => {
            dict.push({
              key: element._id,
              value: element.product,
            });
          });

          var dict2 = [];
          for (let index = 0; index < orders.length; index++) {
            dict2.push({
              key: orders[index].idpedido,
              products: orders[index],
            });
          }
          let group = dict2.reduce((r, a) => {
            r[a.key] = [...(r[a.key] || []), a];
            return r;
          }, {});
          let info = [];
          Object.entries(group).forEach(([key, value]) => {
            for (let index = 0; index < value.length; index++) {
              for (let i = 0; i < dict.length; i++) {
                if (value[index].products.idproduct == dict[i].key) {
                  value[index].idproduct = dict[i].value;
                }
              }
            }
            info.push({ idpedido: key, products: value, status: "" });
          });
          let a = [];
          info.forEach((element) => {
            a.push(element.idpedido);
          });

          Checkout.find({ _id: { $in: a } }, function (err, array) {
            if (err) {
              res.json(err);
            } else {
              let data2 = [];
              for (let index = 0; index < info.length; index++) {
                data2.push({
                  idpedido: info[index].idpedido,
                  products: info[index].products,
                  status: array[index].status,
                });
              }
              res.json(data2);
            }
          });
        }
      });

      //
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/deletechechout").delete((req, res) => {
  Checkout.findOneAndDelete({
    idclient: req.body.userid,
    _id: req.body.id,
  })
    .then(res.json("Checkout deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/getoverallinfo/:userid").get((req, res) => {
  const id = req.params.userid;
  let info = [];
  FarmerCheckout.find({
    idfarmer: id,
  })
    .then((products) => {
      let group = products.reduce((r, a) => {
        r[a.idproduct] = [...(r[a.idproduct] || []), a];
        return r;
      }, {});

      Object.entries(group).forEach(([key, value]) => {
        let amount = 0;
        value.forEach((element) => {
          amount += element.amount;
        });
        info.push({ Name: key, amount: amount });
      });
      let aux = [];
      info.forEach((element) => {
        aux.push(element.Name);
      });

      Product.find(
        {
          _id: { $in: aux },
        },
        (err, result) => {
          if (err) {
            res.json("Server Error");
          }
          try {
            let data = [];
            let date;
            let s;
            for (let index = 0; index < result.length; index++) {
              date = new Date(result[index].createdAt);
              month = date.getMonth() + 1;

             s = date.toUTCString().split(' ');
              data.push({
                Name: result[index].product,
                amount: info[index].amount,
                Season: result[index].season,
                type: result[index].type,
                month: s[2]
              });
            }
            res.json(data);
          } catch {
            res.json(err);
          }
        }
      );
      // res.json(info);
    })

    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/getcheckoutlenght/:userid").get((req, res) => {
  ShoppingCart.find({
    userid: req.params.userid,
  })
    .then((order) => {
      if (order == []) {
        res.json(0);
      } else {
        res.json(order.length);
      }
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
