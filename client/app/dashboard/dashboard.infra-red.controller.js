(function () {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardInfraRedController', DashboardInfraRedController);

  DashboardInfraRedController.$inject = ['$scope', 'SocketService', 'Constants'];

  /* @ngInject */
  function DashboardInfraRedController($scope, SocketService, Constants) {
    var constants = Constants.socket.channels;

    $scope.codes = [];

    var socket = SocketService.connect();
    var channel = SocketService.channel(constants.infrared.name);

    channel.on(constants.infrared.events.value, function(message) {
      $scope.code = message.value;

      $scope.$digest();
    });

    $scope.addCode = function(code) {
      if(code && $scope.codes.indexOf(code) == -1) {
        $scope.codes.push(code);
        $scope.code = '';
      }
    };

    $scope.send = function(code) {
      var irCode = 'IR|' + code;

      code && channel.push(constants.infrared.events.sender, {code: irCode});
    };

    $scope.removeCode = function(index) {
      code && $scope.codes.splice(index, 1);
    };
  }
})();
