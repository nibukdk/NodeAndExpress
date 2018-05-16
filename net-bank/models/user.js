let mongoose = require("mongoose"),
  passportLocalMongoose = require("passport-local-mongoose");


let userSchema =  mongoose.Schema({
  name: String,
  securityId: String,
  employeeId: String,
  age: {
    type: Number,
    min: 18,
    max: 65
  },
  username: String,
  password: String,
  isAdmin: {
    type: Boolean,
    default: false
  },
  sex:String,
  registrationCode:String

});


userSchema.plugin(passportLocalMongoose);


let User = mongoose.model('User', userSchema);


module.exports = User;
