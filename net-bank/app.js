let express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongo = require("mongodb"),
  mongoose = require("mongoose"),
  methodOverride = require("method-override"),
  passport = require('passport'),
  LocalStrategy = require("passport-local"),
  session =require("express-session"),
  flash = require('connect-flash');
  User = require("./models/user.js");

let registerRoute= require("./routes/userRegister.js");
let loginRoute= require("./routes/userLogin.js");
const PORT = process.env.PORT || 8080;

//Bootstrap
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/NetBank", function(err, db) {
  console.log("Database is connected");

}, {
  useMongoClient: true
});



app.set('view engine', 'ejs');
app.set('views', './views');

//Use flash
app.use(flash());

app.use(bodyParser.urlencoded({
  extented: false
}));
app.use(express.static(__dirname + '/public/stylesheets/'));
app.use(methodOverride('_method'));

//use passport and set session
app.use(session({
  secret: 'Login is necessary',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//Get current user
app.use(function(req, res, next) {
  res.locals.user = req.user;
   res.locals.error= req.flash("error");
   res.locals.success= req.flash("success");
  next();
});




//Use of local authentication
passport.use(new LocalStrategy(User.authenticate()));

//Serialize and deserialize user
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next()
});

app.get("/", function(req, res) {
  let currentUser = req.user;
  res.render("index",{currentUser: currentUser});
});
app.get("/home", function(req, res) {
  let currentUser = req.user;

res.render("index",{currentUser: currentUser});
});
//app.use(userRoute);


app.use(registerRoute);
app.use(loginRoute);

app.listen(PORT, function() {
  console.log("Server is up and running");
});
