/**
 * Created by mayanknarasimhan on 20/02/16.
 */
'use strict';

angular.module('clientApp')
  .service('ScheduleService', function ($http, $q) {
    var scheduleApiUrl = '/scrape';

    this.scrape = function () {
      var handleSuccess = function (result) {
        if (result && result.data) {
          console.log('ScheduleService: success: ', result.data);
          return result.data;
        }
      };
      var handleError = function (result) {
        return $q.reject(result);
      };

      return $http.get(scheduleApiUrl).then(handleSuccess, handleError);
    };
  });
