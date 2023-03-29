editar
tengo q traer los generos y eso van a ser 2 pedidos asincronicos distintos, se hace un promise.all para ambos pedidos asincronos.
el resultado es una funcion q recibe 2 cosas, 1er promesa y 2nda promesa, cosa a editar y generos, al finalizar hacemos un render compartiendo ambas variables, pelicula y generos

primero hay q pedir la pelicula

let pedidoPelicula = db.Pelicula.findByPk(req.params.id)

let pedidoGeneros = db.Genero.findAll()

Promise.all([pedidoPelicula, pedidoGeneros])
    .then(function([pelicula, generos])) los resultados del promise.all
    {
        res.render('editarPelicla', {pelicula:pelicula, generos:generos})
    }

de aca a la vista

los values van a estar rellenos

editarPelicula.js

viaja a <form action='/peliculas/editar/<%=pelicula.id %>
value='<%=pelicula.title%>'

trae la informacion del los names del formulario

generos

update: function (req, res) {
    db.Pelicula.update({
        title: req.body.tiulo,
        title: req.body.tiulo,

        title: req.body.tiulo,

        formulario con toda la info
    }, {
        where: {
            id:req.params.id
        }
    });
    res.redirect("/peliculas/" + req.params.id)
}

los campos obligatorios en la base de datos tienen que ir si o si o crashea la base de datos