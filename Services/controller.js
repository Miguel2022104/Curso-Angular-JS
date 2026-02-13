/*
    Aplicación ToDoList con AngularJS

    - Se utiliza un Service (ToDoService) para manejar la lógica de las actividades.
    - Las actividades se guardan en el navegador usando localStorage
      mediante la librería angular-local-storage.
    - Permite:
        ✔ Agregar actividades
        ✔ Eliminar actividades
        ✔ Limpiar toda la lista
        ✔ Mantener los datos aunque se recargue la página

*/

angular.module("ToDoList", ["LocalStorageModule"])

.factory("ToDoService", function(localStorageService) {

    var toDoService = {};
    toDoService.key = "angular-todolist";

    // Cargar datos desde localStorage
    if (localStorageService.get(toDoService.key)) {
        toDoService.activities = localStorageService.get(toDoService.key);
    } else {
        toDoService.activities = [];
    }

    // Agregar actividad
    toDoService.Add = function(newActv) {
        toDoService.activities.push(newActv);
        toDoService.UpdateLocalStorage();
    };

    // Guardar en localStorage
    toDoService.UpdateLocalStorage = function() {
        localStorageService.set(toDoService.key, toDoService.activities);
    };

    // Obtener todas
    toDoService.GetAll = function() {
        return toDoService.activities;
    };

    // Limpiar lista
    toDoService.Clean = function() {
        toDoService.activities = [];
        toDoService.UpdateLocalStorage();
        return toDoService.activities;
    };

    // Eliminar actividad
    toDoService.RemoveItem = function(item) {
        toDoService.activities = toDoService.activities.filter(function(activity) {
            return activity !== item;
        });
        toDoService.UpdateLocalStorage();
        return toDoService.activities;
    };

    return toDoService;
})

.controller("ToDoController", function($scope, ToDoService) {

    $scope.todo = ToDoService.GetAll();
    $scope.newActv = {};

    $scope.AddActv = function () {
        ToDoService.Add($scope.newActv);
        $scope.newActv = {};
    };

    $scope.removeItem = function (item) {
        $scope.todo = ToDoService.RemoveItem(item);
    };

    $scope.Clean = function() {
        $scope.todo = ToDoService.Clean();
    };

});
