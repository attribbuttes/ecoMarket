const { check, validationResult, body } = require('express-validator')
const db = require('../database/models')

const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

const sequelize = db.sequelize;
const { Op } = require("sequelize");

const Genres = db.Genre;
const Products = db.Product;
const Customers = db.Customer;

const userController = {
    index: (req,res)=> {
        db.Product.findAll()
        .then(products => res.render('index', {products}))
        .catch(err => {
            res.send(err)
        })
    },
    create: (req,res)=> {
        return res.render('userCreateForm');
    },

store: async (req, res) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    
    const newCustomer = await Customers.create({
      full_name: req.body.full_name,
      email: req.body.email,
      password: hashedPassword,
      image: req.file.filename,
      username: req.body.username,
      text: req.body.text,
      sex: req.body.sex
    });
    
    res.redirect("login");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
},

   
    profile: (req, res) => {
      Customers.findByPk(req.params.id)
          .then(customer => {
              res.render('profile', { customer });
          });

          console.log({customer})
  },
    
    /*
        profile: (req, res) => {
        
        res.render('userAccount', {
          Customers: req.session.userLogged,
        });
    },*/
    edit: async (req, res) => {
        const idUser = req.params.id;
        
        const userToEdit = await Customers.findByPk(idUser,{
            include: {
                all: true
            }
        });
        const datosParaVista = {
            Customers: userToEdit
          }
          res.render("userAccount", datosParaVista);
  },
  update: async (req, res) => {
    const idUser = req.params.id;
    const editedUser = req.body;
    const userToEdit = await Customers.findByPk(idUser);

    //FILE 
    console.log("file->",req.file);
    //FILE

    userToEdit.nombre = editedUser.nombre;
    userToEdit.apellido = editedUser.apellido;
    userToEdit.email = editedUser.email;

    if(req.file) {
        userToEdit.image = "/images/usuarios/" + req.file.filename;
    }
    
    await userToEdit.save();
    // await User.update(req.body, {
    //   where: {
    //     idUser: idUser
    //   }
    // });
    const usuarioActualizado = await Customers.findByPk(idUser);

    res.render('login', { Customers: usuarioActualizado });
  },

  login: (req, res) => {
    return res.render('login');
  },

  processLogin: async (req, res) => {
    let userToLogin = await Customers.findOne({
        where: {
            email: req.body.email,
        },
    });

    if (userToLogin) {
        let isOkThePassword = await bcrypt.compare(req.body.password, userToLogin.password);

        if (isOkThePassword) {
            delete userToLogin.password;

            if (req.body.remember_user) {
                res.cookie("userEmail", req.body.email, { maxAge: 1000 * 60 * 100 });
            }

            req.session.userLogged = userToLogin;
            return res.render('userAccount', {customer : userToLogin,});
        }
    }

    return res.render("login", {
        errors: {
            email: {
                msg: "los datos son incorrectos",
            },
        },
    });
},

  logout: (req, res) => {
    res.clearCookie("userEmail", { path: "/" }); //si no destruis la cookie quedas logueado por el tiempo de ejecucion de maxage
    req.session.destroy(); // borra todos los datos de session
    return res.redirect("/"); // y te redirije al home
  },

  
    }

module.exports=userController;
