'use strict';
angular
    .module('UIComponents', [
        'UIComponents.main',
        'UIComponents.carousels',
        'UIComponents.multimedia',
        'UIComponents.multimedia.video',
        'UIComponents.about',
        'UIComponents.about.list',
        'UIComponents.test',
        'ui.router',
        'ui.component.buttons',
        'ui.component.carousel',
        'ui.component.datepicker',
        'ui.component.modal',
        'ui.component.tabs',
    	'angular-carousel',
    	'youtube-embed'
    ])

    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider,   $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');
        }
    ]);