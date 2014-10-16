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
                } else if($scope.mbList[i]._id == msg.mbId && !$scope.mbList[i].comment){
                    $scope.mbList[i].comment = [msg];
                }
            }
        });
    });

    //回复指令
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

    //回复内容指令
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
