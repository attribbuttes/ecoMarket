const { check, validationResult, body } = require('express-validator')
const db = require('../database/models')

const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');

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
      const resultValidation = validationResult(req);
    
      if (resultValidation.errors.length > 0) {
        return res.render('userCreateForm', {
          errors: resultValidation.mapped(),
          oldData: req.body,
        });
      }
    
      // Check if the email is already registered
      let userInDB = await Customer.findOne({
        where: {
          email: req.body.email,
        },
      });
    
      if (userInDB) {
        return res.render('userCreateForm', {
          errors: {
            email: {
              msg: "This email is already registered",
            },
          },
          oldData: req.body,
        });
      }
    
      // Create the user
      const userToCreate = {
        full_name: req.body.name,
        email: req.body.email,
        pass: bcryptjs.hashSync(req.body.password, 10),
        image: req.file.filename,
        username: req.body.username,
        about: req.body.about,
        sex: req.body.sex
      };
    console.log(userToCreate);

      try {
        await Customer.create(userToCreate);
        console.log('Creating user:', userToCreate);

        return res.render('/login');
      } catch (error) {
        console.error(error);
        return res.render('userCreateForm', {
          errors: {
            email: {
              msg: "An error occurred while trying to register the user",
            },
          },
          oldData: req.body,
        });
      }
    },
    
    
    profile: (req, res) => {
        
        res.render('userAccount', {
          Customers: req.session.userLogged,
        });
    },
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
        let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);

        if (isOkThePassword) {
            delete userToLogin.password;

            if (req.body.remember_user) {
                res.cookie("userEmail", req.body.email, { maxAge: 1000 * 60 * 100 });
            }

            req.session.userLogged = userToLogin;
            return res.redirect("userAccount");
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
