var _ = require("lodash");
var Store = require("store-prototype");
var request = require("superagent");

var RSVPStore = new Store();

var loaded = false;
var busy = false;
var competition = {};
var rsvp = {};
var attendees = [];

var REFRESH_INTERVAL = 5000; // 5 seconds

var refreshTimeout = null;
function cancelRefresh() {
  clearTimeout(refreshTimeout);
}

RSVPStore.extend({
  getCompetition: function() {
    return competition;
  },

  getRSVP: function() {
    return rsvp;
  },

  getAttendees: function(callback) {
    return attendees;
  },

  rsvp: function(attending, callback) {
    if (busy) return;
    cancelRefresh();
    busy = true;
    RSVPStore.notifyChange();
    request
      .post("/api/me/competition")
      .send({
        data: {
          competition: SoteTalent.currentCompetitionId,
          attending: attending
        }
      })
      .end(function(err, res) {
        if (err) {
          console.log("Error with the AJAX request: ", err);
          return;
        }
        RSVPStore.getCompetitionData();
      });
  },

  isLoaded: function() {
    return loaded;
  },

  isBusy: function() {
    return busy;
  },

  getCompetitionData: function(callback) {
    // ensure any scheduled refresh is stopped,
    // in case this was called directly
    cancelRefresh();
    // request the update from the API
    busy = true;
    request
      .get("/api/competition/" + SoteTalent.currentCompetitionId)
      .end(function(err, res) {
        if (err) {
          console.log("Error with the AJAX request: ", err);
        }
        busy = false;
        if (!err && res.body) {
          loaded = true;
          competition = res.body.competition;
          rsvp = res.body.rsvp;
          attendees = res.body.attendees;
          RSVPStore.notifyChange();
        }
        RSVPStore.queueCompetitionRefresh();
        return callback && callback(err, res.body);
      });
  },

  queueCompetitionRefresh: function() {
    refreshTimeout = setTimeout(RSVPStore.getCompetitionData, REFRESH_INTERVAL);
  }
});

RSVPStore.getCompetitionData();
module.exports = RSVPStore;
