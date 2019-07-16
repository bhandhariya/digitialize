var express = require('express');
var router = express.Router();
var BranchController=require('../controller/branch_controller')

/* GET home page. */
router.get('/getAllBranch', BranchController.getAll);

router.post('/create', BranchController.create  );

router.post('/delete',BranchController.deletebyID)


module.exports = router;
