var mongoose = require('mongoose');

//  var mongoURI = "mongodb://localhost:27017/digital-App-1";

// var mongoURI = "mongodb://raja:mentcom123@ds147096.mlab.com:47096/digitalapp";

// var mongoURI = "mongodb://localhost:27017/digital-App-2";

var mongoURI = "mongodb://rajasaini:digital123@ds341847.mlab.com:41847/newdigitalapp";


mongoose.Promise = global.Promise;
mongoose.connect(mongoURI,{useNewUrlParser:true})
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("mongodb connection open");
});
exports.db = db;
