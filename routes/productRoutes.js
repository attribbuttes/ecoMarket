const express = require("express");
const router = express.Router();

const productController =  require('../controllers/productController');

router.get('/principal', productController.principal);

router.get('/listado', productController.listado);

router.get('/detalle', productController.detalle);

router.get('/armasCortas', productController.armasCortas);

router.get('/armasLargas', productController.armasLargas);

router.get('/camping', productController.camping);

module.exports = router;