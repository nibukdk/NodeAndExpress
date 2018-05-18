let express = require('express'),
  router = express.Router(),
  methodOverride = require("method-override"),
  passport = require('passport'),
  LocalStrategy = require("passport-local"),
  User = require("../models/user.js");


//Get current user
router.use(function(req, res, next) {
  res.locals.user = req.user;
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
router.get("/admin", function(req, res) {
  let currentUser = req.user;
  if(!currentUser){
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    return res.redirect("/");
  }
  res.render("admin", {
    currentUser: currentUser
  });
});
//Providing client Route
router.get("/client", function(req, res) {
  let currentUser = req.user;
  if(!currentUser){
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    return res.redirect("/");
  }
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
  if (err) return next(err)
  res.redirect('/')
})
});



function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {

    return next();
  }
  res.redirect("back");
  console.log("User is not logged in ");
}






module.exports = router;
