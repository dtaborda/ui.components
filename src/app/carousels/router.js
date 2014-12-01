'use strict';
angular
    .module('UIComponents.carousels',['ui.router'])
        .config(['$stateProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('carousels', {
                        url: '/carousels',
                        views:{
                            'main':{
                                controller: 'CarouselsCtrl',
                                templateUrl: 'carousels/tpl.html'
                            }
                        }
                    });
            }
        ]);