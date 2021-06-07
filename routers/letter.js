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


module.exports = router;