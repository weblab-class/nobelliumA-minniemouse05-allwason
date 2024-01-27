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
const User = require("./models/User");
const Entry = require("./models/Entry");
const FriendList = require("./models/FriendList");
const TodoItem = require("./models/TodoItem");
const Achievement = require("./models/Achievement");
const TopThree = require("./models/TopThree");
const Folder = require("./models/Folder");

//const UserProfile = require("./models/UserProfile");

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
  // .catch((e) => {
  //   console.log(e);
  // });
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|
//reference https://docs.google.com/presentation/d/1-096jf5d_j9RhdTW_1PsGPb2rre7fSY_tmhFqhMVpWE/edit#slide=id.p1
router.get("/user", (req, res) => {
  User.find({ _id: req.query._id })
    .then((user) => {
      console.log('running router.get("/user") ', req.query._id);
      res.send({ user });
    })
    .catch(() => {
      res.send({});
      console.log("catched after router.get for /user");
    });
});

router.get("/friends", (req, res) => {
  FriendList.findOne({ userId: req.query.userId })
    .then((contents) => {
      if (!contents) {
        res.send({});
      } else {
        res.send(contents);
      }
    })
    .catch(() => {
      res.send({});
    });
});
router.post("/friends", (req, res) => {
  const update = {
    $set: {
      userId: req.body.userId,
      friends: req.body.friends,
    },
  };
  const query = {
    userId: req.body.userId,
  };
  const options = {
    upsert: true,
  };
  FriendList.updateOne(query, update, options)
    .then(() => {
      res.send({
        userId: req.body.userId,
        friends: req.body.friends,
      });
    })
    .catch(() => {
      res.send({});
    });
});
router.post("/friend_request", (req, res) => {
  const update = {
    $set: {
      userId: req.body.userId,
      requests: req.body.requests,
    },
  };
  const query = {
    userId: req.body.userId,
  };
  const options = {
    upsert: true,
  };
  FriendList.updateOne(query, update, options)
    .then(() => {
      res.send({
        userId: req.body.userId,
        requests: req.body.requests,
      });
    })
    .catch(() => {
      res.send({});
    });
});
router.post("/friend_requested", (req, res) => {
  const update = {
    $set: {
      userId: req.body.userId,
      requested: req.body.requested,
    },
  };
  const query = {
    userId: req.body.userId,
  };
  const options = {
    upsert: true,
  };
  FriendList.updateOne(query, update, options)
    .then(() => {
      res.send({
        userId: req.body.userId,
        requested: req.body.requested,
      });
    })
    .catch(() => {
      res.send({});
    });
});
router.get("/entry", (req, res) => {
  Entry.find({ userId: req.query.userId }).then((contents) => {
    res.send(contents);
  });
});
router.get("/folder", (req, res) => {
  Folder.find({ userId: req.query.userId })
    .then((contents) => {
      res.send(contents);
    })
    .catch(() => {
      res.send({ folders: [] });
    });
});
router.post("/folder", (req, res) => {
  const update = {
    $set: {
      userId: req.body.userId,
      folders: req.body.folders,
    },
  };
  const query = {
    userId: req.body.userId,
  };
  const options = {
    upsert: true,
  };
  Folder.updateOne(query, update, options)
    .then(() => {
      res.send({
        userId: req.body.userId,
        folders: req.body.folders,
      });
    })
    .catch(() => {
      res.send({});
    });
});
router.post("/newEntry", (req, res) => {
  const newEntry = new Entry({
    userId: req.body.userId,
    text: req.body.text,
    header: req.body.header,
    folder: req.body.folder,
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
      userId: req.body.userId,
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
        userId: req.body.userId,
        text: req.body.text,
        header: req.body.header,
      });
    })
    .catch(() => {
      res.send({});
    });
});

///////////////////////////      PROFILE      /////////////////////////////

//gets achievement based on user id
router.get("/userAchievements", (req, res) => {
  console.log('running router.get("/userAchievements"), req.query._id= ', req.query._id);
  User.findOne({ _id: req.query._id })
    .then((allAchievements) => {
      res.send(allAchievements.achievementArray);
    })
    .catch(() => {
      console.log('catching through router.get("/userAchievements")');
      res.send({});
    });
});

