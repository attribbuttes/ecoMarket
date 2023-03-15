const db = require('../database/models')
const Customer = db.Customer;


async function userLoggedMiddleware(req, res, next) {

    res.locals.isLogged = false;
    if (req.session.userLogged) {
      res.locals.isLogged = true;
      res.locals.userLogged = req.session.userLogged;
    }

    let emailInCookie = req.cookies.userEmail;
    if(emailInCookie) {
  const customerFromCookie =  await Customer.findOne({
    where: {
      email: emailInCookie
    }
  })
  console.log(customerFromCookie)
}
    next();
  
  }
  
  module.exports = userLoggedMiddleware;
