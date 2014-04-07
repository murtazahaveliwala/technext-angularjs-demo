var loginApp = angular.module('toDoApp', ['ngRoute']);

loginApp.config(function($routeProvider) {
  $routeProvider.when('/login', {
     templateUrl: 'partials/Login.html',
    controller: 'LoginController'
  }).when('/welcome', {
     templateUrl: 'partials/Todo.html',
     controller: 'ToDoController'
  }).otherwise({
      redirectTo: '/login'
  });

  //$locationProvider.html5mode(true);
});

loginApp.controller('ToDoController', function($scope, $location) {

  $scope.logout = function() {
    $location.path('/login');
  };

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
    var incompleteTodoList = [];
    $scope.todoList.forEach(function(todo, index, list) {
      if (!todo.completed) {
        incompleteTodoList.push(todo);
      }
    });

    $scope.todoList = incompleteTodoList;
  };

  $scope.makeEditable = function(index, status) {
    $scope.editFlags[index] = status;
  };
});

loginApp.controller('LoginController', function($scope, $location) {

  var _validate = function(username, password) {
    return username === 'Murtaza' && password === 'somepassword';
  };

  $scope.login = function() {
    if (_validate($scope.username, $scope.password)) {
      $location.path('/welcome');
    } else {
      $scope.username = '';
      $scope.password = '';
      $scope.message = "Incorrect username or password!";
    }
  };

  $scope.reset = function() {
    $scope.username = '';
    $scope.password = '';
    $scope.message = "";
  };

});