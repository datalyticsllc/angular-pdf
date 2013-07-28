angular.module('viewer', [])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/viewer', {
      templateUrl:'viewer/viewer.tpl.html',
      controller:'ViewerCtrl'
    });
  }])

  .controller('ViewerCtrl', ['$scope', '$location', 'DocService', function ($scope, $location, DocService) {

    // Initialize the viewer and load Form from the DocService URL
    InitPDFViewer(DocService.getUrl());


  }]);
