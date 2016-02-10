(function () {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardRelayController', DashboardRelayController);

  DashboardRelayController.$inject = ['$scope', 'SocketService', 'Constants'];

  /* @ngInject */
  function DashboardRelayController($scope, SocketService, Constants) {
    var constants = Constants.socket.channels;

    var socket = SocketService.connect();
    var channel = SocketService.channel(constants.relays.name);

    $scope.status = '0';

    channel.on(constants.relays.events.value, function(message) {
      $scope.status = message.value;

      $scope.$digest();
    });

    $scope.turn = function(status) {
      channel.push(constants.relays.events.turn, {turn: status});
    };
  }
})();
