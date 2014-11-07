var http = require('http'),
    config = require('../config/config'),
    qs = require('querystring');
module.exports = {
    get: function (obj) {
        var options = {
                hostname: config.restHost,
                port: obj.port,
                path: obj.path + '?' + qs.stringify(obj.data),
                method: 'GET',
                headers: {
                    'X-Requested-clientId': config.clientId,
                    'X-Requested-userId': obj.userId
                }
            };
        http.request(options, function (response) {
            var body = '';
            response.setEncoding('utf8');
            response.on('data', function (data) {
                body += data;
            }).on('end', function () {
                obj.s(body);
            });
        }).on('error', function (e) {
            console.log('problem with request: ' + e.message);
        }).end();
    },

    post: function (obj) {
        var options = {
            hostname: config.restHost,
            port: obj.port,
            path: obj.path,
            method: 'POST',
            headers: {
                'X-Requested-clientId': config.clientId,
                'X-Requested-userId': obj.userId
            }
        };
        http.request(options, function (res) {
            res.setEncoding('utf8');
            res.on('data', function (data) {
                obj.s(data);
            });
        }).on('error', function (e) {
            console.log('problem with request: ' + e.message);
        }).end(qs.stringify(obj.data));
    }
};