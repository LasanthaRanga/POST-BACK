var express = require('express');
var router = express.Router();
const letter = require('../controllers/letter/letter');

const checkAuth = require('../middleware/check-auth');

router.post("/create", letter.create);
router.post("/update", letter.update);
router.post("/getByInstitute", letter.getByInstitute);
router.post("/getByUser", letter.getByUser);
router.post("/sendLatter", letter.sendLatter);
router.post("/getInbox", letter.getInbox);
router.post("/search", letter.search);
router.post("/getLatter", letter.getLatter);
router.post("/getAttachment", letter.getAttachment);
router.post("/statusChange", letter.statusChange);
router.post("/saveEdit", letter.saveEdit);
router.post("/updateEdit", letter.updateEdit);
router.post("/getEdit", letter.getEdit);
router.post("/complete", letter.complete);


module.exports = router;