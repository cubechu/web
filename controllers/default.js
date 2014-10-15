var Model = require('../models/index');

//发送消息
exports.sendMb = function (req, res) {
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    var modelObj = req.body;
    var _model = new Model.microblog({
        userId: req.session.passport.user.id,
        userName: req.session.passport.user.username,
        avatar: req.session.passport.user.avatar ? req.session.passport.user.avatar : JSON.parse(req.session.passport.user._raw).avatar_url,
        content: modelObj.content,
        sendTime: modelObj.sendTime
    });
    _model.save(function (err, model) {
        if (err) {
            console.log(err);
        }
        res.send({
            "success": "true",
            "_id": model._id,
            "userId": model.userId,
            "userName": model.userName,
            "avatar": model.avatar,
            "content": model.content,
            "sendTime": model.sendTime
        });
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
        "userName": req.user.username
    });
};

//mbList
exports.mbList = function (req, res) {
    Model.microblog.fetch(function (err, microblog) {
        if (err) {
            console.log(err);
        }
        Model.comments.fetch(function (err, comment) {
            if (err) {
                console.log(err);
            }
            for (var i = 0; i < microblog.length; i++) {
                for (var j = 0; j < comment.length; j++) {
                    if (microblog[i]._id == comment[j].mbId) {
                        microblog[i]["comment"].push(comment[j]);
                    }
                }
            }
            res.send(microblog);
        });
    });
};

//用户类型判断
exports.admin = function (req, res) {
    res.end(req.params.userId);
};