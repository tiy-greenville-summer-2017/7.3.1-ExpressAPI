const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Dog = require("./models/dog");
const bodyParser = require("body-parser");
mongoose.Promise = require('bluebird');

mongoose.connect("mongodb://localhost:27017/dogdb");

// app.use("static", express.static("public"));
const dogs = [{
  name: "peanut", age: 12, id: 1},
  {name: "scooter", age: 16, id: 2},
  {name: "paul", age: 20, id: 3}
];
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api/dogs", (req, res) => {
  Dog.find({}).then(dogs => {
    res.json(dogs)
    console.log(dogs);
  })
});

app.post("/api/dogs", (req, res) => {
  dog = new Dog(req.body).save().then((newDog) => {
    res.json({});
  })
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

app.get("/api/dogs/:id", (req, res) => {
  const id = Number(req.params.id);
  const dog = dogs.find(tempDog => {
    return tempDog.id === id;
  });
  res.json(dog);
});

app.listen(3000);
