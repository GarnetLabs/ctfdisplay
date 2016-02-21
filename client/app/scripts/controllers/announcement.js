/**
 * Created by mayanknarasimhan on 21/02/16.
 */
'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AnnouncementCtrl
 * @description
 * # AnnouncementCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('AnnouncementCtrl', function ($scope, AnnouncementService) {
    $scope.passcode = null;
    $scope.announcementText = null;
    $scope.showPasscode = false;

    var handleSuccess = function (data) {
      if (data) {
        $scope.slides = data;
        console.log('CarouselCtrl: images fetched: ' + new Date());
      }
    };
    var handleError = function (error) {
      $scope.errorMsg = error.status + ' (' + error.statusText + ')';
      console.log($scope.errorMsg);
    };
    $scope.submit = function () {
      AnnouncementService.sendAnnouncement({passcode: $scope.passcode, announcementText: $scope.announcementText})
        .then(handleSuccess, handleError);
    };
  });
