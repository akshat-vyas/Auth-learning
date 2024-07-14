const mongoose=require ("mongoose")
const bcrypt= require("bcrypt")
const express= require("express")

mongoose.connect('mongodb://127.0.0.1:27017/UserDb')
.then(()=>{console.log("Connected to DB")})
.catch((e)=>{console.log("Some error occured")});
// mongoose.connect("mongodb://127.0.0.1:27017/UserDb", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   });

// User model
const UserSchema=new mongoose.Schema({
    name: { type: String },
    age: { type: Number },
    password: {type:String,
        required:true
    }
}
);


UserSchema.pre("save",async function(next){
    if(this.isModified('password')){
        this.password= await(bcrypt.hash(this.password,8))
    }

    next();
})

const User = mongoose.model('User',UserSchema);

module.exports=User;
