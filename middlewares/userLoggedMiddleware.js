const db = require('../database/models')
const Customer = db.Customer;


async function userLoggedMiddleware(req, res, next) {

    res.locals.isLogged = false;

    let emailInCookie = req.cookies.userEmail;

    if(emailInCookie){
    const customerFromCookie =  await Customer.findOne({
      where: {
        email: emailInCookie
      }
    })
    
    console.log(customerFromCookie)

    if(customerFromCookie) {
      req.session.userLogged = customerFromCookie;
    }

    if (req.session.userLogged) {
      res.locals.isLogged = true;
      res.locals.userLogged = req.session.userLogged;
    }

  }
    next();
  
  }
  
  module.exports = userLoggedMiddleware;
