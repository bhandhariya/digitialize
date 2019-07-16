var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var UserSchema=new Schema({
    name:{type:Schema.Types.String,required:true},
    email:{type:Schema.Types.String,required:true,unique:true},
    photoURL:{type:Schema.Types.String},
    firebaseProviderId:{type:Schema.Types.String},
    uid:{type:Schema.Types.String},
    emailVerified:{type:Schema.Types.Boolean}

})

module.exports=mongoose.model('User',UserSchema);