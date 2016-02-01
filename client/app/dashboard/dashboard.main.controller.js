(function () {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardMainController', DashboardMainController);

  DashboardMainController.$inject = ['$scope', 'SocketService'];

  /* @ngInject */
  function DashboardMainController($scope, SocketService) {
    $scope.sensors = {
      temperature: 0,
      luminosity: 0,
      breathalyzer: 0
    };

    var socket = SocketService.connect();
    var channel = SocketService.channel('sensors:data');

    channel.on('sensor:update', function(message) {
      var sensor = message.topic.split("/")[1];

      if(sensor == 'temperature') {
        $scope.sensors.temperature = message.value;
      } else if(sensor == 'luminosity') {
        $scope.sensors.luminosity = message.value;
      } else if(sensor == 'breathalyzer') {
        $scope.sensors.breathalyzer = message.value;
      }
      $scope.$digest();
    });
  }
})();
