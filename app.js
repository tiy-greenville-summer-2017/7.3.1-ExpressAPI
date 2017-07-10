const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Dog = require("./models/dog");
const User = require("./models/user");
const bodyParser = require("body-parser");

const passport = require("passport");
const BasicStrategy = require("passport-http").BasicStrategy;

mongoose.Promise = require('bluebird');

mongoose.connect("mongodb://localhost:27017/dogdb");

// app.use("static", express.static("public"));

app.use(bodyParser.json());

passport.use(new BasicStrategy(
  function(username, password, done) {
    User.findOne({username: username, password: password}).then(user => {
      if (!user) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    });
  }
));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api/dogs", passport.authenticate('basic', {session: false}), (req, res) => {
  console.log(req.user);
  Dog.find({owner: req.user._id}).then(dogs => {
    res.json(dogs);
    console.log(dogs);
  });
});

app.post("/api/dogs", passport.authenticate('basic', {session: false}), (req, res) => {
  req.body.owner = req.user._id;
  dog = new Dog(req.body).save().then((newDog) => {
    res.json({});
  });
});

app.patch("/api/dogs/:id", (req, res) => {
  Dog.findOne({_id: req.params.id}).then(dog => {
    Object.keys(req.body).forEach(key => {
      dog[key] = req.body[key];
    });
    dog.save().then(dog => {
      res.json(dog);
    });
  });
});

app.post("/api/users", (req, res) => {
  const user = new User(req.body).save().then(user => {
    res.json(user);
  });
});

app.get("/api/dogs/:id", (req, res) => {
  res.json({});
});

app.listen(3000);
