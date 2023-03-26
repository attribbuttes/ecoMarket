const express = require("express");
const router = express.Router();
const path = require('path');
const userController = require('../controllers/userController')

const upload = require('../middlewares/multer')
const validations = require('../middlewares/validationsMiddleware')

const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const userLoggedMiddleware = require("../middlewares/userLoggedMiddleware");

router.get('/', userController.index);

router.get('/create', guestMiddleware, userController.create);
router.post('/create', upload.single('image'), validations, userController.store);
 
router.get('/:id/edit', userController.edit) 
router.post('/:id/update', userController.update)  

router.get('/login', guestMiddleware, userController.login); 
router.post('/login', userController.processLogin)

router.get('/profile', authMiddleware, userController.profile);

router.get('/logout', userController.logout )

router.get('/who', userController.quienes);
router.get('/donde', userController.donde);
router.get('/contacto', userController.contacto);
router.get('/search', userController.search);


module.exports = router;