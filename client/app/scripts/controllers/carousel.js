'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:CarouselCtrl
 * @description
 * # CarouselCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('CarouselCtrl', function ($scope, CarouselService, $interval, intervals) {

    $scope.slideInterval = intervals.CAROUSEL_SLIDE_INTERVAL;
  	$scope.noWrapSlides = false;
    $scope.errorMsg = undefined;
    $scope.slides = [];
    var refreshInterval = intervals.CAROUSEL_REFRESH_INTERVAL;
    var images;

    var equals = function (obj1, obj2) {
      if (obj1 && obj2 && obj1.length === obj2.length) {
        for (var i = 0; i < obj1.length; i++) {
          if (obj1[i].image_url !== obj2[i].image_url) {
            return false;
          }
        }
        return true;
      }
      return false;
    };

    var exists = function (obj, arr) {
      for (var i = 0; i < arr.length; i++) {
        if (obj.image_url === arr[i].image_url) {
          return true;
        }
      }
      return false;
    };

    var updateSlides = function (dataSource) {
      if ($scope.slides.length === 0) {
        for (var i = 0; i < dataSource.length; i++) {
          $scope.slides.push(dataSource[i]);
        }
      } else {
        for (var j = 0; j < dataSource.length; j++) {
          if (!exists(dataSource[j], $scope.slides)) {
            $scope.slides[j] = angular.copy(dataSource[j]);
          }
        }
      }
    };

    var handleSuccess = function (data) {
      if (data) {
        if (!equals(images, data)) {
          updateSlides(data);
          images = data.slice(0);
        }
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
