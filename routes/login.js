const express = require("express")
const User= require("../Userschema")
const bcrypt= require("bcrypt")
const router=express.Router()
const jwt = require("jsonwebtoken")


router.post("/", async (req,res)=>{
    const{name,password}=req.body;
    try{
        const user= await User.findOne({name});
        if(!user){
            return res.status(400).json({message:"Invalid Credentials"});
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"})
        }
        const token= jwt.sign({UserId: user.id},
            "akshatvyas",
            {expiresIn: "1d"}
        )

        res.cookie("auth_token",token,{
            httpOnly:true,
            maxAge:86400000
        })
        res.status(200).json({UserId:user._id})
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Something went wrong"})
    }
})
module.exports= router;