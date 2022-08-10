const express = require ('express');
const app = express();
const path = require('path')

const publicPath= path.resolve(__dirname, './public');  
app.use( express.static(publicPath) )

app.get('/', (req,res)=>{
    res.sendFile((path.join(__dirname, 'views', 'index.html')))
})

app.get('/account', (req,res)=>{
    res.sendFile((path.join(__dirname, 'views', 'account.html')))
})

app.get('/products', (req,res)=>{
    res.sendFile((path.join(__dirname, 'views', 'products.html')))
})

app.get('/armasCortas', (req,res)=>{
    res.sendFile((path.join(__dirname, 'views', 'armasCortas.html')))
})

app.get('/armasLargas', (req,res)=>{
    res.sendFile((path.join(__dirname, 'views', 'armasLargas.html')))
})

app.get('/camping', (req,res)=>{
    res.sendFile((path.join(__dirname, 'views', 'camping.html')))
})

app.get('/carrito', (req,res)=>{
    res.sendFile((path.join(__dirname, 'views', 'carrito.html')))
})

app.get('/detalleProd', (req,res)=>{
    res.sendFile((path.join(__dirname, 'views', 'detalleProd.html')))
})

app.get('/registerlogin', (req,res)=>{
    res.sendFile((path.join(__dirname, 'views', 'registerlogin.html')))
})

app.listen(3080, (req,res)=>{
    console.log('pagina online')
})
