var Model = require('../models/index'),
    http = require('http'),
    config = require('../config/config'),
    request = require('./request');

//发送消息
exports.sendMsg = function (req, res) {
    request({
        data: {
            content: req.body.content,
            fileids: '',
            networkIds: req.session.passport.user.result.defaultNetwork
        },
        port: config.msgListPort,
        path: '/statuses/update',
        userId: req.session.passport.user.result.id,
        networkId: req.session.passport.user.result.defaultNetwork,
        method: 'POST'
    }).then(function (data) {
        console.log('sendMsg: ' + data);
        return res.send(data);
    });
};

//发送回复
exports.sendCmt = function (req, res) {
    request({
        data: {
            microBlogId: req.body.msgId,
            comment: req.body.comment
        },
        port: config.msgListPort,
        path: '/comments/create',
        userId: req.session.passport.user.result.id,
        networkId: req.session.passport.user.result.defaultNetwork,
        method: 'POST'
    }).then(function (data) {
        console.log('sendMsg: ' + data);
        return res.send(data);
    });
};

//显示基本页面结构
exports.default = function (req, res) {
    res.render('default', {
        "title": "首页",
        "file": "default",
        "userName": req.session.passport.user.result.name
    });
};

//微博列表
exports.msgList = function (req, res) {
    request({
        data: {
            networkIds: req.session.passport.user.result.defaultNetwork,
            pageIndex: req.query.pageIndex,
            limit: config.msgListLimit
        },
        port: config.msgListPort,
        path: '/statuses/public_timeline/pageIndex',
        userId: req.session.passport.user.result.id,
        networkId: req.session.passport.user.result.defaultNetwork
    }).then(function (data) {
        console.log('msgList: ' + data);
        res.send(data);
    });
};

//上传
exports.fileUpload = function (req, res) {
    console.log(req.files);
};

//用户类型判断
exports.admin = function (req, res) {
    res.end(req.params.userId);
};