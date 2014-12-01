'use strict';
angular
    .module('UIComponents.about',['ui.router'])
        .config(['$stateProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('about', {
                        url: '/about',
                        views:{
                            'main':{
                                controller: 'AboutCtrl',
                                templateUrl: 'routers/about/tpl.html'
                            }
                        }
                    });
            }
        ]);