require('../component/fileUpload');
require('../component/factory');
require('../component/filter');
require('../lib/plugin/ng-infinite-scroll.min');
var utils = require('../lib/public/utils');
var smileys = require('../component/smileys');

var mod = angular.module('app', ['fileUploadComponent', 'factory', 'filter', 'infinite-scroll']);

angular.element(document).ready(function readyHandler() {
    angular.bootstrap(document, ['app']);
});

mod.controller('wrapCtrl', function ($scope) {
    $scope.$on('msgChange', function (event, msg) {
        $scope.$broadcast('changeFromParent', msg);
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
mod.controller('sendMsgCtrl', function ($scope, $http, socket) {
    $scope.addAttach = function () {//点击上传按钮
        angular.element('#attachBtn').click();
    };
    $scope.showSmiley = function () {
        $scope.smileyList = smileys[0].content;
    };

    $scope.outputSmiley = function (txt) {
        utils.string.insertText(document.getElementById('editor'), '[' + txt + ']');
    };
    $scope.sendMsg = function () {
        $scope.sendText = document.getElementById('editor').value;
        $http({
            method: 'post',
            url: '/sendMsg',
            data: {
                'content': $scope.sendText,
                'fileids': ''
            }
        }).success(function (req) {
            $scope.sendText = '';
            $scope.$emit('msgChange', req);
            socket.emit('broadcast:msg', req);
        });
    };
});

//后续用指令代替表情的操作
/*mod.directive('dMsgEditor', function () {
    return {
        restrict: 'A',
        scope: {},
        controller: function ($scope, $element, $attrs) {
            this.add = function(s){
                $scope.str = s;
                console.log($scope.str);
                console.log($element);
                utils.string.insertText($element, '[' + $scope.str + ']');
            };
        },
        link: function(scope, element, attrs){
            utils.string.insertText(element, '[' + scope.str + ']');
        }
    };
});*/

//表情
mod.directive('dSmiley', function () {
    return {
        restrict: 'A',
        replace: true,
        require: '^dMsgEditor',
        templateUrl: '/tpl/smiley.html',
        link: function (scope, element, attrs/*, msgEditor*/) {
            scope.addSmiley = function (txt) {
                scope.outputSmiley(txt);
                //msgEditor.add(txt);
            };
        }
    }
});

mod.controller('msgCtrl', function ($scope, $http, socket) {
    $scope.hasNew = true;
    //新消息处理
    socket.on('new:msg', function (msg) {
        $scope.hasNew = false;
    });
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
    $scope.$on('changeFromParent', function (event, msg) {
        $scope.msgList.unshift(msg.microblog);
    });
    $scope.$on('cmtChange', function (event, cmt) {
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
                    scope.$emit('cmtChange', cmt);
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
                    scope.$emit('cmtChange', cmt);
                    msg.commentNumber = 0;
                });
            };
        }
    };
});