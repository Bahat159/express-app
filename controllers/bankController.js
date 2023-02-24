var bankInfo = require("../models/bank");
var async = require("async");


exports.bank_list = function (req, res, next)  {
    bankInfo.find()
    .sort([["bank_name", "ascending"]])
    .exec(function (err, bank_list) {
      if (err) {
        return next(err);
      }
      res.json({
        status: "200 OK",
        message: bank_list,
      });
    });

};

