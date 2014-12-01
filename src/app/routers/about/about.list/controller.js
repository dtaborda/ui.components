'use strict';

angular.module('UIComponents.about.list')
    .controller('AboutListCtrl',[ '$scope', function($scope){
        $scope.things = ['A', 'B', 'C'];
    }]);