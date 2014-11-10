// 定义promise对象
var Promise = function(){
    this.queue = [];
    this.isPromise = true;
};
// then 方法为promise/A 规范中的方法
Promise.prototype.then = function(successHandler, errorHandler, progressHandler){
    var hanlder = {};
    if (typeof successHandler == 'function'){
        hanlder.fulfilled =  successHandler;
    }
    if (typeof errorHandler === 'function'){
        hanlder.error =  errorHandler;
    }
    this.queue.push(hanlder);
    return this;
};

// 定义延迟对象
// 包含一个状态和一个promise对象
var Deferred = function(){
    this.promise = new Promise();
};
// 同时处理多个异步的情况
Deferred.prototype.all = function(promises){
    var count = promises.length;
    var that = this;
    var results = [];
    promises.forEach(function(promise, i){
        promise.then(function(data){
            count--;
            results[i] = data;
            // 如果执行玩了，则调用完成方法
            if(count == 0){
                that.resolve(results);
            }
        }, function(err){
            that.reject(err);
        });
    });
    return this.promise;
};
// 生成回调函数
Deferred.prototype.callback = function(){
    var that = this;
    return function(err, data){
        if(err){
            that.reject(err);
        }else{
            that.resolve(data);
        }
    };
};
Deferred.prototype.resolve = function(obj){
      var promise = this.promise;
      var handler;
      while((handler = promise.queue.shift())){
          if (handler && handler.fulfilled){
              var ret = handler.fulfilled(obj);
              if(ret && ret.isPromise){
                  ret.queue = promise.queue;
                  this.promise = ret;
                  return;
              }
          }
      }
};
Deferred.prototype.reject = function(err){
       var promise = this.promise;
       var handler;
       while((handler = promise.queue.shift())){
           if (handler && handler.error){
               var ret = handler.error(err);
               if(ret && ret.isPromise){
                   ret.queue = promise.queue;
                   this.promise = ret;
                   return;
               }
           }
       }
};

module.exports = Deferred;