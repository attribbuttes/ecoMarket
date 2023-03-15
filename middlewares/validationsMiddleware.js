const express = require("express");
const router = express.Router();
const path = require('path');
const { check, validationResults, body } = require('express-validator'); 

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

  module.exports = validations;