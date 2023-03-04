agregando Crud

modelo, los datos de la aplicacion estan en data

obtener un lisatdo de productos y filtrarlo por categoria

const  inSaleProducts = products.filter((product))
        return res.render('index'); 

product es cada iteracion del array de productos, cada objeto

        const inSaleProducts = products.filter((product)=> product.category=== 'in-sale')

x cada iteracion donde llamas product al objeto iterado, buscame el category de ese product q diga in sale

hace falta decirle a ejs donde esta la carpeta views
app.set('views', path.join(__dirname, '/views'));

			<% inSaleProducts.forEach(product => { %> <!--el product de las iteraciones sale de aca-->

desde un array x cada elemento, elemento situacion que repite, contenido dinamico, js

para especificar cada producto que en el ejs es href
<a href="/products/detail/<%= product.id %> ">
a q hace referencia ese /products/detail
hace referencia a la ruta dice juan, pero parece dudoso x q lo esta explicando con una imagen x ahora
es la base de datos?

pareceeria ser una ruta que no rutea, como que puede iur /detail/:id

express static le va a decir  la ruta es public

multer interviene entre el req, res previo al metodo del controller, primero procesa y despues lo pasa al controller

manejar el archivo no es la finalidad de la peticion

multer toma el req y se fija si hay un arcghivo, sin arhcivo tira error o pasa siguiente, si hay archivo lo guarda. la finalidadde subir un arhchivo es subir un archivo y poder hacer algo

multer debe ser un modulor a parte

ahora con

22 horas, estoy en 40 minutos

multer espera un objeto que tenga stgorage

como llega el controlador a agarrar el archivo, con el req, res
multer procesa el archivo, agrega los nombres de procesamiento el nombre de archivo al objeto req, para q ya el conbtrolador q esta aislado de multer, en su metodo store pueda acceder a travez de req.file

<form action="/products" method="POST" enctype="multipart/form-data">

el action es hacia donde va el formulario para poster, donde va?
hacia la ruta que lleva el post en el router, osea '/'

para q solo acepte imagenes desde el cliente

accept="image/*"

sumarle a multer q exploque el tipo de archivo q estoy subiendo.
lo vamos a tener con expath de path

cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))

1.02 horas crud 2

store: (req,res)=> {
        return res.send(req.file)
    },

en el controlador en req.file tengo todos los datos con el objeto q aba de ser creado para q el controlador haga lo que quiera, el objeto file.

como el controlador puede acceder a la informacion del archivo creado para usarlo?
a travez de req.file (creado con multer)
en req.file va a estar todoa la informacion del archivo
multer le agrega a req, la clave file con los datos resulktantes de procesar el archivo
ruta donde se guardo, extension, nombre original, tamaño... todos esos datos q multer agrega como libreria luego de procesar el archivo.

req.file es para poder usar el archivo, vas a poder hacer referencia al archivo gracias a req.file

desde el formulario el controlador va a usar req.file para la imagen x q se trata aparte y req.body para la info de texto plano

para acceder a la imagen el ejs rutea carepta /image/products **ejs** product.image

yo en la base de datyos no guardo archivos, los guardo en carpetas y los referencio

req.file.filename, referencio nombre del archivo

en la practica los archivos se van a guardar en un server aparte, en un hosting y el image va a estar ruteando en referencia al hosting

asi esta el controller andando
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname,'../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'))

