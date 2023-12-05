const express = require("express");
const Router = express()
const {getContacts , 
       addContact , 
      updateContact ,
      deleteContact,
      getContact} = require('../controllers/contactController.js')


Router.route("/").get(getContacts).post(addContact)

Router.route("/:id").put(updateContact).delete(deleteContact).get(getContact)


module.exports = Router