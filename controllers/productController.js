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
    /*'recomended': (req, res) => {
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
    },*/
    //Aqui dispongo las rutas para trabajar con el CRUD
    add: async (req, res) => {
        try {
            const genres = await db.Genre.findAll(); // Get all genres from the database
            return res.render('productAdd', { genres }); // Render the view with the genres data
        } catch (error) {
            console.log(error);
        }
    },
    

    create: async (req, res) => {
        try {
          const newProduct = await Products.create({
            title: req.body.title,
            price: req.body.price,
            release_date: req.body.release_date,
            cat_id: req.body.cat_id,
            image: req.file.filename,
            text: req.body.text
          });
          res.redirect('/products/detail/' + newProduct.id);
        } catch (err) {
          console.log(err);
          res.status(500).send(err);
        }
    },

    edit: (req,res) => { //hay q hacer 2 pedidos asincronicos
        let askProduct = db.Product.findByPk(req.params.id);
        let askGenres = db.Genre.findAll()
        Promise.all([askProduct,askGenres]) //cuando se terminen los 2 pedidos
            .then(function([product,genres]){
                res.render('productEdit', {product, genres})
            })
    },
    update: (req,res) => {
        db.Movie.update({ //modelo Pelicula
            title: req.body.title, //title es el nombre en base de datos y titulo en el formulario
            awards: req.body.awards,
            release_date: req.body.release_date,
            cat_id: req.body.genreID,
            length: req.body.length
           /* rating: req.body.rating*/
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
        db.Product.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect('/products')
    },
    solutions: (req, res) => {
        db.Product.findAll({
          where: {
            cat_id: 1 // Filtrar por cat_id = 1
          }
        })
        .then(products => {
          res.render('solutions', { products }); // Pasar los productos filtrados a la vista
        })
        .catch(error => {
          console.log(error);
          res.render('error');
        }); 
    },
    ecosust: (req, res) => {
        db.Product.findAll({
          where: {
            cat_id: 2 // Filtrar por cat_id = 1
          }
        })
        .then(products => {
          res.render('solutions', { products }); // Pasar los productos filtrados a la vista
        })
        .catch(error => {
          console.log(error);
          res.render('error');
        });
    },

    outdoor: (req, res) => {
        db.Product.findAll({
          where: {
            cat_id: 3 // Filtrar por cat_id = 1
          }
        })
        .then(products => {
          res.render('solutions', { products }); // Pasar los productos filtrados a la vista
        })
        .catch(error => {
          console.log(error);
          res.render('error');
        }); 
    },
    cert: (req,res)=> {
        return res.render('cert')

        const allProducts = products;
        const camping = products.filter((product)=> product.category ==='camping')
        return res.render('cert', {camping, allProducts}); 
    },
    organic: (req, res) => {
        db.Product.findAll({
          where: {
            cat_id: 4 // Filtrar por cat_id = 1
          }
        })
        .then(products => {
          res.render('solutions', { products }); // Pasar los productos filtrados a la vista
        })
        .catch(error => {
          console.log(error);
          res.render('error');
        }); 
    },
    organic: (req, res) => {
        db.Product.findAll({
          where: {
            cat_id: 5 // Filtrar por cat_id = 1
          }
        })
        .then(products => {
          res.render('solutions', { products }); // Pasar los productos filtrados a la vista
        })
        .catch(error => {
          console.log(error);
          res.render('error');
        }); 
    },
}

module.exports = productController;

