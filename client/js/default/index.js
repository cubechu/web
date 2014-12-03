(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require("../lib/plugin/angular-file-upload.min");

var mod = angular.module('fileUploadComponent', ['angularFileUpload']);

mod.directive('dFileUpload', function () {
    return {
        restrict: 'EA',
        replace: true,
        templateUrl: '/tpl/fileUpload.html',
        controller: 'uploadController'
    }
});

mod.controller('uploadController', ['$scope', 'FileUploader', function ($scope, FileUploader) {
    var uploader = $scope.uploader = new FileUploader({
        url: '/fileUpload'
    });

    $scope.fileList = true;//隐藏上传控件

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
        $scope.fileList = false;
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
},{"../lib/plugin/angular-file-upload.min":5}],2:[function(require,module,exports){
module.exports = [
    {
        type: 'default',
        content: [
            ['呵呵', 'hehe.gif'],
            ['嘻嘻', 'xixi.gif'],
            ['哈哈', 'haha.gif'],
            ['可爱', 'keai.gif'],
            ['爱你', 'aini.gif'],
            ['亲亲', 'qinqin.gif'],
            ['太开心', 'taikaixin.gif'],
            ['鼓掌', 'guzhang.gif'],
            ['偷笑', 'touxiao.gif'],
            ['做鬼脸', 'zuoguilian.gif'],

            ['害羞', 'haixiu.gif'],
            ['酷', 'ku.gif'],
            ['花心', 'huaxin.gif'],
            ['钱', 'qian.gif'],
            ['吃惊', 'chijing.gif'],
            ['馋嘴', 'chanzui.gif'],
            ['懒得理你', 'landelini.gif'],
            ['思考', 'sikao.gif'],
            ['嘘', 'xu.gif'],
            ['疑问', 'yiwen.gif'],

            ['汗', 'han.gif'],
            ['困', 'kun.gif'],
            ['打哈气', 'dahaqi.gif'],
            ['睡觉', 'shuijiao.gif'],
            ['哼', 'heng.gif'],
            ['闭嘴', 'bizui.gif'],
            ['鄙视', 'bishi.gif'],
            ['顶', 'ding.gif'],
            ['委屈', 'weiqu.gif'],
            ['挖鼻屎', 'wabishi.gif'],

            ['生病', 'shengbing.gif'],
            ['晕', 'yun.gif'],
            ['吐', 'tu.gif'],
            ['失望', 'shiwang.gif'],
            ['可怜', 'kelian.gif'],
            ['泪', 'lei.gif'],
            ['衰', 'shuai.gif'],
            ['抓狂', 'zhuakuang.gif'],
            ['怒骂', 'numa.gif'],
            ['怒', 'nu.gif'],

            ['左哼哼', 'zuohengheng.gif'],
            ['右哼哼', 'youhengheng.gif'],
            ['赞', 'zan.gif'],
            ['弱', 'ruo.gif'],
            ['来', 'lai.gif'],
            ['ok', 'ok.gif'],
            ['不要', 'buyao.gif'],
            ['耶', 'ye.gif'],
            ['握手', 'woshou.gif'],
            ['玫瑰', 'rose.gif'],

            ['心', 'xin.gif'],
            ['伤心', 'shangxin.gif'],
            ['钟', 'zhong.gif'],
            ['太阳', 'taiyang.gif'],
            ['月亮', 'yueliang.gif'],
            ['蛋糕', 'dangao.gif'],
            ['干杯', 'ganbei.gif'],
            ['咖啡', 'kafei.gif'],
            ['猪头', 'zhutou.gif'],
            ['话筒', 'huatong.gif'],

            ['蜡烛', 'lazhu.gif'],
            ['闪电', 'shandian.gif'],
            ['拥抱', 'yongbao.gif'],
            ['吃饭', 'chifan.gif'],
            ['足球', 'zuqiu.gif'],
            ['雨伞', 'yusan.gif'],
            ['棒棒糖', 'bangbangtang.gif'],
            ['气球', 'qiqiu.gif'],
            ['沙发', 'shafa.gif'],
            ['飞机', 'feiji.gif']

        ]
    },
    {
        type: 'xl',
        content: [
            ['53faa7b224ac5a01da0304e9', '报三围.gif', 'xiaoluo_baosanwei'],
            ['53faa7b224ac5a01da0304ed', '打招呼.gif', 'xiaoluo_hi'],
            ['53faa7b224ac5a01da0304e5', '发图片.gif', 'xiaoluo_fazhaopian'],
            ['53faa7b224ac5a01da0304eb', '欢迎.gif', 'xiaoluo_huanying'],
            ['53faa7b224ac5a01da0304f1', '加油.gif', 'xiaoluo_laladui'],
            ['53faaa9624ac5a01da030fcc', '开心.gif', 'xiaoluo_sahua'],
            ['53faaa9624ac5a01da030fc8', '你好棒.gif', 'xiaoluo_paomeiyan'],
            ['53faaa9624ac5a01da030fc4', '扭屁股.gif', 'xiaoluo_niupigu'],
            ['53faaa9624ac5a01da030fc6', '拍手.gif', 'xiaoluo_paishou'],
            ['53faaa9624ac5a01da030fc2', '期待.gif', 'xiaoluo_maimeng'],
            ['53faa7b224ac5a01da0304e7', '庆祝.gif', 'xiaoluo_fangbianpao'],
            ['53faaa9624ac5a01da030fca', '握手.gif', 'xiaoluo_woshou'],
            ['53faaa9624ac5a01da030fce', '羡慕.gif', 'xiaoluo_se'],
            ['53faaa9724ac5a01da030fd0', '献花.gif', 'xiaoluo_xianhua'],
            ['53faa7b224ac5a01da0304ef', '谢谢.gif', 'xiaoluo_feiwen'],
            ['53faa7b224ac5a01da0304e3', '求抱抱.gif', 'xiaoluo_baobao']
        ]
    }
];
},{}],3:[function(require,module,exports){
var mod = angular.module('socketComponent', []);

mod.factory('socket', function ($rootScope) {
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
},{}],4:[function(require,module,exports){
require("../component/fileUpload");
require("../component/socketFactory");
require("../lib/plugin/ng-infinite-scroll.min");
var smileys = require("../component/smileys");

var mod = angular.module('app', ['fileUploadComponent', 'socketComponent', 'infinite-scroll']);

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
mod.controller('sendMsgCtrl', function ($scope, $http, socket) {
    $scope.addAttach = function () {//点击上传按钮
        angular.element('#attachBtn').click();
    };
    $scope.showSmiley = function () {
        $scope.smileyList = smileys[0].content;
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
            socket.emit('broadcast:msg', req);
        });
    };
});

mod.directive('dSmiley', function () {
    return {
        restrict: 'A',
        replace: true,
        templateUrl: '/tpl/smiley.html',
        link: function (scope, element, attrs) {
            scope.addSmiley = function (txt) {
                scope.outputSmiley(txt);
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
},{"../component/fileUpload":1,"../component/smileys":2,"../component/socketFactory":3,"../lib/plugin/ng-infinite-scroll.min":6}],5:[function(require,module,exports){
/*
 angular-file-upload v1.1.5
 https://github.com/nervgh/angular-file-upload
*/
!function(a,b){return"function"==typeof define&&define.amd?(define("angular-file-upload",["angular"],function(a){return b(a)}),void 0):b(a)}("undefined"==typeof angular?null:angular,function(a){var b=a.module("angularFileUpload",[]);return b.value("fileUploaderOptions",{url:"/",alias:"file",headers:{},queue:[],progress:0,autoUpload:!1,removeAfterUpload:!1,method:"POST",filters:[],formData:[],queueLimit:Number.MAX_VALUE,withCredentials:!1}).factory("FileUploader",["fileUploaderOptions","$rootScope","$http","$window","$compile",function(b,c,d,e,f){function g(c){var d=a.copy(b);a.extend(this,d,c,{isUploading:!1,_nextIndex:0,_failFilterIndex:-1,_directives:{select:[],drop:[],over:[]}}),this.filters.unshift({name:"queueLimit",fn:this._queueLimitFilter}),this.filters.unshift({name:"folder",fn:this._folderFilter})}function h(b){var c=a.isElement(b),d=c?b.value:b,e=a.isString(d)?"FakePath":"Object",f="_createFrom"+e;this[f](d)}function i(b,c,d){var e=a.isElement(c),f=e?a.element(c):null,h=e?null:c;a.extend(this,{url:b.url,alias:b.alias,headers:a.copy(b.headers),formData:a.copy(b.formData),removeAfterUpload:b.removeAfterUpload,withCredentials:b.withCredentials,method:b.method},d,{uploader:b,file:new g.FileLikeObject(c),isReady:!1,isUploading:!1,isUploaded:!1,isSuccess:!1,isCancel:!1,isError:!1,progress:0,index:null,_file:h,_input:f}),f&&this._replaceNode(f)}function j(b){a.extend(this,b),this.uploader._directives[this.prop].push(this),this._saveLinks(),this.bind()}function k(){k.super_.apply(this,arguments),this.uploader.isHTML5||this.element.removeAttr("multiple"),this.element.prop("value",null)}function l(){l.super_.apply(this,arguments)}function m(){m.super_.apply(this,arguments)}return g.prototype.isHTML5=!(!e.File||!e.FormData),g.prototype.addToQueue=function(b,c,d){var e=this.isArrayLikeObject(b)?b:[b],f=this._getFilters(d),h=this.queue.length,i=[];a.forEach(e,function(a){var b=new g.FileLikeObject(a);if(this._isValidFile(b,f,c)){var d=new g.FileItem(this,a,c);i.push(d),this.queue.push(d),this._onAfterAddingFile(d)}else{var e=this.filters[this._failFilterIndex];this._onWhenAddingFileFailed(b,e,c)}},this),this.queue.length!==h&&(this._onAfterAddingAll(i),this.progress=this._getTotalProgress()),this._render(),this.autoUpload&&this.uploadAll()},g.prototype.removeFromQueue=function(a){var b=this.getIndexOfItem(a),c=this.queue[b];c.isUploading&&c.cancel(),this.queue.splice(b,1),c._destroy(),this.progress=this._getTotalProgress()},g.prototype.clearQueue=function(){for(;this.queue.length;)this.queue[0].remove();this.progress=0},g.prototype.uploadItem=function(a){var b=this.getIndexOfItem(a),c=this.queue[b],d=this.isHTML5?"_xhrTransport":"_iframeTransport";c._prepareToUploading(),this.isUploading||(this.isUploading=!0,this[d](c))},g.prototype.cancelItem=function(a){var b=this.getIndexOfItem(a),c=this.queue[b],d=this.isHTML5?"_xhr":"_form";c&&c.isUploading&&c[d].abort()},g.prototype.uploadAll=function(){var b=this.getNotUploadedItems().filter(function(a){return!a.isUploading});b.length&&(a.forEach(b,function(a){a._prepareToUploading()}),b[0].upload())},g.prototype.cancelAll=function(){var b=this.getNotUploadedItems();a.forEach(b,function(a){a.cancel()})},g.prototype.isFile=function(a){var b=e.File;return b&&a instanceof b},g.prototype.isFileLikeObject=function(a){return a instanceof g.FileLikeObject},g.prototype.isArrayLikeObject=function(b){return a.isObject(b)&&"length"in b},g.prototype.getIndexOfItem=function(b){return a.isNumber(b)?b:this.queue.indexOf(b)},g.prototype.getNotUploadedItems=function(){return this.queue.filter(function(a){return!a.isUploaded})},g.prototype.getReadyItems=function(){return this.queue.filter(function(a){return a.isReady&&!a.isUploading}).sort(function(a,b){return a.index-b.index})},g.prototype.destroy=function(){a.forEach(this._directives,function(b){a.forEach(this._directives[b],function(a){a.destroy()},this)},this)},g.prototype.onAfterAddingAll=function(){},g.prototype.onAfterAddingFile=function(){},g.prototype.onWhenAddingFileFailed=function(){},g.prototype.onBeforeUploadItem=function(){},g.prototype.onProgressItem=function(){},g.prototype.onProgressAll=function(){},g.prototype.onSuccessItem=function(){},g.prototype.onErrorItem=function(){},g.prototype.onCancelItem=function(){},g.prototype.onCompleteItem=function(){},g.prototype.onCompleteAll=function(){},g.prototype._getTotalProgress=function(a){if(this.removeAfterUpload)return a||0;var b=this.getNotUploadedItems().length,c=b?this.queue.length-b:this.queue.length,d=100/this.queue.length,e=(a||0)*d/100;return Math.round(c*d+e)},g.prototype._getFilters=function(b){if(a.isUndefined(b))return this.filters;if(a.isArray(b))return b;var c=b.match(/[^\s,]+/g);return this.filters.filter(function(a){return-1!==c.indexOf(a.name)},this)},g.prototype._render=function(){c.$$phase||c.$apply()},g.prototype._folderFilter=function(a){return!(!a.size&&!a.type)},g.prototype._queueLimitFilter=function(){return this.queue.length<this.queueLimit},g.prototype._isValidFile=function(a,b,c){return this._failFilterIndex=-1,b.length?b.every(function(b){return this._failFilterIndex++,b.fn.call(this,a,c)},this):!0},g.prototype._isSuccessCode=function(a){return a>=200&&300>a||304===a},g.prototype._transformResponse=function(b,c){var e=this._headersGetter(c);return a.forEach(d.defaults.transformResponse,function(a){b=a(b,e)}),b},g.prototype._parseHeaders=function(b){var c,d,e,f={};return b?(a.forEach(b.split("\n"),function(a){e=a.indexOf(":"),c=a.slice(0,e).trim().toLowerCase(),d=a.slice(e+1).trim(),c&&(f[c]=f[c]?f[c]+", "+d:d)}),f):f},g.prototype._headersGetter=function(a){return function(b){return b?a[b.toLowerCase()]||null:a}},g.prototype._xhrTransport=function(b){var c=b._xhr=new XMLHttpRequest,d=new FormData,e=this;e._onBeforeUploadItem(b),a.forEach(b.formData,function(b){a.forEach(b,function(a,b){d.append(b,a)})}),d.append(b.alias,b._file,b.file.name),c.upload.onprogress=function(a){var c=Math.round(a.lengthComputable?100*a.loaded/a.total:0);e._onProgressItem(b,c)},c.onload=function(){var a=e._parseHeaders(c.getAllResponseHeaders()),d=e._transformResponse(c.response,a),f=e._isSuccessCode(c.status)?"Success":"Error",g="_on"+f+"Item";e[g](b,d,c.status,a),e._onCompleteItem(b,d,c.status,a)},c.onerror=function(){var a=e._parseHeaders(c.getAllResponseHeaders()),d=e._transformResponse(c.response,a);e._onErrorItem(b,d,c.status,a),e._onCompleteItem(b,d,c.status,a)},c.onabort=function(){var a=e._parseHeaders(c.getAllResponseHeaders()),d=e._transformResponse(c.response,a);e._onCancelItem(b,d,c.status,a),e._onCompleteItem(b,d,c.status,a)},c.open(b.method,b.url,!0),c.withCredentials=b.withCredentials,a.forEach(b.headers,function(a,b){c.setRequestHeader(b,a)}),c.send(d),this._render()},g.prototype._iframeTransport=function(b){var c=a.element('<form style="display: none;" />'),d=a.element('<iframe name="iframeTransport'+Date.now()+'">'),e=b._input,f=this;b._form&&b._form.replaceWith(e),b._form=c,f._onBeforeUploadItem(b),e.prop("name",b.alias),a.forEach(b.formData,function(b){a.forEach(b,function(b,d){var e=a.element('<input type="hidden" name="'+d+'" />');e.val(b),c.append(e)})}),c.prop({action:b.url,method:"POST",target:d.prop("name"),enctype:"multipart/form-data",encoding:"multipart/form-data"}),d.bind("load",function(){try{var a=d[0].contentDocument.body.innerHTML}catch(c){}var e={response:a,status:200,dummy:!0},g={},h=f._transformResponse(e.response,g);f._onSuccessItem(b,h,e.status,g),f._onCompleteItem(b,h,e.status,g)}),c.abort=function(){var a,g={status:0,dummy:!0},h={};d.unbind("load").prop("src","javascript:false;"),c.replaceWith(e),f._onCancelItem(b,a,g.status,h),f._onCompleteItem(b,a,g.status,h)},e.after(c),c.append(e).append(d),c[0].submit(),this._render()},g.prototype._onWhenAddingFileFailed=function(a,b,c){this.onWhenAddingFileFailed(a,b,c)},g.prototype._onAfterAddingFile=function(a){this.onAfterAddingFile(a)},g.prototype._onAfterAddingAll=function(a){this.onAfterAddingAll(a)},g.prototype._onBeforeUploadItem=function(a){a._onBeforeUpload(),this.onBeforeUploadItem(a)},g.prototype._onProgressItem=function(a,b){var c=this._getTotalProgress(b);this.progress=c,a._onProgress(b),this.onProgressItem(a,b),this.onProgressAll(c),this._render()},g.prototype._onSuccessItem=function(a,b,c,d){a._onSuccess(b,c,d),this.onSuccessItem(a,b,c,d)},g.prototype._onErrorItem=function(a,b,c,d){a._onError(b,c,d),this.onErrorItem(a,b,c,d)},g.prototype._onCancelItem=function(a,b,c,d){a._onCancel(b,c,d),this.onCancelItem(a,b,c,d)},g.prototype._onCompleteItem=function(b,c,d,e){b._onComplete(c,d,e),this.onCompleteItem(b,c,d,e);var f=this.getReadyItems()[0];return this.isUploading=!1,a.isDefined(f)?(f.upload(),void 0):(this.onCompleteAll(),this.progress=this._getTotalProgress(),this._render(),void 0)},g.isFile=g.prototype.isFile,g.isFileLikeObject=g.prototype.isFileLikeObject,g.isArrayLikeObject=g.prototype.isArrayLikeObject,g.isHTML5=g.prototype.isHTML5,g.inherit=function(a,b){a.prototype=Object.create(b.prototype),a.prototype.constructor=a,a.super_=b},g.FileLikeObject=h,g.FileItem=i,g.FileDirective=j,g.FileSelect=k,g.FileDrop=l,g.FileOver=m,h.prototype._createFromFakePath=function(a){this.lastModifiedDate=null,this.size=null,this.type="like/"+a.slice(a.lastIndexOf(".")+1).toLowerCase(),this.name=a.slice(a.lastIndexOf("/")+a.lastIndexOf("\\")+2)},h.prototype._createFromObject=function(b){this.lastModifiedDate=a.copy(b.lastModifiedDate),this.size=b.size,this.type=b.type,this.name=b.name},i.prototype.upload=function(){this.uploader.uploadItem(this)},i.prototype.cancel=function(){this.uploader.cancelItem(this)},i.prototype.remove=function(){this.uploader.removeFromQueue(this)},i.prototype.onBeforeUpload=function(){},i.prototype.onProgress=function(){},i.prototype.onSuccess=function(){},i.prototype.onError=function(){},i.prototype.onCancel=function(){},i.prototype.onComplete=function(){},i.prototype._onBeforeUpload=function(){this.isReady=!0,this.isUploading=!0,this.isUploaded=!1,this.isSuccess=!1,this.isCancel=!1,this.isError=!1,this.progress=0,this.onBeforeUpload()},i.prototype._onProgress=function(a){this.progress=a,this.onProgress(a)},i.prototype._onSuccess=function(a,b,c){this.isReady=!1,this.isUploading=!1,this.isUploaded=!0,this.isSuccess=!0,this.isCancel=!1,this.isError=!1,this.progress=100,this.index=null,this.onSuccess(a,b,c)},i.prototype._onError=function(a,b,c){this.isReady=!1,this.isUploading=!1,this.isUploaded=!0,this.isSuccess=!1,this.isCancel=!1,this.isError=!0,this.progress=0,this.index=null,this.onError(a,b,c)},i.prototype._onCancel=function(a,b,c){this.isReady=!1,this.isUploading=!1,this.isUploaded=!1,this.isSuccess=!1,this.isCancel=!0,this.isError=!1,this.progress=0,this.index=null,this.onCancel(a,b,c)},i.prototype._onComplete=function(a,b,c){this.onComplete(a,b,c),this.removeAfterUpload&&this.remove()},i.prototype._destroy=function(){this._input&&this._input.remove(),this._form&&this._form.remove(),delete this._form,delete this._input},i.prototype._prepareToUploading=function(){this.index=this.index||++this.uploader._nextIndex,this.isReady=!0},i.prototype._replaceNode=function(a){var b=f(a.clone())(a.scope());b.prop("value",null),a.css("display","none"),a.after(b)},j.prototype.events={},j.prototype.bind=function(){for(var a in this.events){var b=this.events[a];this.element.bind(a,this[b])}},j.prototype.unbind=function(){for(var a in this.events)this.element.unbind(a,this.events[a])},j.prototype.destroy=function(){var a=this.uploader._directives[this.prop].indexOf(this);this.uploader._directives[this.prop].splice(a,1),this.unbind()},j.prototype._saveLinks=function(){for(var a in this.events){var b=this.events[a];this[b]=this[b].bind(this)}},g.inherit(k,j),k.prototype.events={$destroy:"destroy",change:"onChange"},k.prototype.prop="select",k.prototype.getOptions=function(){},k.prototype.getFilters=function(){},k.prototype.isEmptyAfterSelection=function(){return!!this.element.attr("multiple")},k.prototype.onChange=function(){var a=this.uploader.isHTML5?this.element[0].files:this.element[0],b=this.getOptions(),c=this.getFilters();this.uploader.isHTML5||this.destroy(),this.uploader.addToQueue(a,b,c),this.isEmptyAfterSelection()&&this.element.prop("value",null)},g.inherit(l,j),l.prototype.events={$destroy:"destroy",drop:"onDrop",dragover:"onDragOver",dragleave:"onDragLeave"},l.prototype.prop="drop",l.prototype.getOptions=function(){},l.prototype.getFilters=function(){},l.prototype.onDrop=function(b){var c=this._getTransfer(b);if(c){var d=this.getOptions(),e=this.getFilters();this._preventAndStop(b),a.forEach(this.uploader._directives.over,this._removeOverClass,this),this.uploader.addToQueue(c.files,d,e)}},l.prototype.onDragOver=function(b){var c=this._getTransfer(b);this._haveFiles(c.types)&&(c.dropEffect="copy",this._preventAndStop(b),a.forEach(this.uploader._directives.over,this._addOverClass,this))},l.prototype.onDragLeave=function(b){b.currentTarget===this.element[0]&&(this._preventAndStop(b),a.forEach(this.uploader._directives.over,this._removeOverClass,this))},l.prototype._getTransfer=function(a){return a.dataTransfer?a.dataTransfer:a.originalEvent.dataTransfer},l.prototype._preventAndStop=function(a){a.preventDefault(),a.stopPropagation()},l.prototype._haveFiles=function(a){return a?a.indexOf?-1!==a.indexOf("Files"):a.contains?a.contains("Files"):!1:!1},l.prototype._addOverClass=function(a){a.addOverClass()},l.prototype._removeOverClass=function(a){a.removeOverClass()},g.inherit(m,j),m.prototype.events={$destroy:"destroy"},m.prototype.prop="over",m.prototype.overClass="nv-file-over",m.prototype.addOverClass=function(){this.element.addClass(this.getOverClass())},m.prototype.removeOverClass=function(){this.element.removeClass(this.getOverClass())},m.prototype.getOverClass=function(){return this.overClass},g}]).directive("nvFileSelect",["$parse","FileUploader",function(a,b){return{link:function(c,d,e){var f=c.$eval(e.uploader);if(!(f instanceof b))throw new TypeError('"Uploader" must be an instance of FileUploader');var g=new b.FileSelect({uploader:f,element:d});g.getOptions=a(e.options).bind(g,c),g.getFilters=function(){return e.filters}}}}]).directive("nvFileDrop",["$parse","FileUploader",function(a,b){return{link:function(c,d,e){var f=c.$eval(e.uploader);if(!(f instanceof b))throw new TypeError('"Uploader" must be an instance of FileUploader');if(f.isHTML5){var g=new b.FileDrop({uploader:f,element:d});g.getOptions=a(e.options).bind(g,c),g.getFilters=function(){return e.filters}}}}}]).directive("nvFileOver",["FileUploader",function(a){return{link:function(b,c,d){var e=b.$eval(d.uploader);if(!(e instanceof a))throw new TypeError('"Uploader" must be an instance of FileUploader');var f=new a.FileOver({uploader:e,element:c});f.getOverClass=function(){return d.overClass||this.overClass}}}}]),b});
//# sourceMappingURL=angular-file-upload.min.map
},{}],6:[function(require,module,exports){
/* ng-infinite-scroll - v1.0.0 - 2013-02-23 */
var mod;mod=angular.module("infinite-scroll",[]),mod.directive("infiniteScroll",["$rootScope","$window","$timeout",function(i,n,e){return{link:function(t,l,o){var r,c,f,a;return n=angular.element(n),f=0,null!=o.infiniteScrollDistance&&t.$watch(o.infiniteScrollDistance,function(i){return f=parseInt(i,10)}),a=!0,r=!1,null!=o.infiniteScrollDisabled&&t.$watch(o.infiniteScrollDisabled,function(i){return a=!i,a&&r?(r=!1,c()):void 0}),c=function(){var e,c,u,d;return d=n.height()+n.scrollTop(),e=l.offset().top+l.height(),c=e-d,u=n.height()*f>=c,u&&a?i.$$phase?t.$eval(o.infiniteScroll):t.$apply(o.infiniteScroll):u?r=!0:void 0},n.on("scroll",c),t.$on("$destroy",function(){return n.off("scroll",c)}),e(function(){return o.infiniteScrollImmediateCheck?t.$eval(o.infiniteScrollImmediateCheck)?c():void 0:c()},0)}}}]);
},{}]},{},[4]);
