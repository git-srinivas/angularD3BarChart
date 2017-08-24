(function() {
  'use strict';

  angular
    .module('angularSeedApp')
    .factory('ChartService',['$q','$http','API_URL',ChartService]);

  /** @ngInject */
  function ChartService($q, $http,API_URL) {

    function getData(){
      var defered = $q.defer();
      $http({
          method: 'GET',
          url: API_URL
      }).then(function successCallback(response) {
          if(response)
               defered.resolve(response)
        }, function errorCallback(response) {
             defered.reject(response)
            alert('No response from server')
        });
        return defered.promise
    }
    return {
     getData : getData
    };
  }
})();
