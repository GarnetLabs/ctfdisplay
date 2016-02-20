/**
 * Created by mayanknarasimhan on 20/02/16.
 */
var express = require('express');
var router = express.Router();
var request = require('request');

/* GET instagram images */
router.get('/', function(req, res, next) {
  var baseUrl = 'https://www.instagram.com/clevelandthyagarajafestival';
  var mediaPath = '/media';
  var images = [];
  request(baseUrl + mediaPath, function (error, response, html) {
    if (!error) {
      var items = JSON.parse(response.body).items;
      items.forEach(function (item) {
        var image_url = item.images.standard_resolution.url;
        var caption = item.caption.text;
        images.push({image_url: image_url, caption: caption});
      });
      res.send(images);
    }
  });
});

module.exports = router;
