(function () {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardInfraRedController', DashboardInfraRedController);

  DashboardInfraRedController.$inject = ['$scope', 'SocketService'];

  /* @ngInject */
  function DashboardInfraRedController($scope, SocketService) {
    $scope.codes = [];

    var socket = SocketService.connect();
    var channel = SocketService.channel('infrared:control');

    channel.on('infrared:value', function(message) {
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

      code && channel.push('infrared:sender', {code: irCode});
    };

    $scope.removeCode = function(index) {
      code && $scope.codes.splice(index, 1);
    };
  }
})();
