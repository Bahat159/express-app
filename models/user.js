var mongoose = require("mongoose");
var Schema = mongoose.Schema;


const UserSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  middle_name: { type: String, required: true },
  state_of_origin: { type: String, required: true },
  city_of_birth: { type: String, required: true },
  current_city: { type: String, required: true },
  zipcode: { type: Number, required: true },
  marital_status: { type: String, required: true },
  current_address: { type: String, required: true },
  previous_address: { type: String, required: true },
  date_of_birth: { type: Date, required: true },
  phone_number: { type: Number, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  current_place_of_work: { type: String, required: true },
  previous_place_of_work: { type: String, required: true },
  work_title: { type: String, required: true },
  known_associate: { type: String, required: true },
  NIN_Number: { type: Number, required: true },
  IdCard_number: { type: Number, required: true },
});

module.exports = mongoose.model("User", UserSchema);
