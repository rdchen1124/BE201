const commentModel = require('../models/comment');
const db = require('../models');
const Comment = db.Comment;
const User = db.User;

const commentController = {
    add : (req, res)=>{
        //1. 邏輯
        const {content} = req.body;
        const {userId} = req.session;
        if(!content){
            req.flash('errMsg', '請填妥留言內容');
            return res.redirect('/');
        }
        //2. 拿資料
        Comment.create({
            content,
            UserId : userId
        }).then(()=>{
            res.redirect('/');
        })
    },
    index : (req, res)=>{
        //1. 邏輯 (因為是首頁，不需要判斷 username 等參數， step2 也不需要其他資訊，所以直接撈資料出來就好)
        //2. 拿資料
        Comment.findAll({
            include: User//沒有 include 就拿不到關聯的 User 資料
        }).then((results)=>{
            res.render('index',{
                comments: results
            });
        })

    },
    delete : (req, res)=>{
        // 邏輯
        // 資料操作
        Comment.findOne({
            where: {
                id: req.params.id,
                UserId: req.session.userId
            }
        }).then(comment=>{
            return comment.destroy()//因為這會回傳 Promise，意思是將回傳出來的 Promise 再回傳，讓下組 then()、catch() 做處理
        }).then(()=>{
            res.redirect('/')
        }).catch(error=>{
            req.flash('errMsg',error.toString());
            res.redirect('/')
        })
    },
    update : (req, res)=>{
        //資料
        Comment.findOne({
            where: {
                id: req.params.id,
                UserId: req.session.userId
            }
        }).then(comment=>{
            res.render('update',{
                comment
            });
        })
    },
    handleUpdate : (req, res)=>{
        //邏輯
        //資料
        Comment.update({
            content: req.body.content
        },{
            where: {
                id: req.params.id,
                UserId: req.session.userId
            }
        }).then(()=>{
            res.redirect('/');
        }).catch(error=>{
            req.flash('errMsg',error.toString());
            res.redirect('/');
        })
    }
}

module.exports = commentController;