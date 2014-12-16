'use strict';
angular
    .module('UIComponents.about.list',['ui.router'])
        .config(['$stateProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('about.list', {
                        url: '/list',
                        views:{
                            'main.list':{
                                controller: 'AboutListCtrl',
                                templateUrl: 'routers/about/about.list/tpl.html'
                            }
                        }
                    });
            }
        ]);