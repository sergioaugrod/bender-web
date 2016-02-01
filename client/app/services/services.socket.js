(function () {
  'use strict';

  angular
    .module('app.services')
    .service('SocketService', SocketService);

  SocketService.$inject = ['$rootScope'];

  /* @ngInject */
  function SocketService ($rootScope) {
    var socket = null;
    var connected = false;

    var service = {
      connect: function(url) {
        var url = url || 'localhost:4000';

        if (!connected) {
          socket = new Phoenix.Socket('ws://'+ url +'/socket');
          socket.connect();
          connected = true;
        }

        return socket;
      },
      channel: function(topic) {
        var channel = null;

        if (connected && socket) {
          channel = socket.channel(topic);
          channel.join();
        }

        return channel;
      },
      disconnect: function() {
        if (connected) {
          socket.disconnect();
          connected = false;
          socket = null;
        }
      },
      connected: function() {
        return connected;
      }
    };

    return service;
  }
})();
