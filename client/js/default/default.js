define(["angular", "sendMsg", "socketFactory"], function (ng) {

    var appModule = ng.module('app', ['sendMsgComponent', 'socketComponent']);

    appModule.controller('wrapCtrl', function ($scope) {
        $scope.$on("msgChange", function (event, msg) {
            $scope.$broadcast("changeFromParent", msg);
        });
    });

    appModule.directive('dShowTab', function () {
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
    appModule.controller('sendMsgCtrl', function ($scope, $http, socket) {
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
                socket.emit('broadcast:msg', req);
            });
        };
    });

    appModule.controller('msgCtrl', function ($scope, $http, socket) {
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
        $scope.$on("changeFromParent", function (event, msg) {
            $scope.msgList.unshift(msg);
        });
        $scope.$on("cmtChange", function (event, msg) {
            for (var i = 0; i < $scope.msgList.length; i++) {
                if ($scope.msgList[i]._id == msg.msgId && $scope.msgList[i].comment) {
                    $scope.msgList[i].comment.unshift(msg);
                } else if ($scope.msgList[i]._id == msg.msgId && !$scope.msgList[i].comment) {
                    $scope.msgList[i].comment = [msg];
                }
            }
        });
        $http({
            method: 'get',
            url: '/msgList'
        }).success(function (req) {
            console.log(req);
            $scope.msgList = req;
        });
    });

    //回复
    appModule.directive('dCmt', function ($http) {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: '/tpl/msgCmt.html',
            link: function (scope, element, attrs) {
                scope.showMe = false;
                scope.cmtToggle = function () {
                    scope.showMe = !scope.showMe;
                };
                scope.sendCmt = function (msg) {
                    $http({
                        method: 'post',
                        url: '/sendCmt',
                        data: {
                            receiverId: msg.userId,
                            receiverName: msg.userName,
                            content: scope.sentText,
                            msgId: msg._id,
                            sendTime: Date.now()
                        }
                    }).success(function (req) {
                        scope.sentText = '';
                        scope.$emit("cmtChange", req);
                    });
                };
            }
        };
    });

    return appModule;
});
