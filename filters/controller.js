angular.module("mainModule", [])

.filter("estadoPedido", function () {
    return function (codigo) {
        switch (codigo) {
            case "P":
                return "Pendiente ⏳";
            case "E":
                return "Enviado 🚚";
            case "C":
                return "Cancelado ❌";
            default:
                return "Desconocido";
        }
    };
})

.controller("ordersController", function ($scope) {

    $scope.pedidos = [
        { id: 101, estado: "P" },
        { id: 102, estado: "E" },
        { id: 103, estado: "C" },
        { id: 104, estado: "X" }
    ];

});
