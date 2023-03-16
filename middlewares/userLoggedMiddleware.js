const db = require('../database/models')
const Customer = db.Customer;


async function userLoggedMiddleware(req, res, next) {

  res.locals.isLogged = false;

  let emailInSession = req.session.userLogged ? req.session.userLogged.email : null;
  let emailInCookie = req.cookies.userEmail;
  if (emailInSession || emailInCookie) {
      let userLogged = await Customer.findOne({
          where: {
              email: emailInSession || emailInCookie
          }
      });
      req.session.userLogged = userLogged;
  }
  

  if (req.session.userLogged) {
      res.locals.isLogged = true;
      res.locals.userLogged = req.session.userLogged;
  }
  console.log("User Logged In:", req.session.userLogged);  

  next();
}

  
  module.exports = userLoggedMiddleware;

//secure middlware

/*const db = require('../database/models')
const Customer = db.Customer;

async function userLoggedMiddleware(req, res, next) {

  res.locals.isLogged = false;

  const emailInSession = req.session.userLogged ? req.session.userLogged.email : null;
  const emailInCookie = req.signedCookies.userEmail;

  if (emailInSession || emailInCookie) {
    try {
      const userLogged = await Customer.findOne({
          where: {
              email: emailInSession || emailInCookie
          }
      });
      if (userLogged) {
        req.session.userLogged = userLogged;
        res.locals.isLogged = true;
        res.locals.userLogged = userLogged;
      }
    } catch (error) {
      console.log(error);
    }
  }
  next();
}

module.exports = userLoggedMiddleware;
*/