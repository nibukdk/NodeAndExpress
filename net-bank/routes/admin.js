let express = require('express'),
  router = express.Router(),
  methodOverride = require("method-override"),
  passport = require('passport'),
  LocalStrategy = require("passport-local"),
  flash = require('connect-flash');
  User = require("../models/user.js");



  router.use(flash());

//Get current user
router.use(function(req, res, next) {
  res.locals.user = req.user;
  res.locals.message=req.flash("error");
  next();
});

router.get("/admin", isLoggedIn,function(req, res) {
  let currentUser = req.user;
  let userList={};

  User.find({},function(err,result){
    result.forEach(result =>{
      userList[result._id]=result;
    });

    res.render("admin", {
      currentUser: currentUser,
      result: result
    });
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
let loginMiddleware = passport.authenticate('local', {
  failureRedirect: "/login"
});


module.exports= router;
