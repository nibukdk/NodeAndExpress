let express = require('express'),
  router = express.Router(),
  methodOverride = require("method-override"),
  passport = require('passport'),
  LocalStrategy = require("passport-local"),
  flash = require('connect-flash');
  User = require("../models/user.js");



  //Use flash
  router.use(flash());

//Get current user
router.use(function(req, res, next) {
  res.locals.user = req.user;
  res.locals.message=req.flash("error");
  next();
});
router.use(function (req, res, next) { //Prevent Browser Cache after logout
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next()
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
router.get("/admin", isLoggedIn,function(req, res) {
  let currentUser = req.user;

  res.render("admin", {
    currentUser: currentUser
  });
});
//Providing client Route
router.get("/client", isLoggedIn,function(req, res) {
  let currentUser = req.user;

  res.render("client", {
    currentUser: currentUser
  });
});
//User Login Route

let loginMiddleware = passport.authenticate('local', {
  failureRedirect: "/login"
});

router.get("/login", function(req, res) {
  let currentUser = req.user;
  res.render("login", {
    currentUser: currentUser
  });
});

router.post("/login", loginMiddleware, function(req, res) {

  if (req.user.isAdmin === false) {
    res.redirect("/client");
  } else if (req.user.isAdmin === true) {
    res.redirect("/admin")
  }


});

//Log out

router.get("/logout", isLoggedIn,function(req, res,next) {
  req.logout();
  req.session.destroy(function (err) {
  if (err) {
    return next(err);
  }
  req.flash("logout", "Logged you out");
  res.redirect('/')
});
});



function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {

    return next();
  }
  req.flash("error","Please Login First");
  res.redirect("/");
  console.log("User is not logged in ");
}






module.exports = router;
