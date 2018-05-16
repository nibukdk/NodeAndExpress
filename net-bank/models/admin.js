let mongoose = require("mongoose"),
  passportLocalMongoose = require("passport-local-mongoose");


let adminSchema = mongoose.Schema({
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

adminSchema.plugin(passportLocalMongoose);



module.export = mongoose.model("Admin", adminSchema);
