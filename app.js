var express = require('express'),
    routes = require('./routes'),
    path = require('path'),
    config = require('./config/config'),
    app = express(),
    server = require('http').createServer(app),
    connectDomain = require('connect-domain'),
    passport = require('passport'),
    io = require('socket.io').listen(server),
    GithubStrategy = require('passport-github').Strategy;

app.set('port', process.env.PORT || config.listenPort);
app.set('views', __dirname + '/views/pages');
app.set('view engine', 'jade');
app.use(connectDomain());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser({}));
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

//设置日志级别
io.set('log level', 1);
//WebSocket连接监听
io.on('connection', function (socket) {
    // 对message事件的监听
    socket.on('broadcast:msg', function (msg) {
        // 广播向其他用户发消息
        socket.broadcast.emit('new:msg', msg);
    });
});

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

server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
