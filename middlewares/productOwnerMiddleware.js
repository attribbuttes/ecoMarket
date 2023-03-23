const productOwnerMiddleware = (req, res, next) => {
    const productId = req.params.id;
    const product = db.getProductById(productId); // Replace this with your database function to retrieve the product
  
    if (product && req.user.id === product.ownerId) {
      // The current user is the owner of the product
      next();
    } else {
      // The current user is not the owner of the product
      res.status(403).send("You are not authorized to modify or delete this product.");
    }
  };
  
module.exports = productOwnerMiddleware;