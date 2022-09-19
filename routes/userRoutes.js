const express = require("express");
const router = express.Router();

const userController =  require('../controllers/userController');

router.get('/', userController.index);

router.get('/registro', userController.userCreateForm);

router.get('/login', userController.login);

router.get('/account', userController.userAccount);

router.get('/quienes', userController.quienes);

router.get('/donde', userController.donde);

router.get('/contacto', userController.contacto);



module.exports = router;