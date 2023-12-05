const mongoose = require("mongoose")

const userSchema = mongoose.Schema({

    username:{
      type: String,
      require: [true,"please add username"]
    },
    email:{
      type: String,
      require: [true,"please add email"],
      unique:[true,"Email address already taken"]
    },
    password:{
      type: String,
      require: [true,"please add email"],
    }
},{
  timeStamps: true
})

module.exports = mongoose.model("User",userSchema)