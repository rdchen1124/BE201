const conn = require('../db')

const commentModel ={
    add: (user, cb) => {//args_1 : user (object)
        conn.query('INSERT INTO `simple_comments`(username, content) VALUES ( ? , ? ) ',
        [user.username, user.content], (error, results) => {
            if (error) return cb(error);
            cb(null);
        });
    },
    get : (id, username, cb)=>{
        conn.query(`SELECT C.content, C.username, C.id, U.nickname FROM simple_comments AS C 
        LEFT JOIN simple_users AS U ON C.username = U.username 
        WHERE C.id = ? AND C.username = ? `, [id, username],
        (error, results)=>{
            if(error){
                return cb(error);
            }
            cb(null, results[0] || {});// at most 1 item in results
        });
    }
    ,
    getAll: (cb) => {
        conn.query(
            `SELECT C.content, C.username, C.id, U.nickname FROM simple_comments AS C 
            LEFT JOIN simple_users AS U ON C.username = U.username 
            ORDER BY C.id DESC`,
            (error, results) => {
            if (error) return cb(error);
            cb(null, results);// show all contents from simple_comments
        });
    },
    delete: (id, username, cb)=>{
        conn.query(`
        DELETE FROM simple_comments WHERE id = ? AND username = ? `, [id,username]
        ,(error, results)=>{
            if(error){
                return cb(error);
            }
            cb(null);
        }
        )
    }
}

module.exports = commentModel;