'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ScheduleCtrl
 * @description
 * # ScheduleCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ScheduleCtrl', function ($scope, ScheduleService, $interval) {
    $scope.schedule = [];
    $scope.errorMsg = null;
    var refreshInterval = 60000;

    var handleSuccess = function (data) {
      if (data) {
        $scope.schedule = data;
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

    $scope.getSchedule();
    $interval($scope.getSchedule, refreshInterval);
  });
