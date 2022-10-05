const express = require ('express');
const app = express();
const path = require('path')

const publicPath= path.resolve(__dirname, './public');  

app.use(express.urlencoded({extended:false})); //middleware seguridad de apliocacion modulo 5 clase 22
app.use(express.json()); //seguridad de apliocacion modulo 5 clase 22
const methodOverride = require('method-override');// modulo 5 express clase 22
app.use(methodOverride('_method')); // modulo 5 express clase 22

app.use( express.static(publicPath) )

app.set('view engine', 'ejs');

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/products', productRoutes);
app.use('/', userRoutes);



app.listen(3005, (req,res)=>{
    console.log('pagina online')
})
