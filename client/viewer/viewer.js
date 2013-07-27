angular.module('viewer', [])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/viewer', {
      templateUrl:'viewer/viewer.html',
      controller:'ViewerCtrl'
    });
  }])

  .controller('ViewerCtrl', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {

    // TODO: replace the $rootScope.formUrl with a service model
    $scope.loadForm = function(url){
      $rootScope.formUrl = url;

      $location.path('/viewer-app'); // path not hash
    }

  }]);
