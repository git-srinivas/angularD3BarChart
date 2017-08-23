(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('MainController', ['$scope','$http','API_URL',MainController]);

    /** @ngInject */
    function MainController($scope,$http,API_URL) {
      var me = this;
      me.show = false;
      me.chartData = []
      me.getBarData = function(){
        $http({
            method: 'GET',
            url: API_URL
        }).then(function successCallback(response) {
            if(response)
                me.chartData = response.data;
          }, function errorCallback(response) {
              alert('No response from server')
          });
      }
      me.getBarData();
      $scope.$watch(angular.bind(this, function () {
        return me.chartData;
      }),
      function(value) {
          me.chartData = me.chartData;
       if(value.buttons){
          if(value.buttons.length>0)
              me.show = true;
       }

   });


    }
})();
