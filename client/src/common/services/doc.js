angular.module('service.doc', [])
  .factory('DocService', function() {
    var DocService = {};
    var doc = {
      url: ''
    };

    DocService.setUrl = function(url) { doc.url = url; }
    DocService.getUrl = function() { return doc.url; }

    return DocService;
  });
