'use strict';
angular
    .module('UIComponents', [
        'UIComponents.main',
        'UIComponents.carousels',
        'UIComponents.about',
        'UIComponents.about.list',
        'ui.router',
        'ui.component.buttons',
        'ui.component.carousel',
        'ui.component.datepicker',
        'ui.component.modal',
        'ui.component.tabs',
        'angular-carousel'
    ])

    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider,   $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');
        }
    ]);