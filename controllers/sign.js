var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
exports.login = function (req, res) {
    passport.use('local', new LocalStrategy(
        function (username, password, done) {
            var user = {
                id: '00001',
                username: 'admin',
                password: '123456',
                avatar: 'http://kdweibo.com/space/c/photo/load?id=5158f25e9cba0cac76000002&spec=150'
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
    res.render('login', {
        title: '',
        file: 'login'
    });
};