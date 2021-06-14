const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5001;

const userController = require('./controllers/user');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/',(req, res)=>{
    res.send('Hello');
});

app.listen(port,()=>{
    console.log(`My Express app listening at http://localhost:${port}`)
})