(function () {
  'use strict';

  angular.module('app.dashboard', [
    'app.core',
    'app.services'
  ]);

  angular.module('app').run(Run);

  Run.$inject = ['$rootScope'];

  function Run($rootScope) {
    $rootScope.sensors = {
      temperature: 0,
      luminosity: 0,
      infra: 0
    };
  }
})();
