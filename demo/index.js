const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const app = express();
const port = 5001;

const userController = require('./controllers/user');

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

app.get('/',(req, res)=>{
    res.send('Hello');
});

app.listen(port,()=>{
    console.log(`My Express app listening at http://localhost:${port}`)
})