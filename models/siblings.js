var mongoose = require("mongoose");
var Schema = mongoose.Schema;


const UserSibling = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true},
  sex: { type: String, required: true },
});

module.exports = mongoose.model("Siblings", UserSibling);
