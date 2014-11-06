var config = require('./config/config'),
    sign = require('./controllers/sign'),
    def = require('./controllers/default'),
    passport = require('passport');

module.exports = function (app) {
    app.get('/login', sign.login);
    app.post('/login',
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login'
        }));

    //default页面
    app.all('/', isLoggedIn);
    app.get('/', def.default);
    app.get('/default/:userId/admin', def.admin);//用户类型判断
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/login');
    });

    //微博列表
    app.get('/msgList', def.msgList);

    //发送消息
    app.all('/sendMsg', isLoggedIn);
    app.post('/sendMsg', def.sendMsg);

    //发送回复
    app.all('/sendCmt', isLoggedIn);
    app.post('/sendCmt', def.sendCmt);

    //github登录
    app.all('/github', isLoggedIn);
    app.get("/github", def.default);
    app.get("/auth/github", passport.authenticate("github", { scope: "email"}));
    app.get("/auth/github/callback",
        passport.authenticate("github", {
            successRedirect: '/default',
            failureRedirect: '/'
        }));
    //文件上传
    app.post('/fileUpload', def.fileUpload);
};
//是否是登录状态
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/login');
}