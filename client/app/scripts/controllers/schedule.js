'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ScheduleCtrl
 * @description
 * # ScheduleCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ScheduleCtrl', function ($scope, ScheduleService, $interval, intervals) {
    $scope.schedule = undefined;
    $scope.errorMsg = undefined;
    $scope.currentDateIndex = 0;
    $scope.venueIndex = 0;
    var refreshInterval = intervals.SCHEDULE_REFRESH_INTERVAL;
    var venueCycleInterval = intervals.VENUE_CYCLE_INTERVAL;

    var getCurrentDateIndex = function () {
      var today = new Date();
      for (var i = 0; i < $scope.schedule.length; i++) {
        var scheduleDate = $scope.schedule[i].day;
        if (scheduleDate === today.toDateString()) {
          return i;
        }
      }
      return 0;
    };

    var handleSuccess = function (data) {
      if (data) {
        $scope.schedule = [];
        $scope.schedule = data;
        $scope.currentDateIndex = getCurrentDateIndex();
        console.log('ScheduleCtrl: schedule fetched: ' + new Date());
      }
    };
    var handleError = function (error) {
      $scope.errorMsg = error.status + ' (' + error.statusText + ')';
      console.log($scope.errorMsg);
    };
    $scope.getSchedule = function () {
      ScheduleService.scrape().then(handleSuccess, handleError);
    };

    $scope.nextVenueItem = function () {
      if ($scope.schedule && $scope.schedule[$scope.currentDateIndex] && $scope.schedule[$scope.currentDateIndex].venues.length > 1) {
        $scope.venueIndex = ($scope.venueIndex < $scope.schedule[$scope.currentDateIndex].venues.length - 1) ? ++$scope.venueIndex : 0;
      }
    };

    $scope.isCurrentVenueIndex = function (index) {
      return $scope.venueIndex === index;
    };

    $scope.getSchedule();
    $interval($scope.getSchedule, refreshInterval);
    $interval($scope.nextVenueItem, venueCycleInterval);
  });

angular.module('clientApp')
  .animation('.slide-container', ['$animateCss', function($animateCss) {
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
