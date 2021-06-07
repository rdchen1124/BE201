const userModel = require('../models/todo');

const userController = {
    get: (req, res)=>{
        
    },
    login : (req, res)=>{
        res.render('login');

    },
    handleLogin : (req,res)=>{
        if(req.body.password === '123'){
            req.session.isLogin = true;
            res.redirect('/addTodo');
        }else{
            req.flash('errMsg', 'Password uncorrect.');
            res.redirect('/login');
        }
    },
    logout : (req,res)=>{
        req.session.isLogin = false;
        res.redirect('/addTodo');
    },
    register : (req, res)=>{
        res.render('user/register');

    },
    handleRegister : (req, res)=>{
        const {username, nickname, password} = req.body;
        res.render('register');

    }
}

module.exports = userController;