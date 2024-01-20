/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/
const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Entry = require("./models/Entry");
const TodoItem = require("./models/TodoItem");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");
const { default: mongoose } = require("mongoose");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|
//reference https://docs.google.com/presentation/d/1-096jf5d_j9RhdTW_1PsGPb2rre7fSY_tmhFqhMVpWE/edit#slide=id.p1
router.get("/entry", (req, res) => {
  Entry.find({ user_id: req.query.user_id }).then((contents) => {
    res.send(contents);
  });
});
router.post("/entry", (req, res) => {
  const update = {
    $set: {
      user_id: req.body.user_id,
      text: req.body.text,
      header: req.body.header,
    },
  };
  const query = {
    _id: req.body._id,
  };
  const options = {
    upsert: true,
  };
  Entry.updateOne(query, update, options)
    .then(() => {
      console.log("saved");
      res.send({});
    })
    .catch(() => {
      res.send({});
    });
});

router.get("/todoItem", (req, res) => {
  //console.log("getting from router");
  TodoItem.find({ userId: req.query.userId }).then((contents) => {
    res.send(contents);
  });
});

router.post("/todoItem", (req, res) => {
  console.log(req.body.userId);
  console.log(req.body.name);
  console.log("starting post");
  const NewTodoItem = new TodoItem({
    userId: req.body.userId,
    name: req.body.name,
    completed: req.body.completed,
  });

  NewTodoItem.save()
    .then(() => {
      console.log("saved");
      res.send({});
    })
    .catch(() => {
      res.send({});
    });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
