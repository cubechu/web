require.config({
    paths: {
        "jquery": "/js/public/jquery.min",
        "angular": "/js/public/angular",
        "bootStrap": "/js/public/bootstrap.min",
        "angularFileUpload": "/js/public/angular-file-upload.min",
        "app": "/js/default/default",
        "io": "/socket.io/socket.io"
    },
    shim: {
        "angular": {
            exports: "angular"
        }
    }
});
require(["app", "jquery", "angular"], function (app, $, angular) {
    $(function () {
        angular.bootstrap(document, ["app"]);
    });
});