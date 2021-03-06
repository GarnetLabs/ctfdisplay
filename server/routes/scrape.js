/**
 * Created by mayanknarasimhan on 19/02/16.
 */
var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

/* GET schedule scraper */
router.get('/', function(req, res, next) {
  var baseUrl = 'http://www.aradhana.org';
  var schedulePath = '/schedule.html';
  var scheduleDays = [];
  var currentDay = 0;
  var currentVenue = 0;
  var ticketPrice = -1;
  request(baseUrl + schedulePath, function (error, response, html) {
    if (!error) {
      var $ = cheerio.load(html, {normalizeWhitespace: true});
      $('#schedule tbody tr').each(function (i, el) {
        var isPaid = $(this).parent().hasClass('paid');
        if (!isPaid) {
          ticketPrice = -1;
        }
        var thDate = $(this).find($('th[class="date"]'));
        var thVenue = $(this).find($('th[class="venue"]'));
        var tdTime = $(this).find($('td[class="time"]'));
        var tdEvent = $(this).find($('td[class="event"]'));
        var tdTicket = $(this).find($('td[class="ticket"]'));
        if (isPaid && tdTicket && tdTicket.length > 0) {
          ticketPrice = tdTicket.text().trim().match(/\d+/)[0];
        }
        if (thDate && thDate.length > 0) {
          var parts = thDate.text().trim().split(/\s+/);
          if (parts.length > 0) {
            var date = new Date(parts.slice(0, 4).join(' ')).toDateString();
            if (parts.length > 4) {
              var venue = parts.slice(4, parts.length).join(' ');
              scheduleDays.push(
                {
                  day: date,
                  venues: [
                    {
                      venue: venue,
                      events: []
                    }
                  ]
                }
              );
            } else {
              scheduleDays.push(
                {
                  day: date,
                  venues: []
                }
              );
            }
          }
        }
        else if (thVenue && thVenue.length > 0) {
          currentDay = scheduleDays.length - 1;
          scheduleDays[currentDay].venues.push(
            {
              venue: thVenue.text().trim(),
              events: []
            }
          );
        }
        else if (tdTime && tdTime.length > 0 && tdEvent && tdEvent.length > 0) {
          currentDay = scheduleDays.length - 1;
          currentVenue = scheduleDays[currentDay].venues.length - 1;
          scheduleDays[currentDay].venues[currentVenue].events.push(
            {
              time: tdTime.text().trim().replace('–', 'to'),
              event: tdEvent.contents().not(function () {
                return this.tagName === 'table';
              }).text().trim(),
              price: isPaid && (ticketPrice > 0) ? ticketPrice : null
            }
          );
        }
      });

      res.send(scheduleDays);
    }
  });
});

module.exports = router;
