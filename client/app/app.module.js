(function() {
  'use strict';

  angular.module('app', [
    'app.services',
    'app.dashboard'
  ]);

  angular.module('app.core', [
    'ngRoute',
    'ngAnimate'
  ]);

  angular.module('app').run(Run);

  Run.$inject = ['$rootScope'];

  function Run($rootScope) {
  }
})();