const productController = {
    index: (req,res)=> {

        const inSaleProducts = products.filter((product)=> product.category === 'in-sale')
        const visitedProducts = products.filter((product)=> product.category === 'visited')
        return res.render('index', {inSaleProducts, visitedProducts}); 
    },
    create: (req,res)=> {
        return res.render('productCreateForm');
    },

    store: (req,res)=> {


        //necesito pushear al array un nuevo objeto literal
        //los pasos a seguir en el nueov objeto literal
        //convertir price a numero
        //agregar los campos id e image
        const productToCreate = req.body; //se hace copia al body para no tocar el body directo
        productToCreate.price = Number(productToCreate.price); //convertido a numero el precio                = Number(req.body.price) seria lo mismo
        // hasta aca guarde el precio
        productToCreate.image = req.file.filename; //para decirle q eso es la imagen
        //para guardarlo en el objeto q estoy creando, hasta entonces el objeto era mucho mas pequeño, sin id, sin image
        //hay q convertir el discount q si viene vacio lo convierta a un 0
        if(productToCreate.discount == ''){
            productToCreate.discount = 0;
        } else { //si no es vacio, entonces viene como string, si viene algo entonces convertilo a number
            productToCreate.discount = Number(productToCreate.discount);
        };
        //falta el id, a la cantidad de items en el array , su lenth sumale 1
        productToCreate.id = products.length +1;

        const ultimoElementoDelArray = products[products.length-1];
        const nuevoId = ultimoElementoDelArray.id +1; 
        //aca tengo el ultimo elemento, "array en la calve, array.lenth -1"
        //entonces nmuevo id seria, ultimo elementos delaraay .id +1, le suma 1 al ultimo elemento q era
        //desde aca el productro ya esta listo para ser guardado en la base de de datos
        //el objeto fue construido
        //ahora voy a GUARDAR EN LA BASE DE DATOS
        //hay q llamar a fs
        //agregar, metodo push
        //fs.writeFileSync(nuievosproductos)
        //Array.push

        products.push(productToCreate);
        //el producto a sido sumado al array
        //lo pusheamos al onjeto en memoria 

        //ahora hay q escribirlo en el json, con el nuevo elemetno
        //espera una ruta hacia un archivo y 2ndo parametro los datos a escribiur
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))//para q lo guarde formateado el 2
        //entonces, productsFilePath es la base de datos propiamente dicha a la cual le estas guardando el nuevo objeto products, stringifiado x q si no el JSON no lo lee

        return res.send(products);



    },
    
    detail: (req,res)=> {
        return res.render('productDetail')
    },
    /*edit: (req,res)=> {
        return res.send('detalles')
    },
    update: (req,res)=> {
        return res.send('detalles')
    },
    delete: (req,res)=> {
        return res.send('detalles')
    },

    login: (req,res)=> {
        return res.render('login');
    },
    donde: (req,res)=> {
        return res.render('quienes')
    },

    search: (req,res)=> {
        return res.send('search')
    },
    quienes: (req,res)=> {
        return res.render('quienes')
    },
    contacto: (req,res)=> {
        return res.render('quienes')
    },
    contacto: (req,res)=> {
        return res.send('busqueda')
    },

    userAccount: (req,res)=> {
        return res.render('userAccount')
    },
    userCreateForm: (req,res)=> {
        return res.render('userCreateForm')
    },*/
        
    }

module.exports=productController;


/*const productController = {
    principal: (req,res)=> {
        return res.render('index'); 
    },
    listado: (req,res)=> {
        return res.send ('todos los productos');
    },
    detalle: (req,res)=> {
        return res.render('detalle');
    },
    armasCortas: (req,res)=> {
        return res.render('armasCortas');
    },
    armasLargas: (req,res)=> {
        return res.render('armasLargas');
    },
    camping: (req,res)=> {
        return res.render('camping');
    },
    municiones: (req,res)=> {
        return res.render('municiones');
    },
    tramites: (req,res)=> {
        return res.render('tramites');
    },
    
    createProduct: (req,res)=> {
        return res.render('productCreateForm');
    }, 
    
    detail: (req,res)=> {
        return res.send('send');
    },
    productEdit: (req,res)=> {
        return res.render('productEdit');
    },
    productList: (req,res)=> {
        return res.render('productList');
    },
    shoppingCart: (req,res)=> {
        return res.render('shoppingCart');
    },
}

    
module.exports=productController;
*/

con muchas cosas de mas pero andando
///
este error signfica q la ruta no existe
Cannot GET /products/armasCortas

no hay metodo

///

[nodemon] app crashed - waiting for file changes before starting...
[nodemon] restarting due to changes...
[nodemon] starting `node app.js`
C:\Users\elect\Documents\PasadoDeCarpetaDigitalHouseDesdeCero\Proyectos\armeria\node_modules\express\lib\router\route.js:211
        throw new Error(msg);
        ^

Error: Route.get() requires a callback function but got a [object Undefined]
    at Route.<computed> [as get] (C:\Users\elect\Documents\PasadoDeCarpetaDigitalHouseDesdeCero\Proyectos\armeria\node_modules\express\lib\router\route.js:211:15)
    at Function.proto.<computed> [as get] (C:\Users\elect\Documents\PasadoDeCarpetaDigitalHouseDesdeCero\Proyectos\armeria\node_modules\express\lib\router\index.js:521:19)
    at Object.<anonymous> (C:\Users\elect\Documents\PasadoDeCarpetaDigitalHouseDesdeCero\Proyectos\armeria\routes\productRoutes.js:24:8)
    at Module._compile (node:internal/modules/cjs/loader:1099:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1153:10)
    at Module.load (node:internal/modules/cjs/loader:975:32)
    at Function.Module._load (node:internal/modules/cjs/loader:822:12)
    at Module.require (node:internal/modules/cjs/loader:999:19)
    at require (node:internal/modules/cjs/helpers:102:18)
    at Object.<anonymous> (C:\Users\elect\Documents\PasadoDeCarpetaDigitalHouseDesdeCero\Proyectos\armeria\app.js:17:23)

