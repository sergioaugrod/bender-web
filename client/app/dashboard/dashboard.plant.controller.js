(function () {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardPlantController', DashboardPlantController);

  DashboardPlantController.$inject = ['$rootScope', '$scope', 'SocketService', 'Constants'];

  /* @ngInject */
  function DashboardPlantController($rootScope, $scope, SocketService, Constants) {
    var constants = Constants.socket.channels;

    var socket = SocketService.connect();

    var channel = SocketService.channel(constants.plant.name);

    function formatPercent(luminosity) {
      return luminosity + '%';
    }

    function formatTemperature(temperature) {
      return temperature + ' °C';
    }

    channel.on(constants.sensors.events.update, function(message) {
      var sensor = message.topic.split("/")[1];

      if(sensor == 'temperature') {
        $rootScope.plant.temperature = formatTemperature(message.value);
      } else if(sensor == 'water') {
        $rootScope.plant.water = message.value;
      } else if(sensor == 'humidity') {
        $rootScope.plant.humidity = formatPercent(message.value);
      } else if(sensor == 'shower') {
        $rootScope.plant.shower = message.value;
      }

      $rootScope.$digest();
    });

    $scope.sendColor = function(color) {
      color && channel.push(constants.plant.events.sender, {color: color});
    };
  }
})();
