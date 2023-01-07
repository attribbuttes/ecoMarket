const { check, validationResult, body } = require('express-validator')

const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');



const productsFilePath = path.join(__dirname,'../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'))

const usersFilePath = path.join(__dirname,'../data/userDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'))




const userController = {
    index: (req,res)=> {
        const inSaleProducts = products.filter((product)=> product.category === 'in-sale')
        const visitedProducts = products.filter((product)=> product.category === 'visited')
        return res.render('index', {inSaleProducts, visitedProducts}); 
    },
    create: (req,res)=> {
        return res.render('userCreateForm');
    },

   /* storeB: (req,res)=> {
        const validations = validationResult(req);
        if(validations.errors.length > 0){ //validations en su propiedad errors, es un objeto
            return res.render('userCreateForm', {
                errors: validations.mapped(),//convierte el array a un objeto literal con claves valores donde cada input es un objeto
                old: req.body //copia del body para persistir datos
            });
        }
        return res.send('ok las validaciones se pasaron y no hay errores')
    },*/

    store: (req,res)=> {
        const validations = validationResult(req);
        if(validations.errors.length > 0){ //validations en su propiedad errors, es un objeto
            return res.render('userCreateForm', {
                errors: validations.mapped(),//convierte el array a un objeto literal con claves valores donde cada input es un objeto
                old: req.body //copia del body para persistir datos
            });
        }
        const usersInDB = users;
        const userToCreate = req.body; 
        userToCreate.image = req.file.filename; 
        userToCreate.id = usersInDB.length +1;
        usersInDB.push(userToCreate);
        fs.writeFileSync(usersFilePath, JSON.stringify(usersInDB, null, 2))
        //return res.send(userToCreate);

        //codigo del javii
        if (validations.errors.length > 0) {
			return res.render('userRegisterForm', {
				errors: validations.mapped(),
				oldData: req.body
			});
		}

		/*let userInDB = User.findByField('email', req.body.email);

		if (userInDB) {
			return res.render('userRegisterForm', {
				errors: {
					email: {
						msg: 'Este email ya está registrado'
					}
				},
				oldData: req.body
			});
		}

		let userTobeCreated = {
			...req.body,
			password: bcryptjs.hashSync(req.body.password, 10),
			avatar: req.file.filename
		}

		let userCreated = User.create(userTobeCreated);
*/
		return res.redirect('/login');
    },
    
    session: (req,res) => {
        if (req.session.numeroVisitas== undefined) {
            req.session.numeroVisitas = 0;
        }
        req.session.numeroVisitas ++;
        res.send('session tiene el numero: ' + req.session.numeroVisitas)
    },
    /*storeA: (req,res)=> {
        const usersInDB = users;
        const userToCreate = req.body; 
        userToCreate.image = req.file.filename; 
        userToCreate.id = usersInDB.length +1;
        usersInDB.push(userToCreate);
        fs.writeFileSync(usersFilePath, JSON.stringify(usersInDB, null, 2))
        return res.send('userInDb');
    },*/



    detail: (req, res) => {
		const idToFind = req.params.id
        const user = users.find (p => p.id == idToFind)
		return res.render ('userAccount', {user})
	
	},
    edit: (req,res)=> {
        return res.send('detalles')
    },
    update: (req,res)=> {
        return res.send('detalles')
    },
    delete: (req,res)=> {
        return res.send('detalles')
    },

    login: (req,res)=> {
        return res.render('login');
    },

    processLogin: (req, res) => {

        
        const userToLogin = users.filter((user)=> user.email === req.body.email);
        
        if(userToLogin) {

        let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
			if (isOkThePassword) {
				delete userToLogin.password;
				req.session.userLogged = userToLogin;

				if(req.body.remember_user) {
					res.cookie('email', req.body.email, { maxAge: (1000 * 60) * 60 })
				}

				return res.redirect('userAccount');
			} 
			return res.render('login', {
				errors: {
					email: {
						msg: 'Las credenciales son inválidas'
					}
				}
			});
		}

		return res.render('login', {
			errors: {
				email: {
					msg: 'No se encuentra este email en nuestra base de datos'
				}
			}
		});
	},
    
    /*
    armasCortas: (req,res)=> {

        const allProducts = products;
        const armasCortas = products.filter((product)=> product.category ==='armasCortas')
        return res.render('armasCortas', {armasCortas, allProducts}); 
    },*/

    donde: (req,res)=> {
        return res.render('who')
    },

    search: (req,res)=> {
        return res.send('search')
    },
    quienes: (req,res)=> {
        return res.render('who')
    },
    contacto: (req,res)=> {
        return res.render('who')
    },
    contacto: (req,res)=> {
        return res.send('busqueda')
    },

    userCreateForm: (req,res)=> {
        return res.render('userCreateForm')
    },
        
    }

module.exports=userController;
