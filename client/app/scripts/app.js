'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
var clientApp = angular
  .module('clientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'ui.router'
  ]);
clientApp.config( function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
      .state('index', {
        url: "/",
        views: {
          'carousel': {
            templateUrl: 'views/carousel.html',
            controller: 'CarouselCtrl'
            //controllerAs: 'carousel'
            //template: "index.viewA"
          },
          'schedule': {
            templateUrl: 'views/schedule.html',
            controller: 'ScheduleCtrl',
            controllerAs: 'schedule'
          },
          'ticker': {
            templateUrl: 'views/ticker.html',
            controller: 'TickerCtrl',
            controllerAs: 'ticker'
          }
        }
      })
      .state('about', {
        url: "/about",
        views: {
          'carousel': {
            //templateUrl: 'views/main.html',
            //controller: 'MainCtrl',
            //controllerAs: 'main'
            template: "about.viewA"
          },
          'schedule': {template: "about.viewB"},
          'ticker': {},
        }
      })
      .state('contact', {
        url: "/contact",
        views: {
          'carousel': {
            //templateUrl: 'views/main.html',
            //controller: 'MainCtrl',
            //controllerAs: 'main'
            template: "contact.viewA"
          },
          'schedule': {template: "contact.viewB"},
          'ticker': {},
        }
      });
  }
);
