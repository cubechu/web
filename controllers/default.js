var Model = require('../models/index');

//发送消息
exports.sendMsg = function(req, res){
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    var modelObj = req.body;
    var _model = new Model.microblog({
        "userid": modelObj.userid,
        "username": modelObj.username,
        "avatar": modelObj.avatar,
        "content": modelObj.content,
        "sendtime": modelObj.sendtime
    });
    _model.save(function(err, model){
        if(err){
            console.log(err);
        }
        res.send({
            "success": "true",
            "id": model._id,
            "userid": model.userid,
            "username": model.username,
            "avatar": model.avatar,
            "content": model.content,
            "sendtime": model.sendtime
        });
    });
};

//显示基本页面结构
exports.default = function(req, res){
    Model.microblog.fetch(function(err, microblog){
        if(err){
            console.log(err);
        }
        console.log(microblog);
        res.render('default', {
            "title": "首页",
            "file": "default",
            "userName": req.user.username
        });
    });
};

//blogList
exports.blogList = function(req, res){
    Model.microblog.fetch(function(err, microblog){
        if(err){
            console.log(err);
        }
        res.send(microblog);
    });
};

//用户类型判断
exports.admin = function(req, res){
    res.end(req.params.userId);
};