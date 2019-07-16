var express=require('express');
var router=express.Router();
var multer=require('multer');

var store= multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+'.'+file.originalname)
    }
})

var upload=multer({storage:store}).single('file');

router.post('/upload',function(req,res,next){
    upload(req,res,function(err){
        if(err){
            return res.status(501).json({error:err}); 
        }else{
            return res.json({originalname:req.file.originalname, uploadname:req.file.filename});
        }
    })
})

module.exports=router;