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
    ,delete : (req,res)=>{
        const {id} = req.params;
        const UserId = req.session.userId;
        Comment.findOne({
            where: {
                id,
                UserId
            }
        }).then(comment=>{
            return comment.destroy();
        }).then(()=>{
            res.redirect('/');
        }).catch(error=>{
            req.flash('errMsg',error.toString());
            return res.redirect('/');
        });
    }
    ,update : (req,res)=>{
        const {id} = req.params;
        Comment.findOne({
            where : {
                id
            }
        }).then(comment=>{
            res.render('update', {
                comment
            });
        }).catch(error=>{
            req.flash('errMsg', error.toString());
            return res.redirect('back');
        });
    }
    ,handleUpdate : (req,res)=>{
        const {content} = req.body;
        const {id} = req.params;
        const {userId} = req.session;
        if(!content){
            req.flash('errMsg', '編輯內容不得為空');
            return res.redirect('back');
        }
        Comment.update(
            {
                content
            },{
                where : {
                    id,
                    UserId : userId
                }
            }
        ).then(()=>{
            res.redirect('/');
        }).catch(error=>{
            req.flash('errMsg', error.toString());
            return res.redirect('/');
        })
    }
}

module.exports = commentController;