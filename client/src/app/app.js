angular.module('app', [
  'document',
  'viewer',
  'service.doc',
  'templates.app',
  'templates.common'])

  .controller('AppCtrl', ['$scope', '$location', function ($scope, $location) {

    $location.path('/document'); // path not hash

    // handle the window height change, so the page container area is 100% the height
    $scope.getHeight = function() {
      return (window.innerHeight - 79) + 'px';       // take into account the fixed footer
    };

    $scope.getFullHeight = function() {
      return (window.innerHeight + 1);
    };

    $scope.$watch($scope.getHeight, function(newValue) {
      $scope.window_height = newValue;
    });

    $scope.$watch($scope.getFullHeight, function(newValue) {
      $scope.window_full_height = newValue;
    });

    window.onresize = function(){
      $scope.$apply();
    }

  }]);







