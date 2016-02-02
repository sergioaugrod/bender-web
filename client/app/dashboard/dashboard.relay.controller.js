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

    $scope.status = '0';

    channel.on('relays:value', function(message) {
      $scope.status = message.value;

      $scope.$digest();
    });

    $scope.turn = function(status) {
      channel.push('relays:turn', {turn: status});
    };
  }
})();
