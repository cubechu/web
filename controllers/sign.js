var passport = require('passport'),
    http = require('http'),
    qs = require('querystring'),
    config = require('../config/config'),
    request = require('./request'),
    LocalStrategy = require('passport-local').Strategy;
exports.login = function (req, res) {
    passport.use('local', new LocalStrategy(
        function (username, password, done) {
            request.post({
                data: {
                    accountName: username,
                    password: password
                },
                port: config.loginPort,
                path: '/user/authenticate',
                userId: '',
                s: function (data) {
                    var user = JSON.parse(data);
                    console.log('user: ' + data);
                    if (!user.success) {
                        return done(null, false, { message: 'Incorrect username.' });
                    }
                    return done(null, user);
                }
            });
        }
    ));
    res.render('login', {
        title: '',
        file: 'login'
    });
};