var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    config = require('./config/config'),
    app = express(),
    passport = require('passport'),
    GithubStrategy = require('passport-github').Strategy;

app.set('port', process.env.PORT || config.listenPort);
app.set('views', __dirname + '/views/pages');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret: config.secret, cookie: { maxAge: config.maxAge }}));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'client')));

if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

// github oauth
passport.use(new GithubStrategy(config.github, function (accessToken, refreshToken, profile, done) {
    done(null, profile);
}));

passport.serializeUser(function (user, done) {//保存user对象
    done(null, user);//可以通过数据库方式操作
});

passport.deserializeUser(function (user, done) {//删除user对象
    done(null, user);//可以通过数据库方式操作
});

// routes
routes(app);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
