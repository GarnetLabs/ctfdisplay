/**
 * Created by mayanknarasimhan on 21/02/16.
 */
var express = require('express');
var router = express.Router();
var secret = 'ctfdisplay2016';
var path = require('path');
var nosql = require('nosql').load(path.join(__dirname, '../data/database.nosql'));
var uuid = require('node-uuid');

/* GET instagram images */
router.post('/', function(req, res) {
  var data = req.body.data;
  var passcode = req.body.passcode;
  if (passcode === secret && data) {
    var removeCallback = function(err, count) {
      if (!err) {
        console.log('flushed all records');
        var insertCallback = function(err, count) {
          if (!err) {
            console.log('inserted: ', announcements);
            res.send(announcements);
          }
        };
        nosql.insert(announcements, insertCallback);
      }
    };
    var filter = function(doc) {
      // all records
      console.log('remove: ', doc.id);
      return true;
    };

    var announcements = [];
    for (var i = 0; i < data.length; i++) {
      var announcement = {
        id: data[i].id ? data[i].id : uuid.v1(),
        timestamp: new Date().toISOString(),
        announcementText: data[i].announcementText
      };
      announcements.push(announcement);
    }

    nosql.remove(filter, removeCallback);
  }
});

router.get('/', function (req, res, next) {
  var callback = function(err, selected) {
    var announcements = [];
    selected.forEach(function(obj) {
      announcements.push(obj);
    });
    console.log('announcements retrieved: ' + announcements.length);
    res.send(announcements);
  };
  var map = function(doc) {
    return doc;
  };
  nosql.all(map, callback);
});

module.exports = router;
