require("../component/fileUpload");
//require("../component/socketFactory");
require("../lib/plugin/ng-infinite-scroll.min");
var smileys = require("../component/smileys");

var mod = angular.module('app', ['fileUploadComponent', /* 'socketComponent', */'infinite-scroll']);

mod.controller('wrapCtrl', function ($scope) {
    $scope.$on("msgChange", function (event, msg) {
        $scope.$broadcast("changeFromParent", msg);
    });
});

mod.directive('dShowTab', function () {
    return {
        link: function (scope, element, attrs) {
            element.click(function (e) {
                e.preventDefault();
                $(element).tab('show');
            });
        }
    };
});

//发送消息
mod.controller('sendMsgCtrl', function ($scope, $http/*, socket*/) {
    $scope.addAttach = function () {//点击上传按钮
        angular.element('#attachBtn').click();
    };
    $scope.smiley = false;
    $scope.showSmiley = function () {
        $scope.smiley = !$scope.smiley;
    };

    function insertText(obj, str) {
        if (document.selection) {
            obj.focus();
            sel = document.selection.createRange();
            sel.text = str;
            sel.select();
        }
        else if (obj.selectionStart || obj.selectionStart == '0') {
            var startPos = obj.selectionStart,
                endPos = obj.selectionEnd,
                restoreTop = obj.scrollTop;
            obj.focus();
            obj.value = obj.value.substring(0, startPos) + str + obj.value.substring(endPos, obj.value.length);
            if (restoreTop > 0) {
                obj.scrollTop = restoreTop;
            }
            startPos += str.length;
            obj.selectionStart = obj.selectionEnd = startPos;
        } else {
            obj.value += str;
            obj.focus();
        }
    }

    $scope.outputSmiley = function (txt) {
        insertText(document.getElementById('editor'), '[' + txt + ']');
    };
    $scope.sendMsg = function () {
        $http({
            method: 'post',
            url: '/sendMsg',
            data: {
                'content': $scope.sendText,
                'fileids': ''
            }
        }).success(function (req) {
            $scope.sendText = '';
            $scope.$emit("msgChange", req);
            /*socket.emit('broadcast:msg', req);*/
        });
    };
});

mod.directive('dSmiley', function () {
    return {
        restrict: 'A',
        replace: true,
        templateUrl: '/tpl/smiley.html',
        link: function (scope, element, attrs) {
            scope.smileyList = smileys[0].content;
            scope.addSmiley = function (txt) {
                scope.outputSmiley(txt);
            };
        }
    }
});

mod.controller('msgCtrl', function ($scope, $http/*, socket*/) {
    $scope.hasNew = true;
    //新消息处理
    /*socket.on('new:msg', function (msg) {
     $scope.hasNew = false;
     });*/
    //最新微博
    $scope.getLatestMsg = function () {
        $scope.hasNew = true;
        $http({
            method: 'get',
            url: '/msgList?lastsendtime=' + $scope.msgList[0].sendTime
        }).success(function (req) {
            for (var i = 0; i < req.length; i++) {
                $scope.msgList.unshift(req[i]);
            }
        });
    };
    $scope.$on("changeFromParent", function (event, msg) {
        $scope.msgList.unshift(msg.microblog);
    });
    $scope.$on("cmtChange", function (event, cmt) {
        var comments = $scope.msgList[cmt.index].comments;
        if (comments) {
            $scope.msgList[cmt.index].comments = cmt.isAdd ? comments.concat(cmt.content) : cmt.content.reverse().concat(comments);
        } else {
            $scope.msgList[cmt.index].comments = cmt.content;
        }
    });
    //滚动到底部获取数据
    var page = 1;
    $scope.hasData = false;
    $scope.loadMore = function () {
        if ($scope.hasData) return;
        $scope.hasData = true;
        $http({
            method: 'get',
            url: '/msgList',
            params: {
                pageIndex: page
            }
        }).success(function (req) {
            if (page === 1) {
                $scope.msgList = req;
            } else {
                $scope.msgList = $scope.msgList.concat(req);
            }
            $scope.hasData = false;
            if (req.length === 0) {
                $scope.hasData = true;
            }
            page++;
        });
    };
});

//回复
mod.directive('dCmt', function ($http) {
    return {
        restrict: 'EA',
        replace: true,
        templateUrl: '/tpl/msgCmt.html',
        link: function (scope, element, attrs) {
            scope.showMe = false;
            scope.cmtToggle = function () {
                scope.showMe = !scope.showMe;
            };
            scope.sendCmt = function (msg, index) {
                $http({
                    method: 'post',
                    url: '/sendCmt',
                    data: {
                        comment: scope.sentText,
                        msgId: msg.id
                    }
                }).success(function (req) {
                    scope.sentText = '';
                    var cmt = {
                        index: index,
                        content: [req],
                        isAdd: true
                    };
                    scope.$emit("cmtChange", cmt);
                });
            };
            scope.showComment = function (msg, index) {
                $http({
                    method: 'get',
                    url: '/getCmt',
                    params: {
                        msgId: msg.id,
                        start: 2,
                        limit: msg.commentNumber - 2
                    }
                }).success(function (req) {
                    var cmt = {
                        index: index,
                        content: req
                    };
                    req.index = index;
                    scope.$emit("cmtChange", cmt);
                    msg.commentNumber = 0;
                });
            };
        }
    };
});