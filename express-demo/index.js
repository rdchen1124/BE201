const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const conn = require('./db');
const app = express();
const port = 5001;

const todoController = require('./controllers/todo')

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
    res.locals.isLogin = req.session.isLogin;
    res.locals.errMsg = req.flash('errMsg');
    next();
});

app.post('/todos', todoController.newTodo);

app.get('/todos', todoController.getAll);
//url with id
app.get('/todos/:id', todoController.get);

app.get('/addTodo', todoController.addTodo);

app.get('/login', (req,res) => {
    res.render('login');
});

app.get('/logout', (req,res)=>{
    req.session.isLogin = false;
    res.redirect('/addTodo');
});

app.post('/login', (req,res)=>{
    if(req.body.password === '123'){
        req.session.isLogin = true;
        res.redirect('/addTodo');
    }else{
        req.flash('errMsg', 'Password uncorrect.');
        res.redirect('/login');
    }
});

app.listen(port, () => {
    conn.connect();
    console.log(`Example app listening at http://localhost:${port}`)
})