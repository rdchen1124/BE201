const conn = require('../db')
// const todos = ['first todo', 'second todo', 'third todo'];

const userModel ={
    add: (user, cb) => {//args_1 : user (object)
        conn.query('INSERT INTO `simple_users`(username, nickname, password) VALUES ( ? , ? , ? ) ',
        [user.username, user.nickname, user.password ], (error, results) => {
            if (error) return cb(error);
            cb(null);
        });
    },
    get: (username, cb) => {
        conn.query('SELECT * FROM `simple_users` WHERE username = ? ', [username], (error, results) => {
            if (error) return cb(error);
            cb(null, results[0]);// results is an array and items are objects with RawData type.
        });
    }
}

module.exports = userModel;