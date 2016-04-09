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
      .when('/infra-red/create', {
        templateUrl: 'app/dashboard/infra-red/dashboard.infra-red.create.html',
        controller: 'DashboardInfraRedCreateController'
      })
      .when('/infra-red/list', {
        templateUrl: 'app/dashboard/infra-red/dashboard.infra-red.list.html',
        controller: 'DashboardInfraRedListController'
      })
      .when('/plant', {
        templateUrl: 'app/dashboard/dashboard.plant.html',
        controller: 'DashboardPlantController'
      })
    .otherwise({
      redirectTo: '/'
    });
  }
})();
