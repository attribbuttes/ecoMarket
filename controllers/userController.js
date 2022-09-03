const userController = {
    index: (req,res)=> {
        return res.render('index'); 
    },
    registro: (req,res)=> {
        return res.render('registerlogin');
    },
    login: (req,res)=> {
        return res.render('registerlogin');
    },
    account: (req,res)=> {
        return res.render('account');
    },
    }

module.exports=userController;
