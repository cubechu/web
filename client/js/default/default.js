define(["angular"], function(ng){
    var appModule = ng.module('app', []);

    appModule.controller('wrapCtrl', function($scope){
        $scope.$on("microblogChange",function (event, msg) {
              $scope.$broadcast("changeFromParent", msg);
         });
    });

    //发送消息
    appModule.controller('sendMsgCtrl', function ($scope, $http) {
        $scope.sendMsg = function(){
            $http({
                method: 'post',
                url: '/sendMsg',
                data: {
                    "userid": "00001",
                    "username": "云之家",
                    "avatar": "http://kdweibo.com/space/c/photo/load?id=5158f25e9cba0cac76000002&spec=150",
                    "content": $scope.sendText,
                    "sendtime": Date.now()
                }
            }).success(function(req){
                $scope.sendText = '';
                $scope.$emit("microblogChange", req);
            });
        };
    });

    //微博列表
    appModule.controller('blogListCtrl', function($scope, $http){
        $http({
            method: 'get',
            url: '/blogList'
        }).success(function(req){
            $scope.blogList = req;
        });
        $scope.$on("changeFromParent",function (event, msg) {
            $scope.blogList.unshift(msg);
        });
    });

    //回复
    appModule.directive('comment', function() {
        return {
            restrict : 'EA',
            replace : true,
            templateUrl : '/template/comment.html',
            link : function(scope, element, attrs) {
                scope.showMe = false;
                scope.toggle = function toggle() {
                    scope.showMe = !scope.showMe;
                }
            }
        }
    });

    //提交回复
    appModule.controller('cmtPost', function($scope, $http){
        $scope.cmtPost = function(){
            $http({
                method: 'post',
                url: '/comment',
                data: {

                }
            }).success(function(req){
                $scope.cmtText = '';
            });
        };
    });

    return appModule;
});
