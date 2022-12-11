const express = require('express');
const { connection } = require('./config/db');
const { UserModel } = require('./models/user.model');
const bcrypt = require('bcrypt');
const  jwt = require('jsonwebtoken');
const { noteRouter } = require('./routes/note.route');

const app = express();

app.use(express.json());
app.get("/",(req,res)=>{
    res.send("welcome")
})
app.post("/signup",async (req,res)=>{
    const {email,name,password,age} = req.body;
    const user = await UserModel.find({email})
    if(user.length>0){
        console.log(user);
        res.send({"msg":"email ID already exist"});
    }else{
        try {
        bcrypt.hash(password , 4 , async (err,hash)=>{
             const user = new UserModel({email,password:hash,name,age});
             await user.save();
             res.send({"msg":"Signup Successfully"});
        })
        } catch (error) {
             console.log(error);
             res.send({"err":"Something went wrong"});            
        }
    }
})
app.post("/login", async (req,res)=>{
     const {email,password} = req.body;
     const user = await UserModel.find({email});
     if(user.length>0){
        const hashed_pass = user[0].password;
        bcrypt.compare(password,hashed_pass,(err,result)=>{
            if(result){
                const token = jwt.sign({"userID":user[0]._id},"lakh")
                res.send({"msg":"Login Successfull","token":token})
            }else{
                res.send({"err":"Signup First"});
            }
        })
     }else{
        res.send({"err":"Signup first"});
     }
})
app.use("/note",noteRouter);
app.listen(8080, async ()=>{
    try {
        await connection;
        console.log("Connected to DB");
    } catch (error) {
        console.log(error);
        resizeBy.send({"err":"Something went wrong"});
    }
    console.log("listening to port 8080")
})
