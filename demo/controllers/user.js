const userController = {
    login: (req,res)=>{
        res.render('user/index');
    },
    register: (req,res)=>{
        res.render('user/register');
    }
}
module.exports = userController;