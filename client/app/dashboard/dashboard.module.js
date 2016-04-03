(function () {
  'use strict';

  angular.module('app.dashboard', [
    'app.core',
    'app.services',
    'colorpicker.module'
  ]);

  angular.module('app').run(Run);

  Run.$inject = ['$rootScope'];

  function Run($rootScope) {
    $rootScope.sensors = {
      temperature: '0 °C',
      luminosity: '0%',
      humidity: '0%',
      infra: '0',
    };

    $rootScope.plant = {
      temperature: '0 °C',
      humidity: '0%',
      shower: 'Não',
      water: 'Não'
    };
  }
})();
