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
        //撈出 Comment left join User 的所有資料
        Comment.findAll({
            order: [
                ['id','DESC']
            ],
            include : User
        }).then(results=>{
            res.render('index',{
                comments : results
            })
        }).catch(error=>{
            req.flash('errMsg', error.toString());
            return res.redirect('/');
        })
    }
}

module.exports = commentController;