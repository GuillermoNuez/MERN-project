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
        $or: [
          { iduser1: req.body.iduser1, iduser2: req.body.iduser2 },
          { iduser1: req.body.iduser2, iduser2: req.body.iduser1 },
        ],
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
    .then((messages) => {
      res.json(messages);
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

router.route("/getchats/:id").get((req, res) => {
  let id = req.params.id;
  Chat.find({
    $or: [{ iduser1: id }, { iduser2: id }],
  }).then((chats) => {
    if (chats) {
      let data = [];
      let chatids = [];
      let userids = [];
      let lastmessages = [];

      let aux = "";

      chats.forEach((element) => {
        aux = "";
        chatids.push(element._id);

        if (element.iduser1 == id) {
          aux = element.iduser2;
        } else {
          aux = element.iduser1;
        }
        userids.push(aux);
        data.push({ userid: aux, idchat: element._id });
      });

      User.find({ _id: { $in: userids } })
        .then((users) => {
          let data2 = [];
          for (let index = 0; index < users.length; index++) {
            let element = {
              userid: data[index].userid,
              idchat: data[index].idchat,
              userphoto: users[index].photo,
              username: users[index].username,
            };
            data2.push(element);
          }

          Message.find({ idchat: { $in: chatids } }, function (err, array) {
            if (err) {
              res.json(err);
            } else {
              var dict2 = [];
              for (let index = 0; index < array.length; index++) {
                dict2.push({
                  key: array[index].idchat,
                  message: array[index].message,
                });
              }

              let group = dict2.reduce((r, a) => {
                r[a.key] = [...(r[a.key] || []), a];
                return r;
              }, {});
              let info = [];
              Object.entries(group).forEach(([key, value]) => {
                lastmessages.push(value[value.length - 1]);
              });
              data = [];
              for (let index = 0; index < data2.length; index++) {
                data.push({
                  userid: data2[index].userid,
                  userphoto: data2[index].userphoto,
                  username: data2[index].username,
                  lastmessage: lastmessages[index].message,
                  idchat: chatids[index],
                });
              }
              console.log(data);
              res.json(data);
            }
          });
        })
        .catch((err) => res.status(400).json("Error: " + err));
    } else {
      console.log("You have no chats");
      res.json("You have no chats");
    }
  });
});
module.exports = router;
