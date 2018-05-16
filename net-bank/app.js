let express = require("express"),
    router= express.Router(),
    bodyParser = require("body-parser"),
    mongo = require("mongodb"),
    mongoose = require("mongoose"),
    passport= require("passport"),
    localStrategy= require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    methodOverride= require("method-override"),
    app = express();

    //Import Routers
let adminRoute = require("./routes/admin/admin.js");

mongoose.connect("mongo://localhost/Net-Bank");


  app.set("view engine", "ejs");
  app.set('views', './views');


  app.use(bodyParser.urlencoded({ extented: true }));
  app.use(express.static(__dirname + '/public/'));
  app.use(methodOverride('_method'));

  //use passport and set session
  app.use(require("express-session")({
    secret: 'Login is necessary',
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  //passport.use(new localStrategy(User.authenticate()));

  //Serialize and deserialize user
  //passport.serializeUser(User.serializeUser());
  //passport.deserializeUser(User.deserializeUser());


  app.get("/", function(req, res){
    res.send("This is netbank");
  });

//Admin Route
  app.get("/admin", function(req,res){
    res.send("This is admin page");
  });


//Client Routers
app.get("/user", function(req,res){
  res.send("This is client page");
});


    app.listen(8080,function(){
      console.log("Server side is running")
    })
