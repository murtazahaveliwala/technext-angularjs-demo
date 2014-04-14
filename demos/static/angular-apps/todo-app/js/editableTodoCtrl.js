function EditableTodoCtrl($scope) {
  $scope.todoList = [];

  $scope.add = function() {
    $scope.todoList.push({
      completed: false,
      'text': $scope.newTodo,
      beingEdited: false
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

  $scope.makeEditable = function(todo, editable) {
    todo.beingEdited = editable;
  };
}