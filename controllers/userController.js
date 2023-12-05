const asyncHandler = require("express-async-handler")
const user = require('../models/userModel.js')
const bcrypt =  require("bcrypt")
const jwt = require("jsonwebtoken")

//@desc Register a user
//@route post /api/users/register
//@access public

const registerUser = asyncHandler(async (req,res)=>{
 
  const {username , email , password} = req.body;
  if(!username|| !email || !password){
    res.status(400)
    throw new Error("All fields are mandatory")
  }

  const alreadyTaken = await user.findOne({email})

  if(alreadyTaken){
    res.status(400) 
    throw new Error("Email already taken")
  }
  
  //Hash password
  const hashPassword = await bcrypt.hash(password,10)  //return a promise

  const newUser = await user.create({
     username,
     email,
     password:hashPassword
  })

  console.log(newUser)
  if(newUser){
     res.status(201).json({_id: newUser.id , email: newUser.email})
  }
  else{
    res.status(400)
    throw new Error("New User data not valid")

  }
})

//@desc Login a user
//@route post /api/users/login
//@access public

const loginUser = asyncHandler(async (req,res)=>{
  const { email , password} = req.body

  if(!email || !password){
    res.status(400) 
    throw new Error("All fields are necessary")
  }

  const validemail = await user.findOne({email})

  //comparing the entered password with the stored password
  if(validemail && (await bcrypt.compare(password,validemail.password))){
  
    const accessToken = jwt.sign({
     
     //this is the payload of our token
      user:{
        username: validemail.username,
        email: validemail.email,
        id: validemail.id
      },
    },
    //this is the secret of our token
      process.env.ACCESS_TOKEN_SECRET,
    //expiry time of our token  
      {expiresIn: "15m"}
    )
   
    res.status(200).json({accessToken})
  }else{
    res.status(401)
    throw new Error("Email or Password not valid")
  }
  
})

//@desc  Current user info
//@route get /api/users/current
//@access private

const currentUser = asyncHandler(async (req,res)=>{
  res.json({message: " current user"})
})


module.exports = {registerUser,loginUser,currentUser}