angular.module("ToDoList", ["LocalStorageModule"])
.controller("ToDoController", function($scope, localStorageService) {
    if (localStorageService.get("angular-todolist")) {
        $scope.todo = localStorageService.get("angular-todolist");
    }
    else {
        $scope.todo = [];
    }
    /*
        {
            Descripcion: "Terminar curso de AngularJS",
            Fecha: "11/02/2025 5:00 PM"
        }
    
    */
    $scope.$watchCollection("todo", function(newValue, oldValue){
        localStorageService.set("angular-todolist", $scope.todo);
    });
    $scope.AddActv = function () {
        $scope.todo.push($scope.newActv);
        $scope.newActv = {};
       
    }
    $scope.clean = function () {
        $scope.todo = [];
        
    }

});