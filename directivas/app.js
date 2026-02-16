angular.module("CumstonDirective", [])
.directive("myRepos", function() {
    return {
        restrict: 'E', // 'E' indica que se usará como un Elemento HTML (<my-repos>)
        scope: {}, // Scope aislado para modularidad
        template: `
            <ul class="to-list">
                <li ng-repeat="repo in repos">
                    <img ng-src="{{repo.avatar_url}}" width="50">
                    <h1>{{repo.name}}</h1>
                </li>
            </ul>
        `,
        controller: function($scope, $http) {
            // La lógica que antes tenías en AppCtrl ahora vive aquí dentro
            $http.get("https://api.github.com/users/Miguel2022104/repos")
            .then(function(response){
                $scope.repos = response.data;
            })
            .catch(function(err){
                console.log(err);
            });
        }
    };
});