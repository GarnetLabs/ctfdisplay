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
    'ui.bootstrap',
    'ui.router',
    'ngMaterial'
  ]);
clientApp.constant('intervals', {
  'CAROUSEL_SLIDE_INTERVAL': 15000,
  'CAROUSEL_REFRESH_INTERVAL': 7200000,
  'SCHEDULE_REFRESH_INTERVAL': 600000,
  'VENUE_CYCLE_INTERVAL': 15000,
  'TICKER_CYCLE_INTERVAL': 10000,
  'TICKER_REFRESH_INTERVAL': 600000
});
clientApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
      .state('index', {
        url: "/",
        views: {
          'carousel': {
            templateUrl: 'views/carousel.html',
            controller: 'CarouselCtrl',
            controllerAs: 'carousel'
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
      });
    $stateProvider
      .state('announcement', {
        url: "/announcements",
        views: {
          '': {
            templateUrl: 'views/announcement.html',
            controller: 'AnnouncementCtrl',
            'controllerAs': 'announce'
          },
          'ticker': {
            templateUrl: 'views/ticker.html',
            controller: 'TickerCtrl',
            controllerAs: 'ticker'
          }
        }
        /*templateUrl: 'views/announcement.html',
        controller: 'AnnouncementCtrl',
        'controllerAs': 'announce'*/
      });
  }
);
