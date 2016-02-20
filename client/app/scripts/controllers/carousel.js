'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:CarouselCtrl
 * @description
 * # CarouselCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('CarouselCtrl', function ($scope, CarouselService, $interval) {

    $scope.slideInterval = 5000;
  	$scope.noWrapSlides = false;
    $scope.errorMsg = null;
    $scope.slides = [];
    var refreshInterval = 100000;

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
    $scope.getImages = function () {
      CarouselService.images().then(handleSuccess, handleError);
    };

    $scope.getImages();
    $interval($scope.getImages, refreshInterval);
 });
