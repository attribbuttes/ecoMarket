const express = require("express");
const router = express.Router();
const path = require('path');
const userController = require('../controllers/userController')


const multer = require('multer');

const { check, validationResults, body } = require('express-validator'); 
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');


const validations = [
  body ('fullname').notEmpty().withMessage('plese type your name'), 
  body ('username').notEmpty().withMessage('please type a username'),
  body ('email')
  .notEmpty().withMessage('we need a valid mail').bail() //bail significa q si hay un error anterior corte directo
  .isEmail().withMessage('mail format must be name@server.com'),
  body ('password').notEmpty().withMessage('select a password'), 
  body ('sex').notEmpty().withMessage('select an orientation'), 
  body ('filename').custom((value, {req}) => {
    let file = req.file;
    let acceptedExtensions = ['.jpg', '.jfif', '.png' ];

    if(!file) { //si file esta vacio !negado mando el error
      throw new Error('you need to upload an image');
    } else {
      let fileExtension = path.extname(file.originalname);
      if (!acceptedExtensions.includes(fileExtension)) {
        throw new Error(`image type must be ${acceptedExtensions.join(', ')}`); 
      }
    }
    
    return true;
  })
];

const storage = multer.diskStorage({//configuracion de la instancia storage
    destination: (req, file, cb) => {
      cb(null, path.resolve('public/images/user')) //resolveme de ruta base
    },
    filename:  (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
  });
  
const upload = multer({ storage }) //instancia de multer, storage, si le pones otro nombre tiene q decir storage : lo q pusiste
//multer espera un objeto q tenga storage

router.get('/', userController.index);

router.get('/create', guestMiddleware, userController.create);
router.post('/create', upload.single('image'), validations, userController.store);

router.get('/profile', userController.profile); 
 
router.get('/:id/edit', userController.edit) 
router.put('/:id', userController.update) 

router.get('/login', guestMiddleware, userController.login); 
router.post('/login', userController.processLogin)

//router.delete('/:id', userController.delete) 
//router.get('/who', userController.quienes);
//router.get('/donde', userController.donde);
//router.get('/contacto', userController.contacto);
//router.get('/search', userController.search);


module.exports = router;