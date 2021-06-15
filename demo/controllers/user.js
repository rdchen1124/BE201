const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = require('../models');
const User = db.User;

const userController = {
    login: (req,res)=>{
        res.render('user/login');
    },
    handleLogin: (req,res)=>{
        const {username, password} = req.body;
        if(!username || !password){
            req.flash('errMsg', '請將所有資料填妥');
            return res.redirect('back');
        }
        //find user and all info of this user
        User.findOne({
            where: {
                username
            }
        }).then(user=>{
            // Load hash from your password DB.
            bcrypt.compare(password, user.password, function(err, result) {
                if(err || !result){
                    req.flash('errMsg', '此密碼有錯誤');
                    return res.redirect('back');
                }
                req.session.username = username;
                req.session.userId = user.id;
                res.redirect('/');
            });
        }).catch(error=>{
            req.flash('errMsg', '查無此使用者');
            return res.redirect('back');
        })
    },
    logout: (req,res)=>{
        req.session.username = false;
        res.redirect('/');
    },
    register: (req,res)=>{
        res.render('user/register');
    },
    handleRegister: (req,res)=>{
        const {username, nickname, password} = req.body;
        if(!username || !nickname || !password){
            req.flash('errMsg', '請將所有資料填妥');
            return res.redirect('back');
        }
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                // Store hash in your password DB.
                User.create({
                    username,
                    nickname,
                    password: hash
                }).then((user)=>{
                    req.session.username = user.username;
                    req.session.userId = user.id;
                    res.redirect('/');
                }).catch(error =>{
                    req.flash('errMsg', error.toString());
                    return res.redirect('back');
                })
            });
        });
    }
}
module.exports = userController;