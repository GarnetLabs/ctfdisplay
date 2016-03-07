/**
 * Created by mayanknarasimhan on 21/02/16.
 */
'use strict';

angular.module('clientApp')
  .service('AnnouncementService', function ($http, $q) {
    var announcementApiUrl = '/announce';

    this.sendAnnouncements = function (data) {
      var handleSuccess = function (result) {
        if (result && result.data) {
          console.log('AnnouncementService: posted', result.data);
          return result.data;
        }
      };
      var handleError = function (result) {
        return $q.reject(result);
      };

      return $http.post(announcementApiUrl, data).then(handleSuccess, handleError);
    };

    this.getAnnouncements = function () {
      var handleSuccess = function (result) {
        if (result && result.data) {
          console.log('AnnouncementService: posted');
          return result.data;
        }
      };
      var handleError = function (result) {
        return $q.reject(result);
      };
      console.log('AnnoncementService getAnnouncements: ' + announcementApiUrl);
      return $http.get(announcementApiUrl).then(handleSuccess, handleError);
    };
  });
