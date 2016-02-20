'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ScheduleCtrl', function ($scope, ScheduleService, $interval) {
    $scope.schedule = null;
    $scope.errorMsg = null;
    var refreshInterval = 10000;

    var handleSuccess = function (data) {
      if (data) {
        $scope.schedule = data;
        console.log('ScheduleCtrl: schedule updated');
      }
    };
    var handleError = function (error) {
      $scope.errorMsg = error.status + ' (' + error.statusText + ')';
    };
    var getSchedule = function () {
      ScheduleService.scrape().then(handleSuccess, handleError);
    };

    $interval(getSchedule, refreshInterval);
  });
