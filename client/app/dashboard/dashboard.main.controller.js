(function () {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardMainController', DashboardMainController);

  DashboardMainController.$inject = ['$rootScope', 'SocketService', 'Constants'];

  /* @ngInject */
  function DashboardMainController($rootScope, SocketService, Constants) {
    var constants = Constants.socket.channels;

    var socket = SocketService.connect();

    var channel = SocketService.channel(constants.sensors.name);
    var channelInfra = SocketService.channel(constants.infrared.name);

    function formatLuminosity(luminosity) {
      return luminosity + '%';
    }

    function formatTemperature(temperature) {
      return temperature + ' °C';
    }

    channel.on(constants.sensors.events.update, function(message) {
      var sensor = message.topic.split("/")[1];

      if(sensor == 'temperature') {
        $rootScope.sensors.temperature = formatTemperature(message.value);
      } else if(sensor == 'luminosity') {
        $rootScope.sensors.luminosity = formatLuminosity(message.value);
      }

      $rootScope.$digest();
    });

    channelInfra.on(constants.infrared.events.value, function(message) {
      $rootScope.sensors.infra = message.value;

      $rootScope.$digest();
    });
  }
})();
