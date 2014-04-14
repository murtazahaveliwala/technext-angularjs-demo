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

loginApp.factory('loginService', function($http, $q) {
  var _username, _password, _nickname;

  return {
    getUserCredentials: function() {
      return {
        username: _username,
        password: _password,
        nickname: _nickname
      }
    },

    setUserCredentials: function(username, password, nickname) {
      _username = username;
      _password = password;
      _nickname = nickname;
    },

    isLoggedIn: function() {
      return _username && _password;
    },

    login: function(username, password) {
      var currentUserCredentials = this.getUserCredentials(),
          loginPromise = $q.defer();

      if(!username || !password) {
        loginPromise.reject({
          'message': "Please provide a username and a password!",
          'status': status
        });
      } else if (currentUserCredentials.username === username &&
          currentUserCredentials.password === password) {
        loginPromise.resolve(currentUserCredentials);
      } else {
        var validatePromise = $http.get('/validate', {
          params:{
            'username': username,
            'password': password
          }
        }),
            self = this;

        // set credentials when request is successful
        validatePromise.success(function(data, status) {
          if (!data.error && (status === 200 || status === 209)) {
            self.setUserCredentials(username, password, data.nickname);
            loginPromise.resolve(self.getUserCredentials());
          } else {
            loginPromise.reject({
              'error': data.error,
              'message': data.message,
              'status': status
            });
          };
        }).
        error(function(data, status, headers, config) {
            loginPromise.reject({
              'error': data ? data.error : null,
              'message': data? data.message : null,
              'status': status
            });
        });
      }

      // return a promise
      return loginPromise;
    }
  };

});

loginApp.controller('ToDoController', function($scope, loginService, $location) {
  if (!loginService.isLoggedIn()) {
    $location.path('/login');
  }

  var userCredentials = loginService.getUserCredentials();
  $scope.nickname = userCredentials.nickname;

  $scope.logout = function() {
    loginService.setUserCredentials();
    $location.path('/login');
  };


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
});

loginApp.controller('LoginController', function($scope, $location, loginService) {

  // Handle if already logged-in
  if (loginService.isLoggedIn()) {
    $location.path('/welcome');
  }

  $scope.login = function() {
    $scope.buttonsDisabled = true;

    function _doOnFailedLogin(message) {
      $scope.username = '';
      $scope.password = '';
      $scope.message = message || "Login failed! Please try again later.";
      $scope.buttonsDisabled = false;
    }
    function _doOnSuccessfulLogin() {
      $scope.buttonsDisabled = false;
      $location.path('/welcome');
    }

    var loginPromise = loginService.
        login($scope.username, $scope.password).promise;

    loginPromise.then(function(loginResolutionData) {
      _doOnSuccessfulLogin();
    }, function(loginResolutionData) {
      _doOnFailedLogin(loginResolutionData.message);
    });
  };

  $scope.reset = function() {
    $scope.username = '';
    $scope.password = '';
    $scope.message = "";
  };

});