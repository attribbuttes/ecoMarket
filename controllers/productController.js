const productController = {
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
    
    productDetail: (req,res)=> {
        return res.render('productDetail');
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
