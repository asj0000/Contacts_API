const mongoose = require("mongoose")

const contactSchema = mongoose.Schema({

    name:{
      type: String,
      required: [true , "Please add contacts"] //second argument is in case of an error
    },
    
    email:{
      type: String,
      required: [true , "Please add email"] //second argument is in case of an error
    },
  
    contact:{
      type: String,
      required: [true , "Please add contact number"] //second argument is in case of an error
    }
},{
     timestamps: true,
});

                 //This function returns the Mongoose object.
module.exports = mongoose.model("Contacts",contactSchema);
