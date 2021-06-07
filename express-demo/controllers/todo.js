const todoModel = require('../models/todo');

const todoController = {
    getAll: (req, res) => {
        todoModel.getAll((error, results) =>{
            if(error) return console.log('Error : ',error);
            res.render('todos',{
                todos : results
            });//template of todos, data
        });
    },
    get: (req, res)=>{
        todoModel.get(req.params.id, (error, results) => {
            if(error) return console.log('Error : ',error);
            res.render('todo',{
                todo : results[0]
            });
        });//template of todo, data
    },
    addTodo: (req, res) => {
        res.render('addTodo');
    },
    newTodo : (req, res) => {
        const content = req.body.content;
        todoModel.add(content, (error)=>{
            if(error) return console.log('Error : ',error);
            res.redirect('/todos');
        })
        
    }
}

module.exports = todoController;