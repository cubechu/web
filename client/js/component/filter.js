var utils = require("../lib/public/utils");
var smileys = require("../component/smileys");
var mod = angular.module('filter', []);

mod.filter('f_msgContent', ['$sce', function ($sce) {
    var smileyHashMap = {};
    return function (text) {
        var str = text;
        var reg = utils.reg.link;
        str = str.replace(reg, '<a target=\"_blank\" href=\" $& \">$&</a>');   //将链接文本自动解析为URL
        str = str.replace(/\[([^\[\]]+)\]/g, function (all, text) {
            var pkg = smileys[0].content;
            if (smileyHashMap[text]) {
                return $sce.trustAsHtml(smileyHashMap[text]);
            }
            for (var j = 0, jj = pkg.length; j < jj; j++) {
                var pkgItem = pkg[j];
                if (text === pkgItem[0]) {
                    return $sce.trustAsHtml(smileyHashMap[text] = '<img src="../../img/smiley/' + pkgItem[1] + '" title="' + pkgItem[0].replace('xl:', '') + ' "alt="[' + pkgItem[0] + ']" />');
                }
            }

            return $sce.trustAsHtml(all);
        });
        return $sce.trustAsHtml(str);
    };
}]);
