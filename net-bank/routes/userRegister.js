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




//App Registration Route
    router.get("/register", function(req, res) {
      res.render("register");
    });

    router.post("/register", function(req, res) {
     let name = req.body.name,
        username = req.body.username,
        password = req.body.password,
        age = req.body.age,
        employeeId = req.body.securityId,
        registrationCode = req.body.registrationCode,
        securityId = req.body.securityId,
        sex = req.body.sex,
        isAdmin = false;

      if (registrationCode === "123456") {
        isAdmin = true;
      }

      User.register(new User({
        name: name,
        username: username,
        age: age,
        employeeId: employeeId,
        registrationCode: registrationCode,
        isAdmin: isAdmin,
        securityId: securityId,
        sex: sex
      }), password, function(err, result) {
        if (err) {
          console.log(err);
          return res.redirect("back");

        }
        passport.authenticate('local')(req, res, function() {
          res.render("index");
        });
      });

    });






    module.exports = router;
