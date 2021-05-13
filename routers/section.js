var express = require('express');
var router = express.Router();
const section = require('../controllers/section/section');

router.post("/createSection", section.createSection);
router.post("/getSectionByInstitute", section.getSectionByInstitute);
router.post("/deleteSection", section.deleteSection);
router.post("/updateSection", section.updateSection);
router.post("/createPosition", section.createPosition);
router.post("/getPositionByInstitute", section.getPositionByInstitute);
router.post("/getPositionBySection", section.getPositionBySection);
router.post("/deletePosition", section.deletePosition);
router.post("/updatePosition", section.updatePosition);
router.post("/createLtype", section.createLtype);
router.post("/getLtypeByInstitute", section.getLtypeByInstitute);
router.post("/createSubLtype", section.createSubLtype);
router.post("/getSubLtypeByLtype", section.getSubLtypeByLtype);


module.exports = router;