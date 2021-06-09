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
});

//new model for left join
const Comment = sequelize.define('seq_comments',{
    content : {
        type: Sequelize.STRING,
    }
});
// 建立 User 對 Comment 的連結 : 使用者可以有很多評論
User.hasMany(Comment);
Comment.belongsTo(User);
//sequelize.sync().then() > 把上面定義好的資料表(User 對應的那個)產生出來
//產生完後執行 then() 裡面的 cb()
sequelize.sync().then(()=>{
    //do somthing with sequelize
    Comment.findOne({
        where : {
            content : '不繳不行!!!!!'
        },
        include : User
    }).then(user=>{
        console.log(JSON.stringify(user, null, 4));
    });
});