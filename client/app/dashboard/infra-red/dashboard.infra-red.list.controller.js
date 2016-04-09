(function () {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardInfraRedListController', DashboardInfraRedListController);

  DashboardInfraRedListController.$inject = ['$scope', 'SocketService', 'InfraredService', 'Constants'];

  /* @ngInject */
  function DashboardInfraRedListController($scope, SocketService, InfraredService, Constants) {
    var constants = Constants.socket.channels;

    $scope.codes = [];
    $scope.infrareds = [];

    var socket = SocketService.connect();
    var channel = SocketService.channel(constants.infrared.name);

    var getInfrareds = function() {
      InfraredService.list().success(function(response){
        $scope.infrareds = response.data;
      }).error(function(response){
        console.log(response);
      });
    };

    $scope.send = function(codes) {
      (function channelPush (codes, i) {
        setTimeout(function () {
          channel.push(constants.infrared.events.sender, {code: codes[i-1]});
          if (--i) {
            channelPush(codes, i);
          }
        }, 3000);
      })(codes, codes.length);
    };

    $scope.destroy = function(id, index) {
      InfraredService.destroy(id).success(function(response){
        alert('Remoção efetuada com sucesso!');
        $scope.infrareds.splice(index, 1);
      }).error(function(response){
        console.log(response);
      });
    };

    getInfrareds();
  }
})();
