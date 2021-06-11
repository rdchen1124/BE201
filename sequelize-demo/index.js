const db = require('./models');
const users = db.users;
const comments = db.comments;

users.create({
    firstName : 'Samuel',
    lastName : 'Jaskson'
}).then(()=>{
    console.log('new a user to users table')
});