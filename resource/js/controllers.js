angular.module("FinalApp")
.controller("MainController", function($scope, PostService) {
    $scope.posts = PostService.getPosts();
    
    $scope.deletePost = function(id) {
        if (confirm("¿Estás seguro de eliminar este post?")) {
            PostService.deletePost(id);
            $scope.posts = PostService.getPosts();
        }
    };
    
    $scope.likePost = function(id) {
        PostService.likePost(id);
    };
})

.controller("CreateController", function($scope, $location, PostService) {
    $scope.newPost = {
        title: "",
        content: "",
        author: ""
    };
    
    $scope.createPost = function() {
        if ($scope.newPost.title && $scope.newPost.content && $scope.newPost.author) {
            PostService.addPost(angular.copy($scope.newPost));
            $location.path("/");
        } else {
            alert("Por favor completa todos los campos");
        }
    };
    
    $scope.cancel = function() {
        $location.path("/");
    };
})

.controller("PostController", function($scope, $routeParams, $location, PostService) {
    $scope.post = PostService.getPost($routeParams.id);
    
    if (!$scope.post) {
        $location.path("/");
    }
    
    $scope.likePost = function() {
        PostService.likePost($scope.post.id);
    };
    
    $scope.deletePost = function() {
        if (confirm("¿Estás seguro de eliminar este post?")) {
            PostService.deletePost($scope.post.id);
            $location.path("/");
        }
    };
    
    $scope.goBack = function() {
        $location.path("/");
    };
    
    $scope.editPost = function() {
        $location.path("/edit/" + $scope.post.id);
    };
})

.controller("EditController", function($scope, $routeParams, $location, PostService) {
    var originalPost = PostService.getPost($routeParams.id);
    
    if (!originalPost) {
        $location.path("/");
        return;
    }
    
    $scope.editPost = {
        title: originalPost.title,
        content: originalPost.content,
        author: originalPost.author
    };
    
    $scope.savePost = function() {
        if ($scope.editPost.title && $scope.editPost.content && $scope.editPost.author) {
            PostService.updatePost($routeParams.id, $scope.editPost);
            $location.path("/post/" + $routeParams.id);
        } else {
            alert("Por favor completa todos los campos");
        }
    };
    
    $scope.cancel = function() {
        $location.path("/post/" + $routeParams.id);
    };
});
