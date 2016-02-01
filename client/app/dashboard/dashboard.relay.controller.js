(function () {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardRelayController', DashboardRelayController);

  DashboardRelayController.$inject = ['$scope', 'SocketService'];

  /* @ngInject */
  function DashboardRelayController($scope, SocketService) {
    var socket = SocketService.connect();
    var channel = SocketService.channel('relays:control');

    $scope.status = 'off';

    $scope.turn = function(status) {
      $scope.status = status;

      channel.push('relays:turn', {turn: status});
    };
  }
})();
