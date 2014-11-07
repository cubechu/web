var Model = require('../models/index'),
    fs = require('fs'),
    http = require('http'),
    config = require('../config/config'),
    request = require('./request');

//发送消息
exports.sendMsg = function (req, res) {
    request.post({
        data: {
            status: req.body.content,
            fileids: '',
            networId: req.session.passport.user.result.defaultNetwork
        },
        port: config.msgListPort,
        path: '/statuses/update',
        userId: req.session.passport.user.result.id,
        s: function (data) {
            console.log('sendMsg:' + data);
            return res.send(data);
        }
    });
};

//发送回复
exports.sendCmt = function (req, res) {
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    var modelObj = req.body;
    var _model = new Model.comments({
        receiverId: modelObj.receiverId,
        receiverName: modelObj.receiverName,
        cmtUserId: req.session.passport.user.id,
        cmtUserName: req.session.passport.user.username,
        cmtUserAvatar: req.session.passport.user.avatar ? req.session.passport.user.avatar : JSON.parse(req.session.passport.user._raw).avatar_url,
        content: modelObj.content,
        mbId: modelObj.mbId,
        sendTime: modelObj.sendTime
    });
    _model.save(function (err, model) {
        if (err) {
            console.log(err);
        }
        res.send({
            "success": "true",
            "_id": model._id,
            "receiverId": model.receiverId,
            "receiverName": model.receiverName,
            "cmtUserId": model.cmtUserId,
            "cmtUserName": model.cmtUserName,
            "cmtUserAvatar": model.cmtUserAvatar,
            "content": model.content,
            "mbId": model.mbId,
            "sendTime": model.sendTime
        });
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
    request.get({
        data: {
            networkIds: req.session.passport.user.result.defaultNetwork,
            pageIndex: 1,
            limit: 20
        },
        port: config.msgListPort,
        path: '/statuses/public_timeline/pageIndex',
        userId: req.session.passport.user.result.id,
        s: function (data) {
            console.log('msgList:' + data);
            return res.send(data);
        }
    });
};

exports.fileUpload = function (req, res) {
    console.log(req.files);
    /*if (req.files && req.files.thumbnail != 'undifined') {

     */
    /*
     var temp_path = req.files.thumbnail.path;
     if (temp_path) {
     fs.readFile(temp_path, 'utf-8', function (err, content) {
     //文件的内容
     console.log('content', content);
     // 删除临时文件
     fs.unlink(temp_path);
     });
     }*/
    /*
     }*/
};

//用户类型判断
exports.admin = function (req, res) {
    res.end(req.params.userId);
};