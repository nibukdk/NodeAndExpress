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
  next();
});

router.use(function(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next()
});

router.get("/", function(req, res) {
  let currentUser = req.user;
  res.render("index",{currentUser: currentUser});
});
router.get("/home", function(req, res) {
  let currentUser = req.user;

res.render("index",{currentUser: currentUser});
});
//App Registration Route
router.get("/register", adminLoggedIn, function(req, res) {
  let currentUser = req.user;
  res.render("register", {
    currentUser: currentUser
  });
});

router.post("/register", function(req, res) {
  let currentUser = req.user;
  let name = req.body.name,
    username = req.body.username,
    password = req.body.password,
    age = req.body.age,
    employeeId = req.body.securityId,
    registrationCode = req.body.registrationCode,
    securityId = req.body.securityId,
    sex = req.body.sex,
    email = req.body.email,
    isAdmin = false;

  if (registrationCode === "123456") {
    isAdmin = true;
  }
  console.log(email);
  User.register(new User({
    name: name,
    username: username,
    age: age,
    employeeId: employeeId,
    registrationCode: registrationCode,
    isAdmin: isAdmin,
    securityId: securityId,
    sex: sex,
    email: email
  }), password, function(err, result) {
    if (err) {
      console.log(err);
      return res.redirect("back");

    }
    res.redirect('/admin');


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
