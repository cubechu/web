var http = require('http'),
    config = require('../config/config'),
    Deferred = require('./async'),
    qs = require('querystring');
module.exports = function (obj) {
    var options = {
        hostname: config.restHost,
        port: obj.port,
        path: obj.path + '?' + qs.stringify(obj.data),
        method: obj.method || 'GET',
        headers: {
            'X-Requested-clientId': config.clientId,
            'X-Requested-userId': obj.userId
        }
    };
    var deferred = new Deferred();
    var req = http.request(options, function (res) {
        var chunks = [], size = 0;
        res.on('data', function (chunk) {
            chunks.push(chunk);
            size += chunk.length;
        }).on('end', function () {
            deferred.resolve(Buffer.concat(chunks, size).toString());
        });
    });
    req.on('error', function (err) {
        console.log('problem with request: ' + err.message);
        deferred.reject(err.message);
    });
    if (obj.method == 'POST') {
        req.write(qs.stringify(obj.data));
    }
    req.end();
    return deferred.promise;
};