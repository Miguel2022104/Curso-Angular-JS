angular.module("MyFirstApp", [])
    .run(function($rootScope) {
        $rootScope.nombre = "Prueba de RootScope";
    })
    .controller("FirstController", function($scope, $rootScope) {
        $scope.nombre = "PR";
    });