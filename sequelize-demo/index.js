const { Sequelize } = require('sequelize');
//mysql_setup
const dbConfig = {
    HOST : 'localhost',
    dialect : 'mysql',
    DB : 'ryan',
    USER : 'ryan',
    PASSWORD : 'ryan'
}

//create database
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
});

//operate model of sequelize
const User = sequelize.define('seq_users',{
    firstName : {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName : {
        type: Sequelize.STRING,
    }
},{
    //options
});

const data = {
    firstName: 'Morgan',
    lastName : 'Freeman'
};

//sequelize.sync().then() > 把上面定義好的資料表(User 對應的那個)產生出來
//產生完後執行 then 裡面的 cb()
sequelize.sync().then(()=>{
    //after create table, do somthing
    User.create(data).then(()=>{
        console.log('created');
    });
});