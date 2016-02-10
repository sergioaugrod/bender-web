(function () {
  'use strict';

  angular
    .module('app.services')
    .service('SocketService', SocketService);

  SocketService.$inject = ['$rootScope', 'Constants'];

  /* @ngInject */
  function SocketService ($rootScope, Constants) {
    var socket = null;
    var connected = false;
    var channels = {};

    var service = {
      connect: function() {
        var host = Constants.socket.host;

        if(!connected) {
          socket = new Phoenix.Socket('ws://'+ host +'/socket');
          socket.connect();
          connected = true;
        }

        return socket;
      },
      channel: function(topic) {
        var channel = null;

        if(connected && socket && !channels[topic]) {
          channel = socket.channel(topic);
          channel.join();
          channels[topic] = channel;
        } else if(channels[topic]) {
          return channels[topic];
        }

        return channel;
      },
      disconnect: function() {
        if(connected) {
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
