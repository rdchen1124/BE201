const conn = require('../db')
// const todos = ['first todo', 'second todo', 'third todo'];

const todoModel ={
    getAll : (cb) => {
        conn.query('SELECT * FROM `todos`', (error, results) => {
            if (error) return cb(error);
            cb(null, results)
        });
        // return todos;
    },
    get: (id, cb) => {
        conn.query('SELECT * FROM `todos` WHERE id = ?', [id], (error, results) => {
            if (error) return cb(error);
            cb(null, results)
        });
        // return todo;
    },
    add: (content, cb) => {
        conn.query('INSERT INTO `todos`(content) VALUES ( ? ) ', [content], (error, results) => {
            if (error) return cb(error);
            cb(null)
        });
    }
}

module.exports = todoModel