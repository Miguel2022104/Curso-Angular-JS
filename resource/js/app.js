angular.module("FinalApp", ["ngRoute"])
.config(function($routeProvider){
    $routeProvider
    .when("/", {
        controller: "MainController",
        templateUrl: "templates/home.html"
    })
    .when("/create", {
        controller: "CreateController",
        templateUrl: "templates/create.html"
    })
    .when("/post/:id", {
        controller: "PostController",
        templateUrl: "templates/post.html"
    })
    .when("/edit/:id", {
        controller: "EditController",
        templateUrl: "templates/edit.html"
    })
    .otherwise({
        redirectTo: "/"
    });
});
