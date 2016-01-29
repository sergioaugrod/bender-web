(function () {
  'use strict';

  angular
    .module('app.dashboard')
    .config(route);

  function route($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/dashboard/dashboard.main.html',
        controller: 'DashboardMainController'
      })
      .when('/relay', {
        templateUrl: 'app/dashboard/dashboard.relay.html',
        controller: 'DashboardRelayController'
      })
      .when('/infra-red', {
        templateUrl: 'app/dashboard/dashboard.infra-red.html',
        controller: 'DashboardInfraRedController'
      })
    .otherwise({
      redirectTo: '/'
    });
  }
})();
