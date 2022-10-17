const { validationResult } = require('express-validator')

const fs = require('fs');
const path = require('path');

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

    store: (req,res)=> {
        const userToCreate = req.body; 
        userToCreate.image = req.file.filename;
        userToCreate.id = users.length +1;

        users.push(userToCreate);
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2))
        return res.render('userAccount');
    },
    
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
        return res.render('userRegisterLogin');
    },
    donde: (req,res)=> {
        return res.render('quienes')
    },

    search: (req,res)=> {
        return res.send('search')
    },
    quienes: (req,res)=> {
        return res.render('quienes')
    },
    contacto: (req,res)=> {
        return res.render('quienes')
    },
    contacto: (req,res)=> {
        return res.send('busqueda')
    },

    userCreateForm: (req,res)=> {
        return res.render('userCreateForm')
    },
        
    }

module.exports=userController;
