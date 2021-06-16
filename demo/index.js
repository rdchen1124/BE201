const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const app = express();
const port = 5001;

const userController = require('./controllers/user');
const commentController = require('./controllers/comment');

const { render } = require('ejs');

//設定 middleware : ejs
app.set('view engine','ejs');

//設定 middleware : express-session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

//設定 middleware : body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//設定 middleware : connect-flash
app.use(flash());

app.use((req,res,next)=>{
  res.locals.username = req.session.username;
  res.locals.errMsg = req.flash('errMsg');
  next();
})

app.get('/', commentController.index);

app.post('/', commentController.add);

app.get('/delete/:id', commentController.delete);

app.get('/update/:id', commentController.update);

app.post('/update/:id', commentController.handleUpdate);

app.get('/login', userController.login);

app.post('/login', userController.handleLogin);

app.get('/register', userController.register);

app.post('/register', userController.handleRegister);

app.get('/logout', userController.logout);

app.listen(port,()=>{
    console.log(`My Express app listening at http://localhost:${port}`)
})