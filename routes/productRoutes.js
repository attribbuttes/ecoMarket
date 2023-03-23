const express = require("express");
const router = express.Router();
const path = require('path');
const productController = require('../controllers/productController')


const validations = require('../middlewares/validationsMiddleware')

const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const userLoggedMiddleware = require("../middlewares/userLoggedMiddleware");

//multer
const multer = require('multer');
const storage = multer.diskStorage({//configuracion de la instancia
    destination: function (req, file, cb) {
      cb(null, path.resolve('public/images/products')) //resolveme de ruta base
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
  });
  
const upload = multer({ storage })
//end of multer


router.get('/', productController.list)
router.get('/new', productController.new);
//router.get('/recomended', productController.recomended);
router.get('/detail/:id', productController.detail);

router.get('/create', upload.single('image'), productController.add)
router.post('/create', upload.single('image'), productController.create)
router.get('/:id/edit', authMiddleware, productController.edit);
router.post('/:id/update', upload.single('image'), authMiddleware, productController.update);
router.post('/:id/delete', authMiddleware, productController.delete);


router.get('/solutions', productController.solutions);
router.get('/ecosust', productController.ecosust);
router.get('/outdoor', productController.outdoor);
router.get('/organic', productController.organic);
router.get('/cert', productController.cert);

//router.get('/shoppingCart', productController.shoppingCart);






module.exports = router;