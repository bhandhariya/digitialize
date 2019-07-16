var User=require('../model/user_model');
var jwt = require('jsonwebtoken');
var privateKey="this is a hard coded"


exports.test=function(req,res,next){
    var data=req.body;
    console.log(data)
}


exports.getDataById=function(req,res,next){
    var data=req.body;
    User.findById(data.id).exec(function(err,pat){
        if(!err && pat){
            console.log(pat)
            res.send(pat)
        }
    })
}



exports.login=function(req,res,next){
    var data=req.body;
    User.findOne({uid:data.uid,email:data.email}).exec(function(err,use){
        if(!err && use){
            var token=jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: use
              }, privateKey);
            
            res.send({token:token,user:use})
        }else{
            res.send(err)
        }
    })
}




exports.register=function(req,res,next){
 var data=req.body;
 console.log(data)
 var user=new User({
    name:data.name,
    email:data.email,
    firebaseProviderId:data.providerId,
    uid:data.uid,
    emailVerified:data.emailVerified
 })
 user.save(function(err,u){
     if(!err && u){
        
         res.send(u)
     }else{
        return res.send(err)
     }
 })
}
