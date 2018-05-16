let express = require("express"),
  router = express.Router(),
  bodyParser = require("body-parser"),
  mongo = require("mongodb"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  localStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose"),
  methodOverride = require("method-override"),
  app = express();

  let Admin = require("./models/admin.js");
//Import Routers
//let adminRoute = require("./routes/admin/admin.js");

mongoose.connect("mongo://localhost/Net-Bank",function(err, db){
      console.log("Database is connected");
 }, {useMongoClient: true});


app.set("view engine", "ejs");
app.set('views', './views');


app.use(bodyParser.urlencoded({
  extented: true
}));
app.use(express.static(__dirname + '/public/stylesheets/'));
app.use(methodOverride('_method'));

//use passport and set session
app.use(require("express-session")({
  secret: 'Login is necessary',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//Bootstrap
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

//passport.use(new localStrategy(User.authenticate()));

//Serialize and deserialize user
//passport.serializeUser(User.serializeUser());
//passport.deserializeUser(User.deserializeUser());


app.get("/", function(req, res) {
    res.render("index");

});

//REgister Route
app.get("/admin", function(req, res) {
  res.send("This is admin page");
});


//Client Routers
app.get("/register", function(req, res) {
  res.render("register");
});


app.listen(8080, function() {
  console.log("Server side is running")
})
/*
Admin.register(new Admin({
  name:"Nibesh",
  securityId: "1234",
  employeeId: "1234",
  age: 25,
  username: "isAdmin",
  password: "isAdmin",
  isAdmin: true

}), function(err, result){
    if(err){
      console.log(err);
    }else{
      console.log(result);
      res.json(result);
    }

});*/
