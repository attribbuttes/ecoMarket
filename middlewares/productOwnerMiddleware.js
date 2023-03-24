const db = require('../database/models')
const products = db.Product;

const productOwnerMiddleware = (req, res, next) => {
    const productId = req.params.id;
    const product = new db.Product(productId); // Replace this with your database function to retrieve the product
  
    if (req.customer.role === 'admin') {
      // The current user is an admin, skip the owner check
      next();
    } else if (product && req.customer.id === product.ownerId) {
      // The current user is the owner of the product
      next();
    } else {
      // The current user is not the owner of the product
      res.status(403).send("You are not authorized to modify or delete this product.");
    }
  };
  
  module.exports = productOwnerMiddleware;