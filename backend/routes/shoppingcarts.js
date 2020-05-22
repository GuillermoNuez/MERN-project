const router = require("express").Router();
let ShoppingCart = require("../models/shoppingcart.model");
let Product = require("../models/product.model");

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
    productid: req.body.id
  })
    .then(res.json("Cart product deleted"))
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
module.exports = router;
