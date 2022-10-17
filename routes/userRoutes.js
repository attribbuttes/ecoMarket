const express = require("express");
const router = express.Router();
const path = require('path');

const multer = require('multer');

const almacenamiento = multer.diskStorage({//configuracion de la instancia
    destination: function (req, file, cb) {
      cb(null, path.resolve('public/images/user')) //resolveme de ruta base
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
  });
  
const upload = multer({ storage: almacenamiento }) //instancia de multer
//multer espera un objeto q tenga storage
const userController =  require('../controllers/userController');

router.get('/', userController.index);

router.get('/search', userController.search);

router.get('/create', userController.create);
router.post('/', upload.single('image'), userController.store)//image etiqueta de foirmulario
//name de image

router.get('/detail/:id', userController.detail)
router.get('/:id/edit', userController.edit)
router.put('/:id', userController.update)
router.delete('/:id', userController.delete)
router.get('/login', userController.login);
router.get('/account/:id', userController.detail);
router.get('/quienes', userController.quienes);
router.get('/donde', userController.donde);
router.get('/contacto', userController.contacto);



module.exports = router;