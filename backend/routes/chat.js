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
  const iduser1 = req.body.iduser1;
  const iduser2 = req.body.iduser2;
  const msg = req.body.msg;
  const newChat = new Chat({ iduser1: iduser1, iduser2: iduser2 });
  newChat
    .save()
    .then((chat) => {
      let id = chat._id;
      const newMsg = new Message({ idchat: id, iduser: iduser1, message: msg });
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
              let countarray = [];

              array.forEach((element) => {});
              for (let index = 0; index < array.length; index++) {
                dict2.push({
                  key: array[index].idchat,
                  message: array[index].message,
                  createdAt: array[index].createdAt,
                  userid: array[index].iduser,
                  read: array[index].read,
                });
              }
              let group = dict2.reduce((r, a) => {
                r[a.key] = [...(r[a.key] || []), a];
                return r;
              }, {});
              Object.entries(group).forEach(([key, value]) => {
                let count = 0;
                value.forEach((element) => {
                  if (id != element.userid && element.read == false) {
                    count++;
                  }
                });
                value[value.length - 1].read = count;
                lastmessages.push(value[value.length - 1]);
              });
              data = [];
              let date;
              let month;
              let dt;
              let hour;
              let minutes;
              let year;
              let seconds;
              let miliseconds;

              for (let index = 0; index < data2.length; index++) {
                date = new Date(lastmessages[index].createdAt);
                month = date.getMonth() + 1;
                dt = date.getDate();
                hour = date.getHours();
                minutes = date.getMinutes();
                year = date.getFullYear();
                seconds = date.getSeconds();
                miliseconds = date.getMilliseconds();

                if (dt < 10) {
                  dt = "0" + dt;
                }
                if (month < 10) {
                  month = "0" + month;
                }

                data.push({
                  userid: data2[index].userid,
                  userphoto: data2[index].userphoto,
                  username: data2[index].username,
                  unread: lastmessages[index].read,
                  lastmessage: lastmessages[index].message,
                  createdAt: parseInt(
                    year + month + dt + hour + minutes + seconds + miliseconds
                  ),

                  idchat: chatids[index],
                });
              }
              res.json(data);
            }
          });
        })
        .catch((err) => res.status(400).json("Error: " + err));
    } else {
      res.json("You have no chats");
    }
  });
});

router.route("/readchat").post((req, res) => {
  try {
    Message.updateMany(
      { idchat: req.body.idchat, iduser: req.body.iduser, read: false },
      { $set: { read: true } }
    ).then((users) => {});
  } catch (err) {
    console.error(err);
  }
});

router.route("/getunread/:id").get((req, res) => {
  let id = req.params.id;
  Chat.find({
    $or: [{ iduser1: id }, { iduser2: id }],
  }).then((chats) => {
    let idarray = [];
    chats.forEach((element) => {
      idarray.push(element._id);
    });

    Message.find({
      idchat: { $in: idarray}, iduser: { $ne: id }, read: false 
    }).then((messages) => {
      res.json(messages.length);
    });
  });
});

module.exports = router;
