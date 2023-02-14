const path = require('path');
const db = require('../database/models')
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const Genres = db.Genre;
const Products = db.Product;
const Customers = db.Customer;

const productController = {
    'list': (req, res) => {
        db.Product.findAll()
            .then(products => {
                res.render('products', { products })
            })
    },
    'detail': (req, res) => {
        db.Product.findByPk(req.params.id)
            .then(product => {
                res.render('productDetail', { product });
            });
    },
    'new': (req, res) => {
        db.Product.findAll({
            order: [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(products => {
                res.render('newestProducts', { products });
            });
    },
    'recomended': (req, res) => {
        db.Product.findAll({
            where: {
                rating: { [db.Sequelize.Op.gte]: 8 }
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedProducts', { movies });
            });
    },
    //Aqui dispongo las rutas para trabajar con el CRUD
    add: (req, res) => {
        db.Genre.findAll() //archivo genero.js en models/ al alias le puse Genero 
            .then(function (genres) { //me trae los generos
                return res.render('productAdd', { genres }) //comparte variable generos creada arriba en esa variable para compartirlos en la vista
            })
    },

    create: (req, res) => {//todo esto viene del formulario productCreateForm.ejs
        db.Product.create({ //modelo Pelicula
            title: req.body.title, //title es el nombre en base de datos y titulo en el formulario
            awards: req.body.price,
            release_date: req.body.release_date,
            cat_id: req.body.cat_id,
            rating: req.body.text
        });
        res.redirect('/products/detail/' + req.params.id)


    },
    edit: (req,res) => { //hay q hacer 2 pedidos asincronicos
        let askProduct = db.Product.findByPk(req.params.id);
        let askGenres = db.Genre.findAll()
        Promise.all([askProduct,askGenres]) //cuando se terminen los 2 pedidos
            .then(function([product,genres]){
                res.render('moviesEdit', {product, genres})
            })
    },
    update: (req,res) => {
        db.Movie.update({ //modelo Pelicula
            title: req.body.title, //title es el nombre en base de datos y titulo en el formulario
            awards: req.body.awards,
            release_date: req.body.release_date,
            cat_id: req.body.genreID,
            length: req.body.length,
            rating: req.body.rating
        }, {
            where: {
                id:req.params.id
            }
        });
        res.redirect('/movies/detail/' + req.params.id)
        

    },

    delete: (req, res) => {
        db.Product.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect('/products')
    },
    destroy: (req, res) => {
        db.Products.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect('/products')
    },
    solutions: (req,res)=> {
        return res.send('solutions')
        const allProducts = products;
        const armasCortas = products.filter((product)=> product.category ==='armasCortas')
        return res.render('solutions', {armasCortas, allProducts}); 
    },
    ecosust: (req,res)=> {
        return res.send('ecosust')

        const allProducts = products;
        const armasLargas = products.filter((product)=> product.category ==='armasLargas')
        return res.render('ecosust', {armasLargas, allProducts}); 
    },
    outdoor: (req,res)=> {
        return res.send('outdoor')

        const allProducts = products;
        const camping = products.filter((product)=> product.category ==='camping')
        return res.render('outdoor', {camping, allProducts}); 
    },
    cert: (req,res)=> {
        return res.send('certifications')

        const allProducts = products;
        const camping = products.filter((product)=> product.category ==='camping')
        return res.render('cert', {camping, allProducts}); 
    },
    organic: (req,res)=> {
        return res.send('organic')

        const allProducts = products;
        const camping = products.filter((product)=> product.category ==='camping')
        return res.render('organic', {camping, allProducts}); 
    },
}
/*
index: (req,res)=> {
    const allProducts = products;
    const inSaleProducts = products.filter((product)=> product.category === 'in-sale')
    const visitedProducts = products.filter((product)=> product.category === 'visited')
    return res.render('products', {allProducts, inSaleProducts, visitedProducts}); 
},
create: (req,res)=> {
    return res.render('productCreateForm');
},

store: (req,res)=> {
    const allProducts = products;
    const productToCreate = req.body; 
    productToCreate.price = Number(productToCreate.price); 
    productToCreate.image = req.file.filename; 
    if(productToCreate.discount == ''){
        productToCreate.discount = 0;
    } else {
        productToCreate.discount = Number(productToCreate.discount);
    };
    productToCreate.id = products.length +1;
    products.push(productToCreate);
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))
    return res.render('products', {allProducts});
},
 
detail: (req, res) => {
    const idToFind = req.params.id
    const product = products.find (p => p.id == idToFind)
    const discounted = Math.round(product.price - (product.price * product.discount) / 100)
    return res.render ('detail', {product, discounted})
},

solutions: (req,res)=> {

    const allProducts = products;
    const armasCortas = products.filter((product)=> product.category ==='armasCortas')
    return res.render('solutions', {armasCortas, allProducts}); 
},
ecosust: (req,res)=> {

    const allProducts = products;
    const armasLargas = products.filter((product)=> product.category ==='armasLargas')
    return res.render('ecosust', {armasLargas, allProducts}); 
},
outdoor: (req,res)=> {

    const allProducts = products;
    const camping = products.filter((product)=> product.category ==='camping')
    return res.render('outdoor', {camping, allProducts}); 
},
cert: (req,res)=> {

    const allProducts = products;
    const camping = products.filter((product)=> product.category ==='camping')
    return res.render('cert', {camping, allProducts}); 
},
organic: (req,res)=> {

    const allProducts = products;
    const camping = products.filter((product)=> product.category ==='camping')
    return res.render('organic', {camping, allProducts}); 
},
edit: (req,res)=> {
    const productId = req.params.id;
    const productToEdit = products.find((product) => product.id == productId)
    if (!productToEdit){
        return res.send('el producto no existe')
    }
    res.render('product-edit-form', { productToEdit})
    
},
update: (req, res) => {
    // Do the magic

    const productId = req.params.id;
    const allProducts = products;
    const indiceDelProducto = products.findIndex((product) => product.id == productId);
    indiceDelProducto.price = Number(indiceDelProducto.price);
    
    products[indiceDelProducto] = {...products[indiceDelProducto], ...req.body}
    //ssintaxis de fusion de 2 en 1
    productController.guardarProductos();
    return res.render('products', {allProducts});
},
delete: (req,res)=> {
    return res.send('eliminar producto')
},

 
shoppingCart: (req,res)=> {
    return res.send('ShioppingCart');
},
donde: (req,res)=> {
    return res.render('quienes')
},            
guardarProductos(req, res){
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))
},//cuando uno guarda como stringfy si lo guardastre mal perdiste todo
asignarIdAProductoEnBaseAlUltimo(productToCreate) {
    return products[products.length -1].id +1 ;
    //stringify convierte a json, null y 2 es para formatearlo 
}//sume 1 numero al largo del array y doy id
}
*/
module.exports = productController;

