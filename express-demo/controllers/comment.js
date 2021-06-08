const commentModel = require('../models/comment');


const commentController = {
    add : (req, res)=>{
        //1. 邏輯
        const {content} = req.body;
        const {username} = req.session;
        if(!content || !username){
            req.flash('errMsg', '請填妥留言內容');
            return res.redirect('/');
        }
        //2. 拿資料
        commentModel.add({
            username,
            content
        },(err)=>{
            if(err){
                req.flash('errMsg', err.toString());
                return res.redirect('/');
            }
            res.redirect('/');
        });
    },
    index : (req, res)=>{
        //1. 邏輯 (因為是首頁，不需要判斷 username 等參數， step2 也不需要其他資訊，所以直接撈資料出來就好)
        //2. 拿資料
        commentModel.getAll((err, result)=>{
            if(err){
                req.flash('errMsg', err.toString());
                return res.redirect('/');
            }
            res.render('index',{
                comments: result
            });
        });
    }
}

module.exports = commentController;