const express = require ('express');
const app = express();
const path = require('path')

const publicPath= path.resolve(__dirname, './public');  

app.use( express.static(publicPath) )

app.set('view engine', 'ejs');

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/products', productRoutes);
app.use('/', userRoutes);

app.listen(3080, (req,res)=>{
    console.log('pagina online')
})
