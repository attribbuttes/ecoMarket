const db = require('../database/models')
const Product = db.Product;

async function productOwnerMiddleware(req, res, next) {
  const productId = req.params.id;
  const userId = res.locals.userLogged.id;

  // Check if user is admin
  if (res.locals.isAdmin) {
    return next();
  }

  // Check if user is owner of product
  const product = await Product.findByPk(productId);
  if (!product || product.userId !== userId) {
    return res.status(403).send('Forbidden');
  }

  next();
}

module.exports = productOwnerMiddleware;