Node.js v17.7.1
[nodemon] app crashed - waiting for file changes before starting...
rs
[nodemon] starting `node app.js`
C:\Users\elect\Documents\PasadoDeCarpetaDigitalHouseDesdeCero\Proyectos\armeria\node_modules\express\lib\router\route.js:211
        throw new Error(msg);
        ^

Error: Route.get() requires a callback function but got a [object Undefined]
    at Route.<computed> [as get] (C:\Users\elect\Documents\PasadoDeCarpetaDigitalHouseDesdeCero\Proyectos\armeria\node_modules\express\lib\router\route.js:211:15)
    at Function.proto.<computed> [as get] (C:\Users\elect\Documents\PasadoDeCarpetaDigitalHouseDesdeCero\Proyectos\armeria\node_modules\express\lib\router\index.js:521:19)
    at Object.<anonymous> (C:\Users\elect\Documents\PasadoDeCarpetaDigitalHouseDesdeCero\Proyectos\armeria\routes\productRoutes.js:24:8)
    at Module._compile (node:internal/modules/cjs/loader:1099:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1153:10)
    at Module.load (node:internal/modules/cjs/loader:975:32)
    at Function.Module._load (node:internal/modules/cjs/loader:822:12)
    at Module.require (node:internal/modules/cjs/loader:999:19)
    at require (node:internal/modules/cjs/helpers:102:18)
    at Object.<anonymous> (C:\Users\elect\Documents\PasadoDeCarpetaDigitalHouseDesdeCero\Proyectos\armeria\app.js:17:23)

Node.js v17.7.1

este errir signficia que falta metodo en controller
/////

entonces como se hace para que se muestren todos los productos segun lo q se quiera ver filtrando desde la base de datos???



///error
es q no estas exportando la clave valor creada con el array q queres mostrar en ejs.
        return res.render('products', **{allProducts**});

ReferenceError: C:\Users\elect\Documents\PasadoDeCarpetaDigitalHouseDesdeCero\Proyectos\armeria\views\index.ejs:80
    78| 			<!-- Show the "visited" products -->

    79| 

 >> 80| 			<% visitedProducts.forEach(product => { %>

    81| 				

    82| 				<div class="col-12 col-sm-6 col-lg-3">
////////

el crud esta agregado con exito, se guardan usarios y productos, se falla en mosttrar la pagina siguiente al guardado, en usuariios x q no se como redireccionar a un perfil de usuario con id y en produtos los mismo

diciendo esto 
    store: (req,res)=> {
        res.send(req.body)
    },

req. body me envia toda la info q recibe desde el formulario:

sin la imagen:

{
"fullname": "dsadasd",
"username": "dasdas",
"mail": "dasdasd",
"sex": "male",
"description": "dasdasd"
}

ahora recibo absolutamente toda la info
  store: (req,res)=> {
        res.send({
            body: req.body,
            file: req.file
    });
    },

{
"body": {
"fullname": "dsadasd",
"username": "fsdfsdf",
"mail": "dasdasd@gmail.com",
"password": "fafasf",
"sex": "male",
"description": "fsfsdf"
},
"file": {
"fieldname": "image",
"originalname": "palacioAguasArgFfJT2NXXwAEcLO2.jfif",
"encoding": "7bit",
"mimetype": "image/jpeg",
"destination": "C:\\Users\\elect\\Documents\\PasadoDeCarpetaDigitalHouseDesdeCero\\Proyectos\\armeria\\public\\images\\user",
"filename": "image-1665975281680-740711969.jfif",
"path": "C:\\Users\\elect\\Documents\\PasadoDeCarpetaDigitalHouseDesdeCero\\Proyectos\\armeria\\public\\images\\user\\image-1665975281680-740711969.jfif",
"size": 1917806
}
}
revisar libreria de vbalidar
validator.js

````

este acento accent grave alt 96

https://github.com/javi-teaches/express-validator
clase validator javio