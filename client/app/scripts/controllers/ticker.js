'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:TickerCtrl
 * @description
 * # TickerCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('TickerCtrl', function ($scope, $interval, AnnouncementService) {
    $scope.currentIndex = 0;
    var cycleInterval = 5000;
    var refreshInterval = 30000;
    $scope.tickerItems = [];
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
  .animation('.ticker-slide', ['$animateCss', function($animateCss) {
    return {
      addClass: function(element, className, doneFn) {
        if (className === 'ng-hide') {
          var animator = $animateCss(element, {
            to: {height: '0px', opacity: 0}
          });
          if (animator) {
            return animator.start().finally(function() {
              element[0].style.height = '';
              doneFn();
            });
          }
        }
        doneFn();
      },
      removeClass: function(element, className, doneFn) {
        if (className === 'ng-hide') {
          var height = element[0].offsetHeight;
          var animator = $animateCss(element, {
            from: {height: '0px', opacity: 0},
            to: {height: height + 'px', opacity: 1}
          });
          if (animator) {
            return animator.start().finally(doneFn);
          }
        }
        doneFn();
      }
    };
  }]);
