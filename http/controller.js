angular.module('myApp', [])
    .controller('FirstController', function($scope, $http) {
        $scope.posts = [];
        $scope.newPost = {};
        $http.get('https://jsonplaceholder.typicode.com/posts')
        .then(function(response) {
            console.log(response.data);
            $scope.posts = response.data;
        })
        .catch(function(err) {
            console.error('Error fetching data:', err);
        });
        $scope.addPost = function() {
            $http.post('https://jsonplaceholder.typicode.com/posts', {
                title: $scope.newPost.title,
                body: $scope.newPost.body,
                userId: 1
            })                 
            .then(function(response) {
                $scope.posts.push(response.data);
                $scope.newPost = {};
            })
            .catch(function(err) {
                console.log('Error al enviar los datos:', err);
            });
        }

    
});