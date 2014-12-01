'use strict';

angular.module('UIComponents')
    .controller('ButtonsCtrl',['$scope', function($scope){
        /*Buttons*/
        $scope.singleModel = 1;

        $scope.radioModel = 'Middle';

        $scope.checkModel = {
            left: false,
            middle: true,
            right: false
        };
    }]);