require.config({
    baseUrl: "/js/",
    paths: {
        "jquery": "public/jquery.min",
        "angular": "public/angular.min",
        "app": "default/default"
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