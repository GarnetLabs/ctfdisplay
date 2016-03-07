/**
 * Created by mayanknarasimhan on 20/02/16.
 */
'use strict';

angular.module('clientApp')
  .service('CarouselService', function ($http, $q) {
    var imagesApiUrl = '/images';

    this.images = function () {
      var handleSuccess = function (result) {
        if (result && result.data) {
          return result.data;
        }
      };
      var handleError = function (result) {
        return $q.reject(result);
      };

      return $http.get(imagesApiUrl).then(handleSuccess, handleError);
    };
  });
