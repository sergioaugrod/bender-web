(function () {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardMainController', DashboardMainController);

  DashboardMainController.$inject = ['$rootScope', 'SocketService'];

  /* @ngInject */
  function DashboardMainController($rootScope, SocketService) {
    var socket = SocketService.connect();
    var channel = SocketService.channel('sensors:data');

    channel.on('sensor:update', function(message) {
      var sensor = message.topic.split("/")[1];

      if(sensor == 'temperature') {
        $rootScope.sensors.temperature = message.value;
      } else if(sensor == 'luminosity') {
        $rootScope.sensors.luminosity = message.value;
      } else if(sensor == 'breathalyzer') {
        $rootScope.sensors.breathalyzer = message.value;
      }

      $rootScope.$digest();
    });
  }
})();
