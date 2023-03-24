const checkAdminRole = (req, res, next) => {
    const user = req.session.userLogged;
    if (user && user.role === 'admin') {
      next();
    } else {
      res.status(401).send('Unauthorized');
    }
  };
  
  module.exports = checkAdminRole;
  