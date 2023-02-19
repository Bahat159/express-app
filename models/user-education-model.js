var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const UserEducationSchema = new Schema({
  primary_school_name: { type: String, required: true },
  primary_school_state: { type: String, required: true },
  primary_school_city: { type: String, required: true },
  secondary_school_name: { type: String, required: true },
  secondary_school_state: { type: String, required: true },
  secondary_school_city: { type: String, required: true },
  tetiary_name: { type: String, required: true },
  tetiary_state: { type: String, required: true },
  tetiary_city: { type: String, required: true },
  tetiary_course: { type: String, required: true },
});

module.exports = mongoose.model("Education", UserEducationSchema);
