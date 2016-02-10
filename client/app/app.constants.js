(function() {
  'use strict';

  var constants = {
    socket: {
      host: 'localhost:4000',
      channels: {
        sensors: {
          name: 'sensors:data',
          events: {
            update: 'sensor:update'
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
      'socket': constants.socket 
    });
})();
