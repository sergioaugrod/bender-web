(function () {
  'use strict';

  angular
    .module('app.services')
    .service('SocketService', SocketService);

  SocketService.$inject = ['$rootScope'];

  /* @ngInject */
  function SocketService ($rootScope) {
    var socket = null;
    var channel = null;
    var connected = false;

    var service = {
      connect: function() {
        socket = new Phoenix.Socket('ws://localhost:4000/socket');
        channel = socket.channel('arduino:messages');
        connected = true;
      },
      disconnect: function() {
        socket.disconnect();
        connected = false;
        socket = null;
        channel = null;
      },
      connected: function() {
        return connected;
      },
      on: function(eventName, callback) {
        if(socket) {                    
          channel.on(eventName, function(data) {
            $rootScope.$apply(function() {
              callback.apply(socket, data);
            });
          });
        }
      },
      emit: function(eventName, data) {
        if(socket) {
          channel.push(eventName, data);
        }
      },
      getSocket: function() {
        return socket;
      }
    };

    return service;
  }
})();
