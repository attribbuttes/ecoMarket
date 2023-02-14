const express = require("express");
const router = express.Router();
const path = require('path');
const productController = require('../controllers/productController')

//multer
const multer = require('multer');
const storage = multer.diskStorage({//configuracion de la instancia
    destination: function (req, file, cb) {
      cb(null, path.resolve('public/images/')) //resolveme de ruta base
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
router.get('/recomended', productController.recomended);
router.get('/detail/:id', productController.detail);

router.get('/create', upload.single('image'), productController.add)
router.post('/create', upload.single('image'), productController.create)
router.get('/edit/:id', productController.edit);
router.post('/update/:id', productController.update);
router.get('/delete/:id', productController.delete);
router.post('/delete/:id', productController.destroy);

router.get('/solutions', productController.solutions);
router.get('/ecosust', productController.ecosust);
router.get('/outdoor', productController.outdoor);
router.get('/organic', productController.organic);
router.get('/cert', productController.cert);

//router.get('/shoppingCart', productController.shoppingCart);






module.exports = router;