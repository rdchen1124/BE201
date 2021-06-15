const db = require('../models');
const Comment = db.Comment;
const User = db.User;

const commentController = {
    add: (req,res)=>{
        const {content} = req.body;
        if(!content){
            req.flash('errMsg', '留言內容不能為空');
            return res.redirect('/');
        }
        Comment.create({
            content,
            UserId : req.session.userId
        }).then(()=>{
            res.redirect('/');
        }).catch(error=>{
            req.flash('errMsg', error.toString());
            return res.redirect('/');
        })
    }
    ,index: (req,res)=>{
        res.render('index');
    }
}

module.exports = commentController;