var app = angular.module('tabsDirectiveDemo', []);

app.directive('tabs', function() {
  return {
    restrict: 'E',
    templateUrl: 'tabsPartial.html',
    replace: true,
    transclude: true,
    scope: {},
    controller: function($scope) {
      var activeTab = null;
      $scope.tabsList = [];

      $scope.showMe = function(tab) {
        activeTab.selected = false;
        tab.selected = true;
        activeTab = tab;
      };

      this.add = function(tab) {
        tab.selected = false;
        $scope.tabsList.push(tab);
        if ($scope.tabsList.length === 1) {
          tab.selected = true;
          activeTab = tab;
        }
      }
    }
  };
});

app.directive('tab', function() {
  return {
    restrict: 'E',
    template: '<div ng-class="{\'active\': selected}" ng-show="selected" ng-transclude></div>',
    replace: true,
    transclude: true,
    scope: {
      title: '@'
    },
    require: '^tabs',
    link: function(scope, element, attrs, tabsController) {
      tabsController.add(scope);
    }
  };
});