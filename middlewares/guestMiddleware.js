function guestMiddleware (req, res, next) { //si el user esta en session quiero redireccion a profile
    if(req.session.userLogged) { //propiedad generada al loguearse 168 userController
        return res.redirect('/profile')
                                //si userLogged esta creado te manda a profile, si no q seria undefined pasa next  
    }
    next();
}


/*function guestMiddleware (req, res, next) {
    if(req.session.userLogged == undefined) {//propiedad generada al loguear a la persona en el controller
        next ();
    }else{
        res.send('esta pagina es solo para invitados');
    }
}*/

module.exports = guestMiddleware;