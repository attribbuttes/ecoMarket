const express = require ('express');
const app = express();
const path = require('path')


const publicPath= path.resolve(__dirname, './public');  
const session = require('express-session')
app.use(express.urlencoded({extended:false})); //para poder recibir al informacion del formulario en valor post para hacer POST en req.body middleware seguridad de apliocacion modulo 5 clase 22
app.use(express.json()); //seguridad de apliocacion modulo 5 clase 22
const methodOverride = require('method-override');// modulo 5 express clase 22
app.use(methodOverride('_method')); // modulo 5 express clase 22 // para poder hacer patch, configuracion put delete, cambia el POST

app.use( express.static(publicPath) ) //le estoy diciendo q esto es public
app.use(session({secret: 'secreto'}))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/products', productRoutes);
app.use('/', userRoutes);

app.use((req, res, next) => {
    res.status(404).send('404-page');
next();
});


app.listen(3005, (req,res)=>{
    console.log('pagina online 3005')
})
