define(["angular"], function (ng) {
    var appModule = ng.module('app', []);

    appModule.controller('wrapCtrl', function ($scope) {
        $scope.$on("microblogChange", function (event, msg) {
            $scope.$broadcast("changeFromParent", msg);
        });
    });

    //发送消息
    appModule.controller('sendMbCtrl', function ($scope, $http) {
        $scope.sendMb = function () {
            $http({
                method: 'post',
                url: '/sendMb',
                data: {
                    "userId": "00001",
                    "userName": "云之家",
                    "avatar": "http://kdweibo.com/space/c/photo/load?id=5158f25e9cba0cac76000002&spec=150",
                    "content": $scope.sendText,
                    "sendTime": Date.now()
                }
            }).success(function (req) {
                $scope.sendText = '';
                $scope.$emit("microblogChange", req);
            });
        };
    });

    //微博列表
    appModule.controller('mbListCtrl', function ($scope, $http) {
        $http({
            method: 'get',
            url: '/mbList'
        }).success(function (req) {
            $scope.mbList = req;
        });
        $scope.$on("changeFromParent", function (event, msg) {
            $scope.mbList.unshift(msg);
        });
        $scope.$on("commentChange", function (event, msg) {
            for (var i = 0; i < $scope.mbList.length; i++) {
                if ($scope.mbList[i]._id == msg.mbId && $scope.mbList[i].comment) {
                    $scope.mbList[i].comment.unshift(msg);
                } else {
                    $scope.mbList[i].comment = [msg];
                }
            }
        });
    });

    //回复
    appModule.directive('commenteditor', function () {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: '/tpl/commentEditor.html',
            link: function (scope, element, attrs) {
                scope.showMe = false;
                scope.toggle = function toggle() {
                    scope.showMe = !scope.showMe;
                }
            }
        }
    });

    //回复列表
    appModule.directive('commentlist', function () {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: '/tpl/commentList.html'
        }
    });

    //提交回复
    appModule.controller('sendCmtCtrl', function ($scope, $http) {
        $scope.sendCmt = function (mb) {
            $http({
                method: 'post',
                url: '/sendCmt',
                data: {
                    receiverId: mb.userId,
                    receiverName: mb.userName,
                    cmtUserId: "00001",
                    cmtUserName: "云之家",
                    cmtUserAvatar: "http://kdweibo.com/space/c/photo/load?id=5158f25e9cba0cac76000002&spec=150",
                    content: $scope.sentText,
                    mbId: mb._id,
                    sendTime: Date.now()
                }
            }).success(function (req) {
                $scope.sentText = '';
                $scope.$emit("commentChange", req);
            });
        };
    });

    return appModule;
});
