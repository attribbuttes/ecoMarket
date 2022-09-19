const express = require("express");
const router = express.Router();

const productController =  require('../controllers/productController');

router.get('/principal', productController.principal);
router.get('/listado', productController.listado);
router.get('/detalle', productController.detalle);
router.get('/armasCortas', productController.armasCortas);
router.get('/armasLargas', productController.armasLargas);
router.get('/camping', productController.camping);
router.get('/tramites', productController.tramites);
router.get('/municiones', productController.municiones);
router.get('/createProduct', productController.createProduct);
router.get('/productEdit', productController.productEdit);
router.get('/productDetail', productController.productDetail);
router.get('/productList', productController.productList);
router.get('/shoppingCart', productController.shoppingCart);





module.exports = router;