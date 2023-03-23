const checkAdminRole = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      res.status(401).send('Unauthorized');
    }
  };
  

module.exports = checkAdminRole;