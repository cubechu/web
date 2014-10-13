require.config({
    baseUrl: "/script/",
    paths: {
        "jquery": "jquery.min",
        "angular": "angular.min",
        "app": "default/default"
    },
    shim: {
        "angular": {
            exports: "angular"
        }
    }
});
require(["app", "jquery", "angular"], function(app, $, angular){
    $(function(){
        angular.bootstrap(document, ["app"]);
    });
});