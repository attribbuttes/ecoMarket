const express = require("express");
const router = express.Router();
const path = require('path');
const multer = require('multer');

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

module.exports = upload;