(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('MainController', ['$scope','$http','API_URL','ChartService',MainController]);

    /** @ngInject */
    function MainController($scope,$http,API_URL,ChartService) {
      var me = this;
      me.show = false;
      me.chartData = []
      ChartService.getData()
          .then(function(response){
              if(response)
                  me.chartData = response.data;
                  if(me.chartData.buttons){
                     if(me.chartData.buttons.length>0)
                         me.show = true;
                  }
            }).catch(function(error){
                console.log('error contacting server')
            })

    }
})();
