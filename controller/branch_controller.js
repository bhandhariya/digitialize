var Branch=require('../model/branch_model');

exports.create=function(req,res,next){
    var data=req.body;
    console.log(data);
    var branch=new Branch({
        name:data.name
    })
    branch.save(function(err,br){
        if(!err && br){
            res.send(br)
        }else{
            res.send(err)
        }
    })


}


exports.getAll= function(req, res, next) {
    Branch.find(function(err,bra){
        if(bra){
            res.send(bra);
        }
    })
}

exports.deletebyID=function(req,res,next){
    Branch.findByIdAndRemove(req.body.id,function(err,branch){
        if(branch){
            res.send('Deleted Successfully')
        }
    })
}