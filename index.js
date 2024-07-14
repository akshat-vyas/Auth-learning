const express= require ("express");
const mongoose= require("mongoose");
const app= express();
const User=require("./Userschema");
const cors = require('cors');
const userRouter = require("./routes/users")
const loginRouter = require("./routes/login")

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users",userRouter);
app.use("/login",loginRouter);

app.listen(8811,()=>{
    console.log("App listening on port 8811")
})

