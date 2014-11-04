define(["angular", "sendMicroblog", "socketFactory"], function (ng) {

    var appModule = ng.module('app', ['sendMicroblogComponent', 'socketComponent']);

    appModule.controller('wrapCtrl', function ($scope) {
        $scope.$on("microblogChange", function (event, msg) {
            $scope.$broadcast("changeFromParent", msg);
        });
    });

    appModule.directive('showTab', function () {
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
    appModule.controller('sendMbCtrl', function ($scope, $http, socket) {
        $scope.sendMb = function () {
            $http({
                method: 'post',
                url: '/sendMb',
                data: {
                    "content": $scope.sendText,
                    "sendTime": Date.now()
                }
            }).success(function (req) {
                $scope.sendText = '';
                $scope.$emit("microblogChange", req);
                socket.emit('broadcast:msg', req);
            });
        };
    });

    appModule.controller('mbCtrl', function ($scope, $http, socket) {
        $scope.hasNew = true;
        //新消息处理
        socket.on('new:msg', function (msg) {
            $scope.hasNew = false;
        });
        //最新微博
        $scope.getLatestMb = function () {
            $scope.hasNew = true;
            $http({
                method: 'get',
                url: '/mbList?lastsendtime=' + $scope.mbList[0].sendTime
            }).success(function (req) {
                for (var i = 0; i < req.length; i++) {
                    $scope.mbList.unshift(req[i]);
                }
            });
        };
        $scope.$on("changeFromParent", function (event, msg) {
            $scope.mbList.unshift(msg);
        });
        $scope.$on("commentChange", function (event, msg) {
            for (var i = 0; i < $scope.mbList.length; i++) {
                if ($scope.mbList[i]._id == msg.mbId && $scope.mbList[i].comment) {
                    $scope.mbList[i].comment.unshift(msg);
                } else if ($scope.mbList[i]._id == msg.mbId && !$scope.mbList[i].comment) {
                    $scope.mbList[i].comment = [msg];
                }
            }
        });
        $http({
            method: 'get',
            url: '/mbList'
        }).success(function (req) {
            $scope.mbList = req;
        });
    });

    appModule.directive('mbList', function () {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            templateUrl: '/tpl/microblogList.html'
        }
    });

    //回复
    appModule.directive('mbComment', function ($http) {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: '/tpl/microblogComment.html',
            link: function (scope, element, attrs) {
                scope.showMe = false;
                scope.cmtToggle = function () {
                    scope.showMe = !scope.showMe;
                };
                scope.sendCmt = function (mb) {
                    $http({
                        method: 'post',
                        url: '/sendCmt',
                        data: {
                            receiverId: mb.userId,
                            receiverName: mb.userName,
                            content: scope.sentText,
                            mbId: mb._id,
                            sendTime: Date.now()
                        }
                    }).success(function (req) {
                        scope.sentText = '';
                        scope.$emit("commentChange", req);
                    });
                };
            }
        };
    });

    appModule.directive('mbOperation', function () {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: '/tpl/microblogOperation.html'
        };
    });

    return appModule;
});
