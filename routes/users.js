const express = require("express");
const router=express.Router();
const User= require("../Userschema")
const jwt= require("jsonwebtoken")

router.get("/getit",async(req,res)=>{
    try{const user_list = await User.find();
        // console.log(req)
        res.status(200).send(user_list)
    }catch(error){
        res.status(400).send("Some error occured")
    }
    // console.log("Req received")
    // res.send({"message":"Hi "})
})
router.post("/saveit",async (req,res)=>{
    try{
        const {name,age,password}=req.body;
        // const {name}=req.body;
        let new_age = parseInt(age, 10);
        console.log(name, age,password)
        
        // console.log(typeof(name), typeof(age))

        const new_user=new User(req.body)
        await new_user.save()
        
        const token=jwt.sign({UserId:new_user.id},"akshatvyas",{
            expiresIn:"1d"
        });
        console.log("akvtg")
        
        console.log(token);
        res.cookie("auth_token",token,{
            httpOnly:true,
            maxAge:86400000,
        })
        

        // res.status(201).send(new_user)
        res.sendStatus(201)
    }
    catch(error){
        res.status(400).send(error)
    }
})
module.exports= router;