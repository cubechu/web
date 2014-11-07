require.config({
    paths: {
        "jquery": "/js/public/jquery.min",
        "angular": "/js/public/angular",
        "bootStrap": "/js/public/bootstrap.min",
        "angularFileUpload": "/js/public/angular-file-upload.min",
        "app": "/js/default/default",
        "io": "/socket.io/socket.io",
        "fileUpload": "/js/component/fileUpload",
        "socketFactory": "/js/component/socketFactory"
    },
    shim: {
        "angular": {
            exports: "angular"
        }
    }
});
require(["app", "jquery", "angular", "bootStrap"], function (app, $, angular) {
    $(function () {
        angular.bootstrap(document, ["app"]);
    });
});