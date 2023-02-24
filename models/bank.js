var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const BankSchema = new Schema({
  account_name: {type: String, require: true},
  bank_name: { type: String, required: true },
  account_number: { type: Number, required: true, minLength: 9, maxLength: 12 },
  branch: { type: String, required: true },
});

module.exports = mongoose.model("Bank", BankSchema);
