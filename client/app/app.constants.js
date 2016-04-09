(function() {
  'use strict';

  var constants = {
    api: {
      url: 'http://localhost:4000/api/',
      resources: {
        infrareds: 'infrareds/'
      }
    },
    socket: {
      host: 'localhost:4000',
      channels: {
        sensors: {
          name: 'sensors:data',
          events: {
            update: 'sensor:update'
          }
        },
        plant: {
          name: 'plant:control',
          events: {
            value: 'plant:value',
            sender: 'plant:sender'
          }
        },
        infrared: {
          name: 'infrared:control',
          events: {
            value: 'infrared:value',
            sender: 'infrared:sender'
          }
        },
        relays: {
          name: 'relays:control',
          events: {
            value: 'relays:value',
            turn: 'relays:turn'
          }
        }
      }
    }
  };

  angular.
    module('app.core')
    .constant('Constants', {
      'api': constants.api,
      'socket': constants.socket
    });
})();
