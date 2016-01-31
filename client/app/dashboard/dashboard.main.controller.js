(function () {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardMainController', DashboardMainController);

  DashboardMainController.$inject = ['$scope', 'SocketService'];

  /* @ngInject */
  function DashboardMainController($scope, SocketService) {
    //SocketService.connect();
  }
})();
