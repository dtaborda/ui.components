'use strict';

angular.module('UIComponents')
    .controller('MainCtrl', ['$scope', function ($scope) {

        /*Buttons*/
        $scope.singleModel = 1;

        $scope.radioModel = 'Middle';

        $scope.checkModel = {
            left: false,
            middle: true,
            right: false
        };

        /*Carousel*/
        $scope.myInterval = 5000;
        var slides = $scope.slides = [];
        $scope.addSlide = function() {
            var newWidth = 600 + slides.length + 1;
            slides.push({
                image: 'http://placekitten.com/' + newWidth + '/300',
                text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
                ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
            });
        };
        for (var i=0; i<4; i++) {
            $scope.addSlide();
        }
}]);
