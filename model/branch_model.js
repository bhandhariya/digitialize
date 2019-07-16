var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BranchSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique:true
  }
});

module.exports = mongoose.model('Branch', BranchSchema);