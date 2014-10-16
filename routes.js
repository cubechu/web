var config = require('./config/config'),
    sign = require('./controllers/sign'),
    def = require('./controllers/default'),
    passport = require('passport');

module.exports = function (app) {
    app.get('/', sign.login);
    app.post('/login',
        passport.authenticate('local', {
            successRedirect: '/default',
            failureRedirect: '/'
        }));

    //default页面
    app.all('/default', isLoggedIn);
    app.get('/default', def.default);
    app.get('/default/:userId/admin', def.admin);//用户类型判断
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    //微博列表
    app.get('/mbList', def.mbList);

    //发送消息
    app.all('/sendMb', isLoggedIn);
    app.post('/sendMb', def.sendMb);

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
}
//是否是登录状态
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}