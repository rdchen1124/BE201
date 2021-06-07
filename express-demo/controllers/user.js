const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userController = {
    login : (req, res)=>{
        res.render('login');
    },
    handleLogin : (req, res, next)=>{
        const {username, password} = req.body;
        if(!username || !password){
            req.flash('errMsg', '請填妥所有資料');
            return next();
        }
        // get user from database with get method of userModel
        userModel.get(username, (error, user)=>{
            if (error){
                req.flash('errMsg', error.toString());
                return next();
            }
            if (!user){
                req.flash('errMsg', '錯誤的使用者');
                return next();
            }
            // Load hash from your password DB.
            bcrypt.compare(password, user.password, function(err, isSuccess){
                if(err || !isSuccess){
                    req.flash('errMsg', '錯誤的密碼');
                    return next();
                }
                req.session.username = username;
                res.redirect('/');//注意 res 不能跟 isSuccess 同名，不然值會被蓋掉
            });
        });
        
    },
    register : (req, res)=>{
        res.render('user/register');
    },
    handleRegister : (req, res, next)=>{
        const {username, nickname, password} = req.body;
        if(!username || !nickname || !password){
            req.flash('errMsg','未填妥所有資料');
            return next();
        }
        // Hash password before store it.
        bcrypt.hash(password, saltRounds, function(error, hash) {
            // Store hash in your password DB.
            if(error){ 
                req.flash('errMsg',error.toString());
                return next();
            };
            userModel.add({
                username,
                nickname,
                password: hash
            }, (error)=>{
                if(error) {
                    req.flash('errMsg', error.toString());
                    return next();
                }
                req.session.username = username;
                res.redirect('/');
            })
        });
        
    },
    logout : (req,res)=>{
        req.session.username = false;
        res.redirect('/');
    }
}

module.exports = userController;