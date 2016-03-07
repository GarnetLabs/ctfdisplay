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
    /*global toastr */
    $scope.announcements = [];
    $scope.passcode = undefined;
    var newRow = {announcementText: undefined};

    $scope.submit = function () {
      var handleSuccess = function (data) {
        if (data) {
          console.log('AnnouncementCtrl: annoncements posted: ', data);
          toastr.options.closeButton = true;
          toastr.options.positionClass = 'toast-top-center';
          toastr.success('Announcements submitted successfully');
        }
      };
      var handleError = function (error) {
        $scope.errorMsg = error.status + ' (' + error.statusText + ')';
        console.log($scope.errorMsg);
      };
      console.log('AnnouncementCtrl submit');
      AnnouncementService.sendAnnouncements({data: $scope.announcements, passcode: $scope.passcode})
        .then(handleSuccess, handleError);
    };

    $scope.getAnnouncements = function () {
      var handleSuccess = function (data) {
        if (data) {
          $scope.announcements = data;
          console.log('AnnouncementCtrl: announcements fetched: ', data);
        }
      };
      var handleError = function (error) {
        $scope.errorMsg = error.status + ' (' + error.statusText + ')';
        console.log($scope.errorMsg);
      };
      console.log('AnnouncementCtrl getAnnouncements');
      AnnouncementService.getAnnouncements().then(handleSuccess, handleError);
    };

    $scope.addRow = function () {
      $scope.announcements.push(angular.copy(newRow));
    };

    $scope.removeRow = function (index) {
      $scope.announcements.splice(index, 1);
    };

    $scope.getAnnouncements();
  });
