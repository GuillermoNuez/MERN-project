const router = require("express").Router();
let Chat = require("../models/chat.model");
let Message = require("../models/message.model");
let User = require("../models/user.model");

router.route("/").post((req, res) => {
  let userName;
  let info;
  User.findById(req.body.iduser2)
    .then((user) => {
      userName = user.username;
    })
    .catch((err) => res.status(400).json("Error:" + err))
    .then(
      Chat.findOne({
        $or: [{ iduser1: req.body.iduser1 }, { iduser2: req.body.iduser1 }],
        $or: [{ iduser2: req.body.iduser2 }, { iduser1: req.body.iduser2 }],
      })
        .then((chat) => {
          if (chat) {
            info = {
              username: userName,
              messages: chat._id,
            };
            res.json(info);
          } else {
            console.log("EMpty");
            let data = {
              username: userName,
              messages: null,
            };
            res.json(data);
          }
        })
        .catch((err) => res.status(400).json("Error:" + err))
    );
});

router.route("/:id").get((req, res) => {
  Message.find({
    idchat: req.params.id,
  })
    .then((product) => {
      console.log(product);
      res.json(product);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  console.log("AUI");
  console.log(req.body.iduser1);
  const iduser1 = req.body.iduser1;
  const iduser2 = req.body.iduser2;
  const msg = req.body.msg;
  const newChat = new Chat({ iduser1: iduser1, iduser2: iduser2 });
  console.log(newChat);
  newChat
    .save()
    .then((chat) => {
      let id = chat._id;
      const newMsg = new Message({ idchat: id, iduser: iduser1, message: msg });
      console.log(
        "Creating Message with chat id : " +
          id +
          "| With user id : " +
          iduser1 +
          "| With msg : " +
          msg
      );
      console.log(newMsg);
      console.log("TRYING TO SAVE");
      newMsg
        .save()
        .then(() => res.json("Message created"))
        .catch((err) => res.status(400).json("Error creating message: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/addmessage").post((req, res) => {
  const idchat = req.body.idchat;
  const iduser = req.body.iduser;
  const message = req.body.message;
  const newMsg = new Message({
    idchat: idchat,
    iduser: iduser,
    message: message,
  });
  console.log("_____________ MESSAGE _________________");
  console.log(newMsg);
  console.log("trying to save");
  newMsg
    .save()
    .then(() => res.json("Message created"))
    .catch((err) => res.status(400).json("Error creating message: " + err));
});

router.route("/:id").get((req, res) => {
  Chat.findById(req.params.id)
    .then((product) => res.json(product))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Chat.findByIdAndDelete(req.params.id)
    .then((product) => res.json("Product deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Chat.findById(req.params.id)
    .then((chat) => {
      chat.username = req.body.username;
      chat.product = req.body.product;

      chat
        .save()
        .then(() => res.json("Product updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
module.exports = router;
