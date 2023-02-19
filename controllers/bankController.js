var bankInfo = require("../models/user-bank-model");
var User = require("../models/user-model");
var async = require("async");

const { body, validationResult } = require("express-validator");

exports.banks_list = function (req, res, next)  {
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

// Display detail page for a specific Author.
exports.bank_detail = function (req, res, next) {
  async.parallel(
    {
      bank_info: function (callback) {
        bankInfo.findById(req.params.id).exec(callback);
      },
      bank_user_info: function (callback) {
        User.find({ bank_user: req.params.id }, "User summary").exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      } // Error in API usage.
      if (results.bank_user == null) {
        // No results.
        var err = new Error("User not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      res.json({
        status: "200 OK",
        title: "Bank User Detail",
        bank_info: results.bank_info,
        bank_user_info: results.bank_user_info,
      });
    }
  );
};



// Handle Author create on POST.
exports.bank_user_create_post = [
  // Validate and sanitize fields.
  body("bank_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("bank name must be specified.")
    .isAlphanumeric()
    .withMessage("bank name has non-alphanumeric characters."),
  body("branch")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("branch name must be specified.")
    .isAlphanumeric()
    .withMessage("branch name has non-alphanumeric characters."),
  body("account_number", "Invalid Account Number")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create Author object with escaped and trimmed data
    var bank_info = new bankInfo({
      bank_name: req.body.bank_name,
      account_number: req.body.account_number,
      branch: req.body.branch,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.json({
        title: "Create Bank User",
        bank_info: bank_info,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.

      // Save author.
      bank_info.save(function (err) {
        if (err) {
          return next(err);
        }
        // Successful - redirect to new author record.
        res.json({ status: "200 OK", message: "Successfull" });
      });
    }
  },
];


// Display Author delete form on GET.
exports.bank_user_delete_get = function (req, res, next) {
  async.parallel(
    {
      bank_info: function (callback) {
        bankInfo.findById(req.params.id).exec(callback);
      },
      bank_user_info: function (callback) {
        User.find({ author: req.params.id }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.bank_info == null) {
        // No results.
        res.json("Action unsuccessful");
      }
      // Successful, so render.
      res.json({
        status: "200 OK",
        action: "Bank User Delete",
        bank_info: results.bank_info,
        bank_user_info: results.bank_user_info,
      });
    }
  );
};


// Handle Author delete on POST.
exports.bank_user_delete_post = function (req, res, next) {
  async.parallel(
    {
      bank_user: function (callback) {
        bankInfo.findById(req.body.bank_id).exec(callback);
      },
      bank_user_info: function (callback) {
        User.find({ author: req.body.bank_user_id }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      // Success.
      if (results.bank_id.length > 0) {
        // Author has books. Render in same way as for GET route.
        res.json({
          title: "Delete Author",
          bank_info: results.bank_id,
          bank_user_info: results.bank_user_id,
        });
        return;
      } else {
        // Author has no books. Delete object and redirect to the list of authors.
        bankInfo.findByIdAndRemove(
          req.body.bank_user_id,
          function deleteUser(err) {
            if (err) {
              return next(err);
            }
            // Success - go to author list.
            res.send({status: "Successful", message: "success deleting a user"});
          }
        );
      }
    }
  );
};


// Display Bank update form on GET.
exports.author_update_get = function (req, res, next) {
  bankInfo.findById(req.params.id, function (err, bank_info) {
    if (err) {
      return next(err);
    }
    if (bank_info == null) {
      // No results.
      var err = new Error("Bank User not found");
      err.status = 404;
      return next(err);
    }
    // Success.
    res.json({ title: "Update Bank User", bank_info: bank_info });
  });
};
