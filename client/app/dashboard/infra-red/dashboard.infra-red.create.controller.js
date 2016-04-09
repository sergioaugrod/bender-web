(function () {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardInfraRedCreateController', DashboardInfraRedCreateController);

  DashboardInfraRedCreateController.$inject = ['$scope', 'SocketService', 'InfraredService', 'Constants'];

  /* @ngInject */
  function DashboardInfraRedCreateController($scope, SocketService, InfraredService, Constants) {
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

    $scope.addInfrared = function(description, codes) {
      InfraredService.create(description, codes);

      alert('Cadastro efetuado com sucesso!');
      cleanFields();
    };

    var cleanFields = function() {
      $scope.description = '';
      $scope.code = '';
      $scope.codes = [];
    };

    $scope.send = function(code) {
      code && channel.push(constants.infrared.events.sender, {code: code});
    };

    $scope.removeCode = function(index) {
      $scope.codes.splice(index, 1);
    };

    $scope.validateForm = function() {
      return !($scope.description && $scope.codes.length > 0);
    };
  }
})();
