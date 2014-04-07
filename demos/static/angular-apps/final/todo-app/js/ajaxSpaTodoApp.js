var loginApp = angular.module('toDoApp', ['ngResource', 'ngRoute']);

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

loginApp.factory('userInfo', function() {
  var _username, _password;

  function _isLoginSuccessful(username, password) {
    return username === 'Murtaza' && password === 'somepassword';
  }

  return {
    getUserCredentials: function() {
      return {
        username: _username,
        password: _password
      }
    },

    setUserCredentials: function(username, password) {
      _username = username;
      _password = password;
    },

    isLoggedIn: function() {
      return _username && _password;
    },

    login: function(username, password) {
      var loginValid = _isLoginSuccessful(username, password);
      this.setUserCredentials(username, password);

      return loginValid;
    }
  };

});

loginApp.controller('ToDoController', function($scope, userInfo, $location) {
  if (!userInfo.isLoggedIn()) {
    $location.path('/login');
  }

  var userCredentials = userInfo.getUserCredentials();
  $scope.username = userCredentials.username;
  $scope.password = userCredentials.password;

  $scope.logout = function() {
    userInfo.setUserCredentials();
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

loginApp.controller('LoginController', function($scope, $location, userInfo) {
  var _validate = function(username, password) {
    return userInfo.login(username, password);
  };

  // Handle if already logged-in
  if (userInfo.isLoggedIn()) {
    $location.path('/welcome');
  }

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