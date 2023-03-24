const db = require('../database/models');

const checkAdminRole = async (req, res, next) => {
  const customerId = req.query.id;
  const customer = await db.Customer.findByPk(customerId);

  if (customer && customer.role === 'admin') {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
};

module.exports = checkAdminRole;
