var express = require('express');
var router = express.Router();
const letter = require('../controllers/letter/letter');

const checkAuth = require('../middleware/check-auth');

router.post("/create", letter.create);
router.post("/update", letter.update);
router.post("/getByInstitute", letter.getByInstitute);
router.post("/getByUser", letter.getByUser);



module.exports = router;