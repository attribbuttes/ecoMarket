function guestMiddleware (req, res, next) {
    if(req.session.userLogged) {
        return res.redirect('/profile')
        
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