angular.module("ToDoList", ["LocalStorageModule"])
.factory("ToDoService", function(localStorageService) {
    var toDoService = {};  

    toDoService.key = "angular-todolist";
    if (localStorageService.get("ToDoService.key")) {
        toDoService.activities = localStorageService.get("ToDoService.key");
    }
    else {
         toDoService.activities = [];
    }
    toDoService.Add = function(newActv) {
        toDoService.activities.push(newActv);
    };
    toDoService.UpdateLocalStorage = function() {
        localStorageService.set("ToDoService.key", toDoService.activities);
    };
    toDoService.Clean = function() {
        toDoService.activities = [];
        toDoService.UpdateLocalStorage();
        return toDoService.GetAll();
    };
    toDoService.GetAll = function() {
        return toDoService.activities;
    };
    toDoService.RemoveItem = function(item) {
        toDoService.activities = toDoService.activities.filter(function(activity) {
            return activity !== item;
        });
        toDoService.UpdateLocalStorage();
        return toDoService.GetAll();
    };  
    /*
            [{Descripcion: "Terminar curso de AngularJS", fecha " "},{},{},{},{}] -> toDoService.activities;
        removeItem({Descripcion: "Terminar curso de AngularJS", fecha " "}) 
    */
    return toDoService;

})
.controller("ToDoController", function($scope, ToDoService) {
    
    /*
        {
            Descripcion: "Terminar curso de AngularJS",
            Fecha: "11/02/2025 5:00 PM"
        }
    
    */
    $scope.todo = ToDoService.GetAll();
    $scope.newActv = {};
    $scope.AddActv = function () {
        ToDoService.Add($scope.newActv);
        $scope.newActv = {};
    }
    $scope.removeItem = function (item) {
        $scope.todo = ToDoService.RemoveItem(item);
    }
    $scope.Clean = function() {
        $scope.todo = ToDoService.Clean();
    }
    
});