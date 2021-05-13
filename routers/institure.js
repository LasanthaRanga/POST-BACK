var express = require('express');
var router = express.Router();
const institute = require('../controllers/institureControllers/instituteController');
const checkAuth = require('../middleware/check-auth');

router.post("/getAllInstitute", institute.getAllInstitute);
router.post("/create", institute.create);
router.post("/getById", institute.getById);


module.exports = router;