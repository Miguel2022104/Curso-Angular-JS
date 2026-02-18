angular.module("FinalApp")

// Directiva: Mostrar fecha formateada
.directive("formatDate", function() {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            var date = new Date(attrs.formatDate);
            var options = { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            };
            element.text(date.toLocaleDateString('es-ES', options));
        }
    };
})

// Directiva: Contador de caracteres
.directive("charCounter", function() {
    return {
        restrict: "A",
        require: "ngModel",
        link: function(scope, element, attrs, ngModel) {
            var maxLength = parseInt(attrs.charCounter) || 500;
            var counterElement = angular.element('<div class="char-counter"></div>');
            element.after(counterElement);
            
            function updateCounter() {
                var length = ngModel.$viewValue ? ngModel.$viewValue.length : 0;
                var remaining = maxLength - length;
                counterElement.text(length + " / " + maxLength + " caracteres");
                
                if (remaining < 0) {
                    counterElement.css('color', 'red');
                } else if (remaining < 50) {
                    counterElement.css('color', 'orange');
                } else {
                    counterElement.css('color', 'green');
                }
            }
            
            ngModel.$viewChangeListeners.push(updateCounter);
            updateCounter();
        }
    };
})

// Directiva: Confirmar acción
.directive("confirmClick", function() {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            element.bind('click', function(e) {
                var message = attrs.confirmClick || "¿Estás seguro?";
                if (!confirm(message)) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                }
            });
        }
    };
})

// Directiva: Resaltar texto
.directive("highlight", function($timeout) {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            scope.$watch(attrs.highlight, function(newValue, oldValue) {
                if (newValue !== oldValue) {
                    element.addClass('highlight-animation');
                    $timeout(function() {
                        element.removeClass('highlight-animation');
                    }, 1000);
                }
            });
        }
    };
})

// Directiva: Validar contenido no vacío
.directive("notEmpty", function() {
    return {
        restrict: "A",
        require: "ngModel",
        link: function(scope, element, attrs, ngModel) {
            ngModel.$validators.notEmpty = function(modelValue, viewValue) {
                var value = modelValue || viewValue;
                return value && value.trim().length > 0;
            };
        }
    };
})

// Directiva: Auto-focus en elemento
.directive("autoFocus", function($timeout) {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            $timeout(function() {
                element[0].focus();
            }, parseInt(attrs.autoFocus) || 0);
        }
    };
})

// Directiva: Mostrar estadísticas en tarjeta
.directive("statsCard", function() {
    return {
        restrict: "E",
        scope: {
            title: "@",
            value: "@",
            icon: "@"
        },
        template: '<div class="stats-card">' +
                  '<div class="stats-icon">{{icon}}</div>' +
                  '<div class="stats-info">' +
                  '<div class="stats-title">{{title}}</div>' +
                  '<div class="stats-value">{{value}}</div>' +
                  '</div>' +
                  '</div>'
    };
})

// Directiva: Botón de like animado
.directive("likeButton", function() {
    return {
        restrict: "E",
        scope: {
            likes: "=",
            onLike: "&",
            onUnlike: "&"
        },
        template: '<div class="like-container">' +
                  '<button ng-click="like()" class="like-btn" ng-class="{\'liked\': hasLiked}">' +
                  '❤️ {{likes}}' +
                  '</button>' +
                  '<button ng-click="unlike()" class="unlike-btn" ng-if="hasLiked">👎</button>' +
                  '</div>',
        link: function(scope, element, attrs) {
            scope.hasLiked = false;
            
            scope.like = function() {
                scope.hasLiked = true;
                scope.onLike();
            };
            
            scope.unlike = function() {
                scope.hasLiked = false;
                scope.onUnlike();
            };
        }
    };
})

// Directiva: Truncar texto largo
.directive("truncate", function() {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            var maxLength = parseInt(attrs.truncate) || 100;
            var text = element.text();
            
            if (text.length > maxLength) {
                var truncated = text.substring(0, maxLength) + "...";
                element.text(truncated);
                element.attr("title", text);
            }
        }
    };
})

// Directiva: Mostrar tiempo transcurrido
.directive("timeAgo", function($interval) {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            var date = new Date(attrs.timeAgo);
            
            function updateTimeAgo() {
                var now = new Date();
                var diff = now - date;
                var seconds = Math.floor(diff / 1000);
                var minutes = Math.floor(seconds / 60);
                var hours = Math.floor(minutes / 60);
                var days = Math.floor(hours / 24);
                
                var text;
                if (days > 0) {
                    text = "hace " + days + " día" + (days > 1 ? "s" : "");
                } else if (hours > 0) {
                    text = "hace " + hours + " hora" + (hours > 1 ? "s" : "");
                } else if (minutes > 0) {
                    text = "hace " + minutes + " minuto" + (minutes > 1 ? "s" : "");
                } else {
                    text = "hace un momento";
                }
                
                element.text(text);
            }
            
            updateTimeAgo();
            var interval = $interval(updateTimeAgo, 60000); // Actualizar cada minuto
            
            scope.$on('$destroy', function() {
                $interval.cancel(interval);
            });
        }
    };
})

// Directiva: Copiar al portapapeles
.directive("copyToClipboard", function() {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            element.bind('click', function() {
                var text = attrs.copyToClipboard;
                var textarea = document.createElement('textarea');
                textarea.value = text;
                document.body.appendChild(textarea);
                textarea.select();
                
                try {
                    document.execCommand('copy');
                    alert('Texto copiado al portapapeles');
                } catch (err) {
                    alert('Error al copiar el texto');
                }
                
                document.body.removeChild(textarea);
            });
        }
    };
})

// Directiva: Scroll suave al elemento
.directive("smoothScroll", function($timeout) {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            element.bind('click', function() {
                var target = document.querySelector(attrs.smoothScroll);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        }
    };
});
