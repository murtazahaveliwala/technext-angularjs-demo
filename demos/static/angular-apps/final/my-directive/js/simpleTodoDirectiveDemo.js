var app = angular.module('simpleTodoDirectiveDemo', []);

app.controller('SimpleTodoCtrl', ['$scope', function($scope) {
  $scope.todoList = [];

  $scope.add = function() {
    console.log('adding', $scope.todoList, $scope.newTodo);
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
    console.log('remaining', $scope);
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
    templateUrl: 'partials/todos.html',
    replace: true
  };
});