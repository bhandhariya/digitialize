var express = require('express');
var router = express.Router();
var PatientController=require('../controller/patient_controller');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/alldata',PatientController.getAlldatafortable);

router.post('/create',PatientController.createNewPatient);

router.get('/getall',PatientController.getall);

router.post('/getpatByID',PatientController.getpatByID);

router.post('/getpatByName',PatientController.getpatByName);

router.post('/addPersonal',PatientController.addPersonal);

router.post('/addFamilyData',PatientController.addFamilyData)

router.post('/addGuardian',PatientController.addGuardian);

router.post('/addchild',PatientController.addChildren);

router.post('/addcomplain',PatientController.addcomplain);

router.post('/addIllness',PatientController.addIllness);

router.post('/addHistory',PatientController.addHistory);

router.post('/addPresentHistory',PatientController.addPresentHistory);

router.post('/addPastHistory',PatientController.addPastHistory);

router.post('/addHistoryOfModeOfIntake',PatientController.AddHistoryOfModeOfIntake);

router.post('/addTreatementHistory',PatientController.addTreatementHistory);

router.post('/addFamilyHistory',PatientController.addFamilyHistory);

router.post('/addPersonalHistory',PatientController.addPersonalHistory);

router.post('/addSubstanceHistory',PatientController.addSubstanceHistory);

router.post('/addLegalHistory',PatientController.addLegalHistory);

router.get('/deleteAllDB',PatientController.deleteAllDB);

router.get('/getPatientCount',PatientController.getPatientCount);

router.post('/addGeneralAptitudeBehaviour',PatientController.addGeneralAptitudeBehaviour);

router.post('/addPsychomotorActivitySpeech',PatientController.addPsychomotorActivitySpeech);

router.post('/addAffect',PatientController.addAffect);

router.post('/addThoughtContent',PatientController.addThoughtContent);

router.post('/addPossession',PatientController.addPossession);

router.post('/addCongnitiveFunction',PatientController.addCongnitiveFunction);

router.post('/addIntelligence',PatientController.addIntelligence);

router.post('/addJudgement',PatientController.addJudgement);

router.post('/addInsight',PatientController.addInsight);

router.post('/addGPE',PatientController.addGPE);

router.post('/test',PatientController.TestAPI);

router.post('addPatPerception',PatientController.addPatPerception);

router.post('/editPresentHistory',PatientController.EditPresentHistory);

router.post('/editPastHistory',PatientController.editPastHistory);

router.post('/editFamilyHistoryHistory',PatientController.editFamilyHistoryHistory);

router.post('/editPersonalHistory',PatientController.editPersonalHistory);

router.post('/editsubstanceHistory',PatientController.editsubstanceHistory);

router.post('/editLegalHistory',PatientController.editLegalHistory);

module.exports = router;
