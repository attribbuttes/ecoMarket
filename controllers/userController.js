const userController = {
    index: (req,res)=> {
        return res.render('index'); 
    },
    register: (req,res)=> {
        return res.render('userRegisterLogin');
    },
    login: (req,res)=> {
        return res.render('userRegisterLogin');
    },
    donde: (req,res)=> {
        return res.render('quienes')
    },
    quienes: (req,res)=> {
        return res.render('quienes')
    },
    contacto: (req,res)=> {
        return res.render('quienes')
    },

    userAccount: (req,res)=> {
        return res.render('userAccount')
    },
    userCreateForm: (req,res)=> {
        return res.render('userCreateForm')
    },
        
    }

module.exports=userController;
