angular.module("FinalApp")
.factory("PostService", function() {
    var posts = [
        {
            id: 1,
            title: "Bienvenido a Posts App",
            content: "Esta es una aplicación de ejemplo creada con AngularJS. Puedes crear, ver y eliminar posts.",
            author: "Admin",
            date: new Date(),
            likes: 5
        },
        {
            id: 2,
            title: "AngularJS es genial",
            content: "AngularJS nos permite crear aplicaciones web dinámicas de manera sencilla con su sistema de data binding bidireccional.",
            author: "Developer",
            date: new Date(),
            likes: 10
        },
        {
            id: 3,
            title: "Prueba de post numero 3",
            content: "Este es un post de prueba para verificar que todo funciona correctamente",
            author: "User",
            date: new Date(),
            likes: 100

        },
        {
            id: 4,
            title: "Prueba de post numero 4",
            content: "Este es un post de prueba para verificar que todo funciona correctamente",
            author: "User",
            date: new Date(),
            likes: 100

        },
        {
            id: 5,
            title: "Prueba de post numero 5",
            content: "Este es un post de prueba para verificar que todo funciona correctamente",
            author: "User",
            date: new Date(),
            likes: 100

        }

    
    ];
    
    var nextId = 3;
    
    return {
        getPosts: function() {
            return posts;
        },
        
        getPost: function(id) {
            for (var i = 0; i < posts.length; i++) {
                if (posts[i].id == id) {
                    return posts[i];
                }
            }
            return null;
        },
        
        addPost: function(post) {
            post.id = nextId++;
            post.date = new Date();
            post.likes = 0;
            posts.unshift(post);
            return post;
        },
        
        deletePost: function(id) {
            for (var i = 0; i < posts.length; i++) {
                if (posts[i].id == id) {
                    posts.splice(i, 1);
                    return true;
                }
            }
            return false;
        },
        
        likePost: function(id) {
            var post = this.getPost(id);
            if (post) {
                post.likes++;
                return post.likes;
            }
            return 0;
        },
        
        updatePost: function(id, updatedData) {
            var post = this.getPost(id);
            if (post) {
                post.title = updatedData.title;
                post.content = updatedData.content;
                post.author = updatedData.author;
                return post;
            }
            return null;
        }
    };
});
