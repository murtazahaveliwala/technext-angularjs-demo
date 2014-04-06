var loginApp = angular.module('toDoApp', ['ngResource', 'ngRoute']);

loginApp.config(function($routeProvider) {
  $routeProvider.when('/login', {
     controller: 'LoginController',
     templateUrl: 'partials/Login.html'
  }).when('/welcome', {
     controller: 'ToDoController',
     templateUrl: 'partials/ToDo.html'
  }).otherwise({
      redirectTo: '/login'
  });

  //$locationProvider.html5mode(true);
});

loginApp.factory('userInfo', function() {
  var _username, _password;

  function _isLoginSuccessful(username, password) {
    return username === 'Murtaza' && password === 'password12#';
  }

  var _api = {
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
      _api.setUserCredentials(username, password);

      return loginValid;
    }
  };

  return _api;
});

loginApp.controller('LoginController', function($scope, $location, userInfo) {
  if (userInfo.isLoggedIn()) {
    $location.path('/welcome');
  }

  $scope.logInSuccess = false;
  $scope.login = function() {
    $scope.logInSuccess = userInfo.login($scope.username, $scope.password);
    if ($scope.logInSuccess) {
      userInfo.setUserCredentials($scope.username, $scope.password);
      $location.path('/welcome');
    }
  };

  $scope.reset = function() {
    $scope.username = '';
    $scope.password = '';
  };

  $scope.$watch('username + password', function() {
    $scope.logInSuccess = false;
  });
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
  }


  var todoList = [];
  $scope.editFlags = [];
  $scope.todoList = todoList;
  $scope.remaining = function() {
    var remainingCount = 0;
    todoList.forEach(function(todo, index) {
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
    todoList.forEach(function(todo, index, list) {
      if (todo.completed) {
        list.splice(index, 1);
      }
    });
    //$scope.$apply();
  };

  $scope.makeEditable = function(index, status) {
    $scope.editFlags[index] = status;
  };
});