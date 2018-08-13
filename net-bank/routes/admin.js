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

//Get Details of register clients

router.get("/admin/:id/details", function(req, res){
  let userId = req.params.id, currentUser= req.user;
  User.findById(req.params.id, function(err, result){
    if(err){
      console.log(err);
    }
    console.log(userId);

      res.render('user-detail',{user: result, currentUser: currentUser})
  })

});






function isLoggedIn(req, res, next) {
  if(req.isAuthenticated() && req.user.isAdmin=== true){
    return next();
  }
  req.flash("error","Please Login First");
  res.redirect("/");

}
let loginMiddleware = passport.authenticate('local', {
  failureRedirect: "/login"
});


module.exports= router;
