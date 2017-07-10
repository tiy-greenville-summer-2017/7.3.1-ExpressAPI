const express = require("express");
const app = express();
const path = require("path");

// app.use("static", express.static("public"));
const dogs = [{
  name: "peanut", age: 12, id: 1},
  {name: "scooter", age: 16, id: 2},
  {name: "paul", age: 20, id: 3}
];

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
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
