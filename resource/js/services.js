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
        },
        
        // Nueva función: Quitar like de un post
        unlikePost: function(id) {
            var post = this.getPost(id);
            if (post && post.likes > 0) {
                post.likes--;
                return post.likes;
            }
            return 0;
        },
        
        // Nueva función: Buscar posts por título o contenido
        searchPosts: function(query) {
            if (!query) {
                return posts;
            }
            query = query.toLowerCase();
            return posts.filter(function(post) {
                return post.title.toLowerCase().indexOf(query) !== -1 || 
                       post.content.toLowerCase().indexOf(query) !== -1;
            });
        },
        
        // Nueva función: Obtener posts por autor
        getPostsByAuthor: function(author) {
            if (!author) {
                return posts;
            }
            return posts.filter(function(post) {
                return post.author.toLowerCase() === author.toLowerCase();
            });
        },
        
        // Nueva función: Ordenar posts
        sortPosts: function(criteria) {
            var sortedPosts = angular.copy(posts);
            switch(criteria) {
                case 'likes':
                    sortedPosts.sort(function(a, b) { return b.likes - a.likes; });
                    break;
                case 'date':
                    sortedPosts.sort(function(a, b) { return b.date - a.date; });
                    break;
                case 'title':
                    sortedPosts.sort(function(a, b) { 
                        return a.title.localeCompare(b.title); 
                    });
                    break;
                case 'author':
                    sortedPosts.sort(function(a, b) { 
                        return a.author.localeCompare(b.author); 
                    });
                    break;
                default:
                    return sortedPosts;
            }
            return sortedPosts;
        },
        
        // Nueva función: Obtener estadísticas de posts
        getStatistics: function() {
            var totalLikes = 0;
            var authors = {};
            
            posts.forEach(function(post) {
                totalLikes += post.likes;
                authors[post.author] = (authors[post.author] || 0) + 1;
            });
            
            return {
                totalPosts: posts.length,
                totalLikes: totalLikes,
                averageLikes: posts.length > 0 ? (totalLikes / posts.length).toFixed(1) : 0,
                uniqueAuthors: Object.keys(authors).length,
                postsByAuthor: authors,
                mostPopularPost: this.getMostPopularPost(),
                recentPost: posts.length > 0 ? posts[0] : null
            };
        },
        
        // Nueva función: Obtener el post más popular
        getMostPopularPost: function() {
            if (posts.length === 0) return null;
            var mostPopular = posts[0];
            posts.forEach(function(post) {
                if (post.likes > mostPopular.likes) {
                    mostPopular = post;
                }
            });
            return mostPopular;
        },
        
        // Nueva función: Obtener posts recientes (últimos N posts)
        getRecentPosts: function(limit) {
            limit = limit || 5;
            var sortedByDate = angular.copy(posts);
            sortedByDate.sort(function(a, b) { return b.date - a.date; });
            return sortedByDate.slice(0, limit);
        },
        
        // Nueva función: Contar posts por autor
        countPostsByAuthor: function() {
            var authorCount = {};
            posts.forEach(function(post) {
                authorCount[post.author] = (authorCount[post.author] || 0) + 1;
            });
            return authorCount;
        },
        
        // Nueva función: Verificar si un post existe
        postExists: function(id) {
            return this.getPost(id) !== null;
        },
        
        // Nueva función: Obtener total de likes
        getTotalLikes: function() {
            return posts.reduce(function(total, post) {
                return total + post.likes;
            }, 0);
        },
        
        // Nueva función: Duplicar un post
        duplicatePost: function(id) {
            var originalPost = this.getPost(id);
            if (originalPost) {
                var duplicatedPost = {
                    id: nextId++,
                    title: originalPost.title + " (Copia)",
                    content: originalPost.content,
                    author: originalPost.author,
                    date: new Date(),
                    likes: 0
                };
                posts.unshift(duplicatedPost);
                return duplicatedPost;
            }
            return null;
        }
    };
});
