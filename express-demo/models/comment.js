const conn = require('../db')

const commentModel ={
    add: (user, cb) => {//args_1 : user (object)
        conn.query('INSERT INTO `simple_comments`(username, content) VALUES ( ? , ? ) ',
        [user.username, user.content], (error, results) => {
            if (error) return cb(error);
            cb(null);
        });
    },
    getAll: (cb) => {
        conn.query(
            `SELECT C.content, U.nickname FROM simple_comments AS C 
            LEFT JOIN simple_users AS U ON C.username = U.username 
            ORDER BY C.id DESC`,
            (error, results) => {
            if (error) return cb(error);
            cb(null, results);// show all contents from simple_comments
        });
    }
}

module.exports = commentModel;