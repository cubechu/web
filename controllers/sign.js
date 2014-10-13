var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
exports.login = function(req, res){
    passport.use('local', new LocalStrategy(
        function (username, password, done) {
            var user = {
                id: '1',
                username: 'admin',
                password: 'aaa'
            }; // 可以配置通过数据库方式读取登陆账号

            if (username !== user.username) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (password !== user.password) {
                return done(null, false, { message: 'Incorrect password.' });
            }

            return done(null, user);
        }
    ));
    res.render('login', { title: 'login' });
};