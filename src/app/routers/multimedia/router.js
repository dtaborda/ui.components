'use strict';
angular
    .module('UIComponents.multimedia',['ui.router'])
        .config(['$stateProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('multimedia', {
                        url: '/multimedia',
                        views:{
                            'main':{
                                controller: 'MultimediaCtrl',
                                templateUrl: 'routers/multimedia/tpl.html'
                            }
                        }
                    });
            }
        ]);