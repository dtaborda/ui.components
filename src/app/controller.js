'use strict';

angular.module('UIComponents')
    .controller('MainCtrl', ['$scope', function ($scope) {
        $scope.singleModel = 1;

        $scope.radioModel = 'Middle';

        $scope.checkModel = {
            left: false,
            middle: true,
            right: false
        };
  }]);
