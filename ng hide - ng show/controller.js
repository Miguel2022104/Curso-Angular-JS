angular.module("MyFirstApp", ["ngAnimate"])
.controller("FirstController", function($scope, $http) {
    $scope.posts = [];
    $scope.loading = true;
    $http.get("https://jsonplaceholder.typicode.com/posts")
        .then(function(response) {
            console.log(response.data);
            $scope.posts = response.data;
            $scope.loading = false;
        })
        .catch(function(error) {
            console.log(error);
                $scope.loading = false;

        });
});
