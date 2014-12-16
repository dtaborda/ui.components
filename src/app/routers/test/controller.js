'use strict';

angular.module('UIComponents.test')
    .controller('TestCtrl',[ '$scope', function($scope){

        $scope.carouselIndex=3;

        $scope.items = [
            {
                type: 'img',
                url: 'http://wallvan.com/download?filename=2014/07/Cool-Surf-Girl-wallpaper.jpg'
            },
            {
                type: 'video',
                url: 'https://www.youtube.com/watch?v=18-xvIjH8T4'
            },
            {
                type: 'img',
                url: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSI1MdJClH5dsFj5y4fA3_zFIbjXPhX77-RZYOh9FYQ9BtZTs7p'
            },
            {
                type: 'img',
                url: 'http://images6.alphacoders.com/407/407732.jpg'
            },
            {
                type: 'html',
                url: 'src/components/carousel/slide.html'
            }
        ]
    }]);