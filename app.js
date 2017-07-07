const express = require("express");
const app = express();

app.use("static", express.static("public"));
const dogs = [{name: "peanut", age: 12, id: 1}, {name: "scooter", age: 16, id: 2}];

app.get("/", (req, res) => {
  res.send("good job!");
});

app.get("/api/dogs", (req, res) => {
  res.json(dogs);
});

app.get("/api/dogs/:id", (req, res) => {
  const id = Number(req.params.id);
  const dog = dogs.find(tempDog => {
    return tempDog.id === id;
  });
  res.json(dog);
});

app.listen(3000);
