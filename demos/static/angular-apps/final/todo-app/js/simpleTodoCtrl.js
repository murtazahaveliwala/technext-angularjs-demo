function SimpleTodoCtrl($scope) {
  $scope.editFlags = [];
  $scope.todoList = [];
  $scope.remaining = function() {
    var remainingCount = 0;
    $scope.todoList.forEach(function(todo, index) {
      if (!todo.completed) {
        remainingCount++;
      }
    });

    return remainingCount;
  };
  $scope.add = function() {
    $scope.todoList.push({
      completed: false,
      'text': $scope.newTodo
    });
    $scope.newTodo = '';
    $scope.editFlags.push(false);
  }

  $scope.remove = function(index) {
    $scope.todoList.splice(index, 1);
  };

  $scope.clearCompleted = function() {
    $scope.todoList.forEach(function(todo, index, list) {
      if (todo.completed) {
        list.splice(index, 1);
      }
    });
    //$scope.$apply();
  };

  $scope.makeEditable = function(index, status) {
    $scope.editFlags[index] = status;
  };
}