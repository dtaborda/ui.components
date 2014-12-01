'use strict';
angular
    .module('UIComponents.main',['ui.router'])
        .config(['$stateProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('main', {
                        url: '/',
                        views:{
                            'main':{
                                controller: 'MainCtrl',
                                templateUrl: 'routers/main/tpl.html'
                            }
                        }
                    });
            }
        ]);