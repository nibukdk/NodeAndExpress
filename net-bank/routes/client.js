let express = require('express'),
  router = express.Router(),
  methodOverride = require("method-override"),
  passport = require('passport'),
  LocalStrategy = require("passport-local"),
  flash = require('connect-flash'),
  User = require("../models/user.js");
    //middlewares = ("../middleware");





//Use flash
router.use(flash());

//Get current user
router.use(function(req, res, next) {
  res.locals.user = req.user;
  res.locals.message = req.flash("error");
  res.locals.messge = req.flash("success");
  next();
});

router.use(function(req, res, next) { //Prevent Browser Cache after logout
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next()
});

let passportAuthenticate = passport.authenticate('local', {
  failureRedirect: "/login",
  failureFlash: true
});
router.get("/", function(req, res) {
  let currentuser = user;
  res.render("index", {
    currentuser: currentuser
  });
});

router.get("/home", function(req, res) {

  res.render("index");
});

//Providing Admin Route
//Providing client Route
router.get("/client", clientLoggedIn, function(req, res) {
  let currentUser = req.user;

  res.render("client", {
    currentUser: currentUser
  });
});

//User Login Route
router.get("/login", hasLoggedUser, function(req, res) {
  let currentUser = req.user;
  res.render("login", {
    currentUser: currentUser
  });
});

router.post("/login", passportAuthenticate, function(req, res) {
  let currentUser = req.user;
  User.findOneAndUpdate({ //To update last logged in data
    username: currentUser.username
  }, {
    last_login_date: Date.now()
  }, function(err, result) {
    if (err) {
      console.log(err);
    }
  });

  if (req.user.isAdmin === false) {
    res.redirect("/client");
  } else if (req.user.isAdmin === true) {
    res.redirect("/admin")
  }
});

//Log out

router.get("/logout", clientLoggedIn, function(req, res, next) {
  req.logout();
  req.session.destroy(function(err) {
    if (err) {
      return next(err);
    }
    //req.flash("success", "Logged you out");
    res.redirect('/')
  });
});

function clientLoggedIn(req, res, next) {
  if (req.isAuthenticated() && !req.user.isAdmin) {

    return next();
  }
  req.flash("error", "Please Login First");
  res.redirect("/");
  console.log("User is not logged in ");

}

function hasLoggedUser(req, res, next) {
  if (req.isAuthenticated()) {
    req.flash("error", "Already logged in. Please logout first");
    console.log("User is already logged in ");
    return res.redirect("/");
  }
  return next();
}



module.exports = router;
