'use strict';
angular
    .module('UIComponents.about.list',['ui.router'])
        .config(['$stateProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('about.list', {
                        url: '/about/list',
                        views:{
                            'main.list':{
                                controller: 'AboutListCtrl',
                                templateUrl: 'about/about.list/tpl.html'
                            }
                        }
                    });
            }
        ]);