define(["angular", "io", "angularFileUpload"], function (ng, io) {
    var appModule = ng.module('app', ['angularFileUpload']);

    appModule.directive('fileUploader', function () {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: '/tpl/uploader.html',
            controller: 'uploadController'
        }
    });

    //文件上传
    appModule.controller('uploadController', ['$scope', 'FileUploader', function ($scope, FileUploader) {
        var uploader = $scope.uploader = new FileUploader({
            url: '/fileUpload'
        });

        // FILTERS

        uploader.filters.push({
            name: 'customFilter',
            fn: function (item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 10;
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function (fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function (addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function (item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function (fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function (progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function (fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function (fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function (fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function (fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function () {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);
    }]);

    appModule.controller('wrapCtrl', function ($scope) {
        $scope.$on("microblogChange", function (event, msg) {
            $scope.$broadcast("changeFromParent", msg);
        });
    });

    appModule.factory('socket', function ($rootScope) {
        var socket = io.connect('http://localhost:3006');
        return {
            on: function (eventName, callback) {
                socket.on(eventName, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                });
            },
            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
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

    //微博列表
    appModule.controller('mbListCtrl', function ($scope, $http, socket) {
        $http({
            method: 'get',
            url: '/mbList'
        }).success(function (req) {
            $scope.mbList = req;
        });
        $scope.hasNew = true;
        //新消息处理
        socket.on('new:msg', function (msg) {
            $scope.hasNew = false;
        });

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
    });


    //回复交互及提交指令
    appModule.directive('commentEditor', function ($http) {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: '/tpl/commentEditor.html',
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
        }
    });

    //回复内容指令
    appModule.directive('commentList', function () {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: '/tpl/commentList.html'
        }
    });

    //操作按钮
    appModule.directive('operationBtn', function () {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: '/tpl/operationBtn.html'
        }
    });

    return appModule;
});
