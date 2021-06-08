const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const conn = require('./db');
const app = express();
const port = 5001;

const todoController = require('./controllers/todo');
const userController = require('./controllers/user');
const commentController = require('./controllers/comment');

const { render } = require('ejs');

app.set('view engine', 'ejs');

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));

// parse application/x-www-form-urlencoded (data of POST)
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json (data type of Ajax)
app.use(bodyParser.json())

app.use(flash());

app.use((req, res, next)=>{
    res.locals.username = req.session.username;
    res.locals.errMsg = req.flash('errMsg');
    next();
});

function redirectBack(req, res){
    res.redirect('back');
}

app.get('/', commentController.index);

app.post('/', commentController.add);

app.post('/todos', todoController.newTodo);

app.get('/todos', todoController.getAll);
//url with id
app.get('/todos/:id', todoController.get);

app.get('/addTodo', todoController.addTodo);

app.get('/login', userController.login);

app.post('/login', userController.handleLogin, redirectBack);

app.get('/logout', userController.logout);

app.get('/register', userController.register);

app.post('/register', userController.handleRegister, redirectBack);

app.get('/delete_comment/:id', commentController.delete);

app.listen(port, () => {
    conn.connect();
    console.log(`Example app listening at http://localhost:${port}`)
})