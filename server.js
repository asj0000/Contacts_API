

const express = require("express");
const errorHandler = require("./middleware/errorHandler.js");
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConnection.js")

connectDb()

const port = 3000 || process.env.port

const app = express();

app.use(express.json())  //Added a middleware to read the request body
app.use("/api/contacts" , require('./routes/contactRoute.js'))
app.use("/api/users" , require('./routes/userRoute.js'))

app.use(errorHandler)    //Created a middleware to handle error

app.listen(port , ()=>{
  console.log(  `Server is running on ${port} port`)
})

