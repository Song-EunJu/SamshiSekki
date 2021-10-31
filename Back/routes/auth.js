var express = require('express');
var router = express.Router();
const AuthController = require('../controllers/AuthController')

router.post('/kakao', AuthController.saveUser)
router.post('/nickname', AuthController.saveNickname)


module.exports = router;