'use strict';

angular.module('ui.component.carousel', ['angular-carousel', 'youtube-embed'])

.directive('uiCarousel', [function() {
  return {
    restrict: 'E',
    templateUrl: 'src/components/carousel/carousel.html',
    scope: {
          items: '=',
          carouselIndex: '='
        },
    link: function($scope){
      $scope.carouselIndex = $scope.carouselIndex || 0;
    }
  };
}]);
