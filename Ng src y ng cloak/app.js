angular.module("CumstonDirective",[])
.controller("AppCtrl", function($scope, $http){
    $http.get("https://api.github.com/users/Miguel2022104/repos")
    .then(function(response){
        $scope.repos = response.data;
    })
    .catch(function(err){
        console.log(err);
    });
});
