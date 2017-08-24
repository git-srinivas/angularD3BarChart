(function() {
    'use strict';

    describe('controllers', function() {

        beforeEach(module('angularSeedApp'));
        var $controller,vm;

          beforeEach(inject(function(_$controller_){
            // The injector unwraps the underscores (_) from around the parameter names when matching
            $controller = _$controller_;
          }));

          describe('MainController', function() {
            it('check if chartData is of type array', function() {
              var $scope = {};
              var controller = $controller('MainController', { $scope: $scope });
              vm = controller;
              expect(angular.isArray(vm.chartData)).toBeTruthy();
              expect(typeof(vm.show)=== 'boolean').toBeTruthy();
            });
          });
    });
})();
