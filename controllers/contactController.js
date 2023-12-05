const asyncHandler = require("express-async-handler")
const Contact = require('../models/contactModel.js'); //This is Mongoose object
//@desc Get all contacts
//@route GET /api/contacts
//@access public

const errorHandler = require("../middleware/errorHandler");
const { default: mongoose } = require("mongoose");


//WE are using mongoDB which sends a promise so we need to make it
//async function

//WE will install Express Async handler for catching errors in async 
//function
const getContacts = asyncHandler(async (req,res)=>{
  const contacts = await Contact.find();
  res.status(200).json(contacts)
})

//@desc Get one contact
//@route GET /api/contacts/:id
//@access public

const getContact = asyncHandler(async(req,res)=>{
  
  const contact = await Contact.findById(req.params.id)
  
  if(!contact){
    res.status(404)
    throw new Error("Not found")
  }
 
    res.status(200).json(contact)

});

//@desc Add new contact
//@route POST /api/contacts
//@access public

const addContact = asyncHandler(async (req,res)=>{
  console.log(req.body)

  const {name ,email,contact} = req.body;

  if(!name || !email || !contact){
      res.status(400)
      errorHandler(req,res)
  }

  const newcontact = await Contact.create({  
    name,
    email,
    contact,
  });

  res.status(201).json(newcontact)
})

//@desc Update contact
//@route PUT /api/contacts/:id
//@access public

const updateContact = asyncHandler(async (req,res)=>{
  const contact = await Contact.findById(req.params.id)
  
  if(!contact){
    res.status(404)
    throw new Error("Not found")
  }
   
  const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new : true}

    );

    res.status(200).json(updatedContact)
})

//@desc delete contact
//@route DELETE /api/contacts/:id
//@access public

const deleteContact = asyncHandler(async (req,res)=>{
  const contact = await Contact.findById(req.params.id)
  
  if(!contact){
    res.status(404)
    throw new Error("Contact Not found")
  }
   
  await Contact.remove();
  res.status(200).json(contact);
})



module.exports = {getContacts , addContact , updateContact ,deleteContact , getContact}