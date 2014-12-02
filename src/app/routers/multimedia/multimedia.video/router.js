'use strict';
angular
    .module('UIComponents.multimedia.video',['ui.router'])
        .config(['$stateProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('multimedia.video', {
                        url: '/multimedia/video',
                        views:{
                            'main.video':{
                                controller: 'MultimediaVideoCtrl',
                                templateUrl: 'routers/multimedia/multimedia.video/tpl.html'
                            }
                        }
                    });
            }
        ]);