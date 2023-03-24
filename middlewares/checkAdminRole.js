function checkAdminRole(req, res, next) {
    if (res.locals.isAdmin) {
      next();
    } else {
      res.status(401).send('Unauthorized');
    }
  }
  
  module.exports = checkAdminRole;