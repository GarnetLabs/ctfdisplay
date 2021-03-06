'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:TickerCtrl
 * @description
 * # TickerCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('TickerCtrl', function ($scope, $interval, AnnouncementService, intervals) {
    $scope.currentIndex = 0;
    var cycleInterval = intervals.TICKER_CYCLE_INTERVAL;
    var refreshInterval = intervals.TICKER_REFRESH_INTERVAL;
    $scope.tickerItems = [];

    $scope.tickerPosition = 200;
    $scope.temps = [];
    $scope.margin = 20;

    $scope.isCurrentIndex = function (index) {
      return $scope.currentIndex === index;
    };
    $scope.nextItem = function () {
      $scope.currentIndex = ($scope.currentIndex < $scope.tickerItems.length - 1) ? ++$scope.currentIndex : 0;
    };
    $scope.updateTickerItems = function () {
      var handleSuccess = function (data) {
        if (data) {
          $scope.tickerItems = data;
          console.log('TickerCtrl: tickerItems fetched: ' + new Date());
        }
      };
      var handleError = function (error) {
        $scope.errorMsg = error.status + ' (' + error.statusText + ')';
        console.log($scope.errorMsg);
      };
      console.log('TickerCtrl updateTickerItems');
      AnnouncementService.getAnnouncements().then(handleSuccess, handleError);
    };

    $scope.updateTickerItems();
    $interval($scope.nextItem, cycleInterval);
    $interval($scope.updateTickerItems, refreshInterval);
  });

angular.module('clientApp')
  .animation('.slide-container', ['$animateCss', function($animateCss) {
    return {
      addClass: function(element, className, doneFn) {
        if (className === 'ng-hide') {
          var animator = $animateCss(element, {
            from: {opacity: 1},
            to: {opacity: 0}
          });
          if (animator) {
            return animator.start().finally(doneFn);
          }
        }
        doneFn();
      },
      removeClass: function(element, className, doneFn) {
        if (className === 'ng-hide') {
          var animator = $animateCss(element, {
            from: {opacity: 0},
            to: {opacity: 1}
          });
          if (animator) {
            return animator.start().finally(doneFn);
          }
        }
        doneFn();
      }
    };
  }]);
