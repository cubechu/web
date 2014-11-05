var passport = require('passport'),
    http = require('http'),
    qs = require('querystring'),
    config = require('../config/config'),
    LocalStrategy = require('passport-local').Strategy;
exports.login = function (req, res) {
    passport.use('local', new LocalStrategy(
        function (username, password, done) {

            var data = {
                accountName: username,
                password: password
            };

            var options = {
                hostname: config.restHost,
                port: 8040,
                path: '/user/authenticate',
                method: 'POST',
                headers: {
                    'X-Requested-clientId': 'web',
                    'X-Requested-userId': ''
                }
            };

            http.request(options, function (res) {
                res.setEncoding('utf8');
                res.on('data', function (data) {
                    var user = JSON.parse(data);
                    console.log('login: ' + user);
                    if (!user.success) {
                        return done(null, false, { message: 'Incorrect username.' });
                    }
                    return done(null, user);
                });
            }).on('error', function (e) {
                console.log('problem with request: ' + e.message);
            }).end(qs.stringify(data));
        }
    ));
    res.render('login', {
        title: '',
        file: 'login'
    });
};