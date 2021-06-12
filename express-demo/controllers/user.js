const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = require('../models');
const User = db.User;

const userController = {
    login : (req, res)=>{
        res.render('user/login');
    },
    handleLogin : (req, res, next)=>{
        const {username, password} = req.body;
        if(!username || !password){
            req.flash('errMsg', '請填妥所有資料');
            return next();
        }
        User.findOne({
            where: {
                username
            }
        }).then((user)=>{
            if(!user){
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
                req.session.userId = user.id;//關聯 user & comments table
                res.redirect('/');//注意 res 不能跟 isSuccess 同名，不然值會被蓋掉
            });
        }).catch((error)=>{
            req.flash('errMsg', error.toString());
            return next();
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
            User.create({
                username,
                nickname,
                password: hash
            }).then(user =>{//可以拿到執行個體
                req.session.username = username;
                req.session.userId = user.id;//怎麼拿到 user id
                res.redirect('/');
            }).catch(error =>{
                req.flash('errMsg', error.toString());
                return next();
            })
        });
        
    },
    logout : (req,res)=>{
        req.session.username = false;
        res.redirect('/');
    }
}

module.exports = userController;