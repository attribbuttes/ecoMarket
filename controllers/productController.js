const productController = {
    principal: (req,res)=> {
        return res.render('index'); 
    },
    listado: (req,res)=> {
        return res.send ('hodsdsdla');
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
}

    
module.exports=productController;
