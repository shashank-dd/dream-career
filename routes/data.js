const express=require("express")
const route=express.Router();
const cors = require("cors");
var jwt = require('jsonwebtoken');
const Login =require("../models/login.js")
const bcrypt = require('bcrypt');
route.use(cors({
    origin: "*",
}))
const data=require("../models/data.js")
route.use(express.json())
const bodyParser = require("body-parser");
route.use(bodyParser.urlencoded())
route.use(bodyParser.json())

route.post("/post",async(req,res)=>{
    try {
console.log(req.body)
        console.log("rout comming")
      
        const dat=await data.create({
            name :         req.body.name,
            label:   req.body.label,
           url: req.body.url
           
          }) 
        res.json({
            ok:"ok",
            data:dat

        })
    } catch (e) {
        res.json({
            err:e.message
        })
    }
   
})

route.post("/data",(req,res)=>{
    try {
        console.log("coming  to data")
console.log(req.body.token)

if(req.body.token){
    // verify a token symmetric
    jwt.verify(req.body.token,process.env.SECRET, async function(err, decoded) {
        if(err) {
            return res.status(403).json({
                status: "failed",
                message: "Not a valid token"
            })
        }
        console.log(decoded.data,decoded,1)
   const     nam =  decoded.data.split("@")[0];
   console.log(nam)
        const dat=await data.find({
            name : nam,
           
          }) 
          console.log("data")
        
        res.json({
            ok:"data",  
            dat:dat.reverse() ,
            user:nam  ,
            userid:  decoded.data           
            

        })
    
    });
}else {
    return res.status(401).json({
        status: "Failed",
        message: "Toeken is missing"
    })
}
    } catch (e) {
        res.json({
            err:e.message
        })
    }
   
})

route.post("/delete", async (req, res) => {
    console.log(req.body)
    const {  passward ,userid,label} = req.body;
    const userData = await Login.findOne({email:userid});
    
console.log( userData)
        let result = await bcrypt.compare(passward, userData.password);
        if (result) {
            const dat=await data.deleteOne({
                label : label
               
              }) 
              console.log(dat)
            res.status(200).json({
                Status: "ok"
            });
        } else {
            res.status(400).json({
                status: "failed",
                message: "Wrong Password",
            });
        }
    

});









 module.exports= route;