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
    var channelInfra = SocketService.channel('infrared:control');

    function formatLuminosity(luminosity) {
      var scale = (luminosity / 1023 * 100).toPrecision(3);

      return scale + "%";
    }

    function formatTemperature(temperature) {
      return temperature + " °C";
    }

    channel.on('sensor:update', function(message) {
      var sensor = message.topic.split("/")[1];

      if(sensor == 'temperature') {
        $rootScope.sensors.temperature = formatTemperature(message.value);
      } else if(sensor == 'luminosity') {
        $rootScope.sensors.luminosity = formatLuminosity(message.value);
      }

      $rootScope.$digest();
    });

    channelInfra.on('infrared:value', function(message) {
      $rootScope.sensors.infra = message.value;

      $rootScope.$digest();
    });
  }
})();
