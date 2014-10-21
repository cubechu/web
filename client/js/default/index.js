require.config({
    paths: {
        "jquery": "/js/public/jquery.min",
        "angular": "/js/public/angular.min",
        "app": "/js/default/default",
        "io": "/socket.io/socket.io"
    },
    shim: {
        "angular": {
            exports: "angular"
        }
    }
});
require(["app", "jquery", "angular", "io"], function (app, $, angular, io) {
    $(function () {
        angular.bootstrap(document, ["app"]);
    });
});