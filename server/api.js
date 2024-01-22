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
const Achievements = require("./models/Achievements");

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
router.post("/newEntry", (req, res) => {
  const newEntry = new Entry({
    user_id: req.body.user_id,
    text: req.body.text,
    header: req.body.header,
  });
  newEntry
    .save()
    .then((entry) => {
      res.send(entry);
    })
    .catch(() => {
      res.send({});
    });
});
router.post("/deleteEntry", (req, res) => {
  console.log(req.body._id);
  Entry.deleteOne({ _id: req.body._id })
    .then(res.send({}))
    .catch((e) => {
      console.log(e);
      res.send(e);
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
    upsert: false,
  };
  Entry.updateOne(query, update, options)
    .then(() => {
      res.send({
        _id: req.body._id,
        user_id: req.body.user_id,
        text: req.body.text,
        header: req.body.header,
      });
    })
    .catch(() => {
      res.send({});
    });
});

///////////////////////////      PROFILE      ///////////////////////////
router.get("/achievements", (req, res) => {
  //console.log("getting from router");
  Achievements.find({ userId: req.query.userId }).then((achievements) => {
    res.send(achievements);
  });
});

router.post("/addAchievement/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const newAchievement = req.body.achievement; // Assuming the achievement details are sent in the request body

    // Find the user by ID
    const user = await Achievements.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Add the new achievement to the array
    user.achievements.push(newAchievement);

    // Save the updated user document
    const updatedUser = await user.save();

    console.log("Achievement added successfully:", updatedUser);
    res
      .status(200)
      .json({ success: true, message: "Achievement added successfully", user: updatedUser });
  } catch (error) {
    console.error("Error adding achievement:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

/////////////////////// TO DO ///////////////////////

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

  console.log("made new item");
  console.log(NewTodoItem);

  NewTodoItem.save()
    .then(() => {
      console.log("saved");
      res.send({});
    })
    .catch(() => {
      console.log("catched");
      res.send({});
    });
});

router.post("/deleteItem", async (req, res) => {
  const _id = req.body._id;
  console.log("deleteItem", req.body._id);

  TodoItem.findByIdAndDelete(_id)
    .then(() => {
      res.send({
        _id: req.body._id,
        userId: req.body.userId,
        name: req.body.name,
        completed: req.body.completed,
      });
    })
    .catch(() => {
      res.send({});
    });
});

router.post("/updateItemCheck", async (req, res) => {
  const taskIdToUpdate = req.body._id; // Assuming taskId is sent in the request body
  const updatedFieldValue = req.body.completed; // Assuming the updated field value is sent in the request body
  console.log("updateItemCheck", req.body._id, req.body.completed);

  TodoItem.updateOne({ _id: taskIdToUpdate }, { $set: { completed: updatedFieldValue } })
    .then(() => {
      res.send({
        _id: req.body._id,
        userId: req.body.userId,
        name: req.body.name,
        completed: req.body.completed,
      });
    })
    .catch(() => {
      res.send({});
    });
});

router.post("/updateItemName", async (req, res) => {
  const taskIdToUpdate = req.body._id; // Assuming taskId is sent in the request body
  const updatedFieldValue = req.body.name; // Assuming the updated field value is sent in the request body
  console.log("updateItemName", req.body._id, req.body.name);

  TodoItem.updateOne({ _id: taskIdToUpdate }, { $set: { name: updatedFieldValue } })
    .then(() => {
      res.send({
        _id: req.body._id,
        userId: req.body.userId,
        name: req.body.name,
        completed: req.body.completed,
      });
    })
    .catch(() => {
      res.send({});
    });

  // try {
  //   const taskIdToUpdate = req.body._id; // Assuming taskId is sent in the request body
  //   const updatedFieldValue = req.body.name; // Assuming the updated field value is sent in the request body
  //   console.log("updateItemName", req.body._id, req.body.name);

  //   // Update the specified task's field
  //   const result = await TodoItem.updateOne(
  //     { _id: taskIdToUpdate },
  //     { $set: { name: updatedFieldValue } }
  //   );
  // } catch (error) {
  //   console.error("Error updating task field:", error);
  //   res.status(500).json({ success: false, message: "Internal server error" });
  // }
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
