/**
 * Created by mayanknarasimhan on 20/02/16.
 */
var express = require('express');
var router = express.Router();
var request = require('request');
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../resources/ctfdisplay-creds.json');

function getInstagramImages(instagramImages, cb) {
  var baseUrl = 'https://www.instagram.com/clevelandthyagarajafestival';
  var mediaPath = '/media';
  request(baseUrl + mediaPath, function (error, response, html) {
    if (!error) {
      var items = JSON.parse(response.body).items;
      items.forEach(function (item) {
        var image_url = item.images.standard_resolution.url;
        var caption = item.caption.text;
        var timestamp = new Date(parseInt(item.created_time) * 1000).toISOString();
        instagramImages.push({timestamp: timestamp, image_url: image_url, caption: caption});
      });
      cb();
    }
  });
}

function getAggregatedImages(aggregatedImages, cb) {
  var spreadsheetId = '19xpxbhmki94OGb8z2TUgGFtHVwlxiM2vGdQklaS2aRM';
  var spreadsheet = new GoogleSpreadsheet(spreadsheetId);
  spreadsheet.useServiceAccountAuth(creds, function(err){
    spreadsheet.getInfo(function (err, sheetInfo) {
      var worksheet = sheetInfo.worksheets[0];
      worksheet.getRows(function (err, rows) {
        for (var i = 0; i < rows.length; i++) {
          var addedat = rows[i].addedat;
          addedat = addedat.replace('at', '');
          var format = addedat.slice(addedat.length - 2);
          addedat = addedat.replace(format, ' ' + format);
          var timestamp = new Date(addedat).toISOString();
          aggregatedImages.push({timestamp: timestamp, image_url: rows[i].sourceurl, caption: rows[i].caption});
        }
        cb();
      });
    });
  });
}

/* GET images */
router.get('/', function(req, res, next) {
  var instagramImages = [];
  var aggregatedImages = [];
  var topn = 20;
  var comparator = function (a, b) {
    if (a.timestamp < b.timestamp) {
      return 1;
    } else if (a.timestamp === b.timestamp) {
      return 0;
    } else {
      return -1;
    }
  };
  var sendResponse = function () {
    var result = instagramImages.concat(aggregatedImages);
    result.sort(comparator);
    result = result.slice(0, topn);
    res.send(result);
  };
  getInstagramImages(instagramImages, function () {
    getAggregatedImages(aggregatedImages, sendResponse);
  });
});


module.exports = router;
