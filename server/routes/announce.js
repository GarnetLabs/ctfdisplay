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
  var passcode = req.body.passcode;
  var announcementText = req.body.announcementText;
  if (passcode === secret) {
    var announcement = {id: uuid.v1(), timestamp: new Date().toISOString(), announcementText: announcementText};
    var callback = function(err, count) {
      if (!err) {
        console.log('inserted: ', announcement);
        res.send(announcement);
      }
    };
    nosql.insert(announcement, callback);
    console.log(announcement);
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
