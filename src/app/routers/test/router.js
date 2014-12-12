'use strict';
angular
    .module('UIComponents.test',['ui.router'])
        .config(['$stateProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('test', {
                        url: '/test',
                        views:{
                            'main':{
                                controller: 'TestCtrl',
                                templateUrl: 'routers/test/tpl.html'
                            }
                        }
                    });
            }
        ]);