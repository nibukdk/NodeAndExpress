let express = require('express'),
  router = express.Router(),
  methodOverride = require("method-override"),
  passport = require('passport'),
  LocalStrategy = require("passport-local"),
  flash = require('connect-flash'),
  User = require("../models/user.js");
//let middleware = ("../middleware");



router.use(flash());

//Get current user

router.use(function(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next()
});
router.use(function(req, res, next) {
  res.locals.user = req.user;
  res.locals.message = req.flash("error");
  next();
});

//Main route for home page

router.get("/", function(req, res) {
  let currentUser = req.user;
  res.render("index", {
    currentUser: currentUser
  });
});
router.get("/home", function(req, res) {
  let currentUser = req.user;

  res.render("index", {
    currentUser: currentUser
  });
});


//Admin Routes
router.get("/admin", adminLoggedIn, function(req, res) {
  let currentUser = req.user;
  let userList = {};

  User.find({}, function(err, result) {
    result.forEach(result => {
      userList[result._id] = result;

    });

    res.render("admin", {
      currentUser: currentUser,
      result: result
    });

  });


});

//Get Details of register clients

router.get("/admin/:id/details", function(req, res) {
  let userId = req.params.id,
    currentUser = req.user;
  User.findById(req.params.id, function(err, result) {
    if (err) {
      console.log(err);
      res.redirect("back")
    }

    res.render('user-detail', {
      userInfo: result,
      currentUser: currentUser
    });

  })

});

//Update user userInfo
router.get("/admin/:id/details/update", function(req, res) {
  let userId = req.params.id,
    currentUser = req.user;
  User.findById(req.params.id, function(err, result) {
    if (err) {
      console.log(err);
    }
    console.log(userId);

    res.render('user-detail-update', {
      userInfo: result,
      currentUser: currentUser
    });
    console.log(result)
  });
});

//Update user details post
router.put("/admin/:id/details/", function(req, res) {
  let data = {
    name: req.body.name,
    username: req.body.username,
    age: req.body.age,
    email: req.body.email
  };
  User.findByIdAndUpdate(req.params.id, data, function(err, updatedData) {
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      res.redirect("/admin/" + req.params.id + "/details/");
      console.log(updatedData);
    }

  });
});


//delete user
router.delete("/admin/:id/details", function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      console.log("Unable to delete", err);
    }
    res.redirect("/admin");
  });
});

function adminLoggedIn(req, res, next) {
  if (req.isAuthenticated() && req.user.isAdmin === true) {
    return next();
  }
  req.flash("error", "Please Login First");
  res.redirect("/");

}

module.exports = router;
