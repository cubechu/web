require.config({
    baseUrl: "/js/",
    paths: {
        "jquery": "jquery",
        "angular": "angular",
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