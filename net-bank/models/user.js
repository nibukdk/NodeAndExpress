let mongoose = require("mongoose"),
  passportLocalMongoose = require("passport-local-mongoose"),
  validator= require("validator");




function validation(email){
  if(validator.isEmail(email)){
    return email;
  }

}
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
  registrationCode:String,
  date:{
    type:Date,
    default: Date.now
  },
  email: {
      type: String,
      validate:{
      validator: validator.isEmail,
      message: '{value} is not a valid email',
      isAsync: false
    }

  }

});


userSchema.plugin(passportLocalMongoose);


let User = mongoose.model('User', userSchema);


module.exports = User;
