var app = angular.module('nestedTodoDirectiveDemo', []);

app.controller('SimpleTodoCtrl', ['$scope', function($scope) {
  $scope.todoList = [];

  $scope.add = function() {
    $scope.todoList.push({
      completed: false,
      'text': $scope.newTodo
    });
    $scope.newTodo = '';
  };

  $scope.remove = function(index) {
    $scope.todoList.splice(index, 1);
  };

  $scope.remaining = function() {
    var remainingCount = 0;
    $scope.todoList.forEach(function(todo, index) {
      if (!todo.completed) {
        remainingCount++;
      }
    });

    return remainingCount;
  };

  $scope.clearCompleted = function() {
    var incompleteTodoList = [];
    $scope.todoList.forEach(function(todo, index, list) {
      if (!todo.completed) {
        incompleteTodoList.push(todo);
      }
    });

    $scope.todoList = incompleteTodoList;
  };
}]);

app.directive('todos', function() {
  return {
    restrict: 'E',
    templateUrl: 'partials/nestedTodos.html',
    replace: true
  };
});

app.directive('todoText', function() {
  return {
    restrict: 'EA',
    template: '<span>{{ string }}</span>',
    replace: true,
    scope: {
      'string': '@text'
    }
  };
});