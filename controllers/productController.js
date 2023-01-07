const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname,'../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'))

const productController = {
    index: (req,res)=> {
        const allProducts = products;
        const inSaleProducts = products.filter((product)=> product.category === 'in-sale')
        const visitedProducts = products.filter((product)=> product.category === 'visited')
        return res.render('products', {allProducts, inSaleProducts, visitedProducts}); 
    },
    create: (req,res)=> {
        return res.render('productCreateForm');
    },

    store: (req,res)=> {
        const allProducts = products;
        const productToCreate = req.body; 
        productToCreate.price = Number(productToCreate.price); 
        productToCreate.image = req.file.filename; 
        if(productToCreate.discount == ''){
            productToCreate.discount = 0;
        } else {
            productToCreate.discount = Number(productToCreate.discount);
        };
        productToCreate.id = products.length +1;
        products.push(productToCreate);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))
        return res.render('products', {allProducts});
    },
    
    detail: (req, res) => {
		const idToFind = req.params.id
        const product = products.find (p => p.id == idToFind)
        const discounted = Math.round(product.price - (product.price * product.discount) / 100)
		return res.render ('detail', {product, discounted})
	},

    armasCortas: (req,res)=> {

        const allProducts = products;
        const armasCortas = products.filter((product)=> product.category ==='armasCortas')
        return res.render('armasCortas', {armasCortas, allProducts}); 
    },
    armasLargas: (req,res)=> {

        const allProducts = products;
        const armasLargas = products.filter((product)=> product.category ==='armasLargas')
        return res.render('armasLargas', {armasLargas, allProducts}); 
    },
    camping: (req,res)=> {

        const allProducts = products;
        const camping = products.filter((product)=> product.category ==='camping')
        return res.render('camping', {camping, allProducts}); 
    },
    edit: (req,res)=> {
        const productId = req.params.id;
        const productToEdit = products.find((product) => product.id == productId)
        if (!productToEdit){
            return res.send('el producto no existe')
        }
        res.render('product-edit-form', { productToEdit})
        
    },
    update: (req, res) => {
		// Do the magic

		const productId = req.params.id;
        const allProducts = products;
		const indiceDelProducto = products.findIndex((product) => product.id == productId);
        indiceDelProducto.price = Number(indiceDelProducto.price);
        
		products[indiceDelProducto] = {...products[indiceDelProducto], ...req.body}
		//ssintaxis de fusion de 2 en 1
		productController.guardarProductos();
		return res.render('products', {allProducts});
	},
    delete: (req,res)=> {
        return res.send('eliminar producto')
    },

   
    shoppingCart: (req,res)=> {
        return res.send('ShioppingCart');
    },
    donde: (req,res)=> {
        return res.render('quienes')
    },            
    guardarProductos(req, res){
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))
	},//cuando uno guarda como stringfy si lo guardastre mal perdiste todo
	asignarIdAProductoEnBaseAlUltimo(productToCreate) {
		return products[products.length -1].id +1 ;
		//stringify convierte a json, null y 2 es para formatearlo 
	}//sume 1 numero al largo del array y doy id
}

module.exports=productController;

