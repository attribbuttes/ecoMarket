const db = require('../database/models')

const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
const upload = require('../middlewares/multer')


const sequelize = db.sequelize;
const { Op } = require("sequelize");


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
      res.cookie('testing', 'hola mundo', {maxAge: 100*30})
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
    //console.log(err);
    res.status(500).send(err);
  }
},
   
edit: async (req, res) => {
  const idUser = req.params.id;
      
  const userToEdit = await Customers.findByPk(idUser,{
      include: {
          all: true
      }
  });

  const customer = userToEdit

  res.render("userEdit", { customer });
},
update: async (req, res) => {
  const idUser = req.params.id;
  const editedUser = req.body;
  const userToEdit = await Customers.findByPk(idUser);

  //FILE 
  console.log("file->",req.file);
  //FILE

  userToEdit.username = editedUser.username;
  userToEdit.text = editedUser.text;

  if (req.file) {
    userToEdit.image = "/images/user/" + req.file.filename;
  }

  await userToEdit.save();

  const usuarioActualizado = await Customers.findByPk(idUser);
  const customer = usuarioActualizado;
  
  console.log(customer);
  res.render("userAccount", { customer });
},






/*update: async (req, res) => {
  const idUser = req.params.id;
  const editedUser = req.body;
  const userToEdit = await Customers.findByPk(idUser);

  //FILE 
  console.log("file->",req.file);
  //FILE

  //userToEdit.full_name = editedUser.full_name;
  userToEdit.username = editedUser.username;
  userToEdit.text = editedUser.text;

  if(req.file) {
      userToEdit.image = "/images/user/" + req.file.filename;
  }
  
  await userToEdit.save();
  await Customers.update(req.body, {
     where: {
       idUser: idUser
     }
   });
  const usuarioActualizado = await Customers.findByPk(idUser);
  const customer = usuarioActualizado
  console.log(customer)
  res.render("userAccount", { customer });
},*/
/*update: async (req, res) => {
  try {
    const customer = await Customers.update({
      full_name: req.body.full_name,
      username: req.body.username,
      role: req.body.role,
      sex: req.body.sex,
      email: req.body.email,
      text: req.body.text
    }, {
      where: {
        id: req.params.id
      }
    });
    
    console.log(customer)
    res.redirect('/profile/' );
  } catch (error) {
    console.log(error);
    res.render('userEdit', { error });
  }
},

  */
  login: (req, res) => {
    //console.log(req.cookies.testing)
      return res.render('login');
  },
  processLogin: async (req, res) => {
    let userToLogin = await Customers.findOne({
        where: {
            email: req.body.email,
        },
    });

    if (userToLogin) {
      //return res.send(userToLogin) cuando escribis esto ves el objeto en la web
      
        let isOkThePassword = await bcrypt.compare(req.body.password, userToLogin.password); //el 2ndo parametro es el password hasheado, bcrypt recibe ambos parametros uy los compara

        if (isOkThePassword) {
            delete userToLogin.password;
            req.session.userLogged = userToLogin

            if (req.body.remember_me) {
                res.cookie("userEmail", req.body.email, { maxAge: 1000 * 60 * 1000 });
            }//nombre de la cookie useremail la estoy llamando ahi mismo

            
            return res.redirect(/*{customer : userToLogin,}, */'/profile' );
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

profile: (req, res) => {
  //console.log(req.cookies.userEmail)
  
//  req.session.userLogged = true;
         return res.render('userAccount', {customer : req.session.userLogged});
     
      
},


  logout: (req, res) => {
    res.clearCookie('userEmail')
    req.session.destroy(); // borra todos los datos de session
    return res.redirect("/"); // y te redirije al home
  },
  quienes: (req, res) => {
    return res.send('quienes')
  },
  donde: (req, res) => {
    return res.send('donde')
  }, 
  contacto: (req, res) => {
    return res.send('contacto')
  },
  search: (req, res) => {
    return res.send('quienes')
  },       
  
    }

    

module.exports=userController;
