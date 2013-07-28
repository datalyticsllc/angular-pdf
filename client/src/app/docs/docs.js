angular.module('document', [])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/document', {
      templateUrl:'docs/docs.tpl.html',
      controller:'DocumentCtrl'
    });
  }])

  .controller('DocumentCtrl', ['$scope', '$location', 'DocService',
    function ($scope, $location, DocService) {

    // store the document url in the service, so we don't have to pass it in a variable
    $scope.loadForm = function(url){

      DocService.setUrl(url);

      $location.path('/viewer-app'); // path not hash
    }

  }]);


