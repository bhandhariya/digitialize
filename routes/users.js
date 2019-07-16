var express = require('express');
var router = express.Router();
var User=require('../controller/user_controller');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/test', function(req, res, next) {
 var data=req.body;
 console.log(data)

});

router.post('/register',User.register);

router.post('/login',User.login);

router.post('/getDataById',User.getDataById);



module.exports = router;
