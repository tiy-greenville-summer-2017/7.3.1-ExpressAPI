const mongoose = require('mongoose');

const dogSchema = new mongoose.Schema({
    name: String,
    owner: {
      type: mongoose.Schema.ObjectId
    },
    age: Number
});

const Dog = mongoose.model('Dog', dogSchema);

module.exports = Dog;