//finds user based on userID and then adds to the achievement array
router.post("/addAchievement", async (req, res) => {
  try {
    const achievementIdToUpdate = req.body.achievementId;
    console.log("addAchievement id", achievementIdToUpdate);

    const userToAward = await User.findById({ _id: req.body._id });

    if (!userToAward) {
      console.log("running inside !userToAward");
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (!userToAward.achievementArray.includes(achievementIdToUpdate)) {
      userToAward.achievementArray.push(achievementIdToUpdate);

      await userToAward.save();

      console.log("Saved new achievement, exp:", userToAward.achievementArray);
      res.send({});
    } else {
      console.log("Achievement already exists for the user");
      res.send({});
    }
  } catch (error) {
    console.log('catching error in router.post("/addAchievement"');
    //console.error("Error running addAchievement:", error);
    //res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//gets the achievement entry based on the achievementId
router.get("/getAchievement", (req, res) => {
  //console.log("getAchievement, achievementId= ", req.query.achievementId);
  Achievement.findOne({ achievementId: req.query.achievementId }).then((achievementData) => {
    //console.log("getAchievement, achievementData= ", achievementData);
    res.send(achievementData);
  });
});

//gets ALL achievements
router.get("/getAllAchievement", (req, res) => {
  Achievement.find({}).then((achievementData) => {
    //console.log("ALL achievementData", achievementData);
    res.send(achievementData);
  });
});

//just for initializing, not really needed anymore (but still keep)
router.post("/makeAchievement", (req, res) => {
  const NewAchievement = new Achievement({
    achievementId: req.body.achievementId,
    awardDescription: req.body.awardDescription,
    awardName: req.body.awardName,
  });

  NewAchievement.save()
    .then(() => {
      console.log("saved NewAchievement");
      res.send({});
    })
    .catch(() => {
      console.log("catched NewAchievement");
      res.send({});
    });
});
/////////////////////////     EXP       /////////////////////////////

// router.get("/exp", (req, res) => {
//   //console.log("getting from router");
//   UserProfile.findOne({ userId: req.query.userId }).then((contents) => {
//     // console.log("contents in /exp", contents);
//     res.send(contents);
//   });
// });

router.get("/exp", (req, res) => {
  //console.log("getting from router /exp");
  User.findOne({ _id: req.query.userId }).then((contents) => {
    // console.log("contents in /exp", contents);
    res.send(contents);
  });
});

//creates new userprofile with 0 exp
// router.post("/updateExp", async (req, res) => {
//   try {
//     const existingUser = await UserProfile.findOne({ userId: req.body.userId });

//     if (!existingUser) {
//       const NewUserProfile = new UserProfile({
//         name: req.body.name, //name of user
//         userId: req.body.userId,
//         totalExp: req.body.totalExp,
//       });

//       console.log("updateExp", req.body.name, req.body.userId, req.body.totalExp);

//       NewUserProfile.save()
//         .then(() => {
//           console.log("saved NewUserProfile");
//           res.send({});
//         })
//         .catch(() => {
//           console.log("catched NewUserProfile");
//           res.send({});
//         });
//     }
//   } catch (error) {
//     console.error("Error running updateExp:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// });

router.post("/addExp", async (req, res) => {
  try {
    const amtToUpdate = req.body.amtToUpdate;
    //console.log("addExp userId totalExp", taskIdToUpdate);
    //console.log("addExp userId totalExp", req.body.amtToUpdate);

    const userToAdd = await User.findById({ _id: req.body.userId });
    //console.log("userToAdd", userToAdd);
    userToAdd.totalExp += amtToUpdate;
    userToAdd
      .save()
      .then(() => {
        console.log("saved NewUser, exp:", userToAdd.totalExp);
        res.send({});
      })
      .catch(() => {
        console.log("catched NewUser");
        res.send({});
      });
  } catch (error) {
    console.error("Error running addExp:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// router.post("/addExp", async (req, res) => {
//   try {
//     const amtToUpdate = req.body.amtToUpdate;
//     const taskIdToUpdate = req.body.userId; // Assuming taskId is sent in the request body
//     //console.log("addExp userId totalExp", taskIdToUpdate);
//     //console.log("addExp userId totalExp", req.body.amtToUpdate);

//     const userToAdd = await UserProfile.findOne({ userId: req.body.userId });
//     //console.log("userToAdd", userToAdd);
//     userToAdd.totalExp += amtToUpdate;
//     userToAdd
//       .save()
//       .then(() => {
//         console.log("saved NewUserProfile, exp:", userToAdd.totalExp);
//         res.send({});
//       })
//       .catch(() => {
//         console.log("catched NewUserProfile");
//         res.send({});
//       });
//   } catch (error) {
//     console.error("Error running addExp:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// });

// router.post("/addAchievement", (req, res) => {
//   console.log("addAchievement running");
//   try {
//     const userId = req.body.userId;
//     console.log("addAchievement userId", userId);
//     const newAchievement = req.body.achievement; // Assuming the achievement details are sent in the request body
//     console.log("addAchievement newAchievement", newAchievement);

//     Achievements.findOne({ userId: userId }).then((res) => {
//       if (res) {
//         console.log("findOne Result:", res);
//       } else {
//         console.log("result not found", res);
//       }
//     });
//   } catch (error) {
//     console.error("Error adding achievement:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// });

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
      res.send(NewTodoItem);
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

/////////////////////// LEADERBOARD ///////////////////////

router.get("/topThree", (req, res) => {
  TopThree.findOne({ arrayId: req.query.arrayId }).then((contents) => {
    res.send(contents.results);
    console.log("get topThree, contets.results= ", contents.results);
  });
});

router.post("/updateTopThree", async (req, res) => {
  const TopThreeToUpdate = await TopThree.findById({ arrayId: req.body.arrayId });
  const userToAdd = req.body.userId;
  const nameToAdd = req.body.name;
  const userExp = req.body.totalExp;
  const newArrayElement = { userId: userToAdd, name: nameToAdd, exp: userExp };

  const insertionIndex = TopThreeToUpdate.results.findIndex(
    (obj) => newArrayElement.exp <= obj.size
  );

  // If insertionIndex is -1, it means the new element has the largest 'size' and should be inserted at the end
  const finalIndex = insertionIndex !== -1 ? insertionIndex : TopThreeToUpdate.results.length;

  // Insert the new element at the calculated index
  TopThreeToUpdate.results.splice(finalIndex, 0, newArrayElement);

  TopThreeToUpdate.results.pop();

  TopThreeToUpdate.results += amtToUpdate;
  TopThreeToUpdate.save()
    .then(() => {
      console.log("saved NewUser, exp:", userToAdd.totalExp);
      res.send({});
    })
    .catch(() => {
      console.log("catched NewUser");
      res.send({});
    });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
