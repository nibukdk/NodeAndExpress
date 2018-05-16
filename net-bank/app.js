let express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongo = require("mongodb"),
  mongoose = require("mongoose"),
  methodOverride = require("method-override"),
  passport = require('passport'),
  LocalStrategy = require("passport-local"),
  User = require("./models/user.js");


//Bootstrap
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/NetBank", function(err, db) {
  console.log("Database is connected");
  console.log(db)
}, {
  useMongoClient: true
});



app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.urlencoded({
  extented: false
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

//Get current user
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});



//Use of local authentication
passport.use(new LocalStrategy(User.authenticate()));

//Serialize and deserialize user
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req, res) {

  res.render("index");
});
app.get("/home", function(req, res) {

  res.render("index");
});
//app.use(userRoute);


app.get("/register", function(req, res) {
  res.render("register");
});

app.post("/", function(req, res) {
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
      return res.redirect("/register");

    }
    passport.authenticate('local')(req, res, function() {
      res.render("index");
    });
  });

});



app.listen(8080, function() {
  console.log("Server is up and running");
});

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
