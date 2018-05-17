let express = require('express'),
    router = express.Router(),
      methodOverride = require("method-override"),
      passport = require('passport'),
      LocalStrategy = require("passport-local"),
      User = require("../models/user.js");


    router.get("/", function(req, res) {

      res.render("index");
    });
    router.get("/home", function(req, res) {

      res.render("index");
    });


//User Login Route

let loginMiddleware= passport.authenticate('local',{
  successRedirect:"/",
  failureRedirect:"/login"
});

    router.get("/login", function(req, res){
        res.render("login");
    });

    router.post("/login",loginMiddleware,  function(req,res){


    });



module.exports= router;