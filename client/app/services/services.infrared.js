(function () {
  'use strict';

  angular
    .module('app.services')
    .service('InfraredService', InfraredService);

  InfraredService.$inject = ['$http', 'Constants'];

  /* @ngInject */
  function InfraredService ($http, Constants) {
    var service = {};
    var api = Constants.api;

    service.create = function(description, codes) {
      return $http({
        method: 'POST',
        url: api.url + api.resources.infrareds,
        data: {
          infrared: {
            description: description,
            codes: codes
          }
        }
      });
    };

    service.destroy = function(id) {
      return $http({
        method: 'DELETE',
        url: api.url + api.resources.infrareds + id
      });
    };

    service.list = function() {
      return $http.get(api.url + api.resources.infrareds);
    };

    return service;
  }
})();
