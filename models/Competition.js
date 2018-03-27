const _ = require("lodash");
const keystone = require("keystone");
const moment = require("moment");
const Types = keystone.Field.Types;

/**
 * Competitions Model
 * ==================
 */

const Competition = new keystone.List("Competition", {
  track: true,
  autokey: { path: "key", from: "name", unique: true }
});

Competition.add({
  name: { type: String, required: true, initial: true },
  publishedDate: { type: Types.Date, index: true },

  state: {
    type: Types.Select,
    options: "draft, scheduled, active, past",
    noedit: true
  },
  // TODO: StartDate and EndDate might be deadline instade
  startDate: {
    type: Types.Datetime,
    required: true,
    initial: true,
    index: true,
    width: "short",
    note: "e.g. 2014-07-15 / 6:00pm"
  },
  endDate: {
    type: Types.Datetime,
    required: true,
    initial: true,
    index: true,
    width: "short",
    note: "e.g. 2014-07-15 / 9:00pm"
  },

  place: {
    type: String,
    required: false,
    initial: true,
    width: "medium",
    default: "Sote Hub, Mombasa Road, c/o Red Elephant Bistro (SoteHub)",
    note: "Usually SoteHUb – Mombasa Road, c/o Red Elephant Bistro"
  },
  map: {
    type: String,
    required: false,
    initial: true,
    width: "medium",
    default:
      "Sote Hub, Mombasa Road, c/o Red Elephant Bistro, P.O.BOX 213, Voi",
    note: "Sote Hub, Mombasa Road, c/o Red Elephant Bistro"
  },
  description: { type: Types.Html, wysiwyg: true },

  maxRSVPs: { type: Number, default: 100 },
  totalRSVPs: { type: Number, noedit: true },

  legacy: { type: Boolean, noedit: true, collapse: true }
});

// Relationships
// ------------------------------

// TODO: RSVP (should be startups)
Competition.relationship({ ref: "Talk", refPath: "meetup", path: "talks" });
Competition.relationship({
  ref: "RSVP",
  refPath: "competition",
  path: "rsvps"
});

// Virtuals
// ------------------------------

Competition.schema.virtual("url").get(function() {
  return "/competitions/" + this.key;
});

Competition.schema.virtual("remainingRSVPs").get(function() {
  if (!this.maxRSVPs) return -1;
  return Math.max(this.maxRSVPs - (this.totalRSVPs || 0), 0);
});

Competition.schema.virtual("rsvpsAvailable").get(function() {
  return this.remainingRSVPs > 0;
});

// Pre Save
// ------------------------------

Competition.schema.pre("save", function(next) {
  var competition = this;
  // no published date, it's a draft competition
  if (!competition.publishedDate) {
    competition.state = "draft";
  } else if (moment().isAfter(moment(competition.startDate).add("day", 1))) {
    // competition date plus one day is after today, it's a past competition
    competition.state = "past";
  } else if (moment().isAfter(competition.publishedDate)) {
    // publish date is after today, it's an active competition
    competition.state = "active";
  } else if (moment().isBefore(moment(competition.publishedDate))) {
    // publish date is before today, it's a scheduled competition
    competition.state = "scheduled";
  }
  next();
});

// Methods
// ------------------------------

Competition.schema.methods.refreshRSVPs = function(callback) {
  var competition = this;
  keystone
    .list("RSVP")
    .model.count()
    .where("competition")
    .in([competition.id])
    .where("attending", true)
    .exec(function(err, count) {
      if (err) return callback(err);
      competition.totalRSVPs = count;
      competition.save(callback);
    });
};

Competition.schema.methods.notifyAttendees = function(req, res, next) {
  var competition = this;
  keystone
    .list("User")
    .model.find()
    .where("notifications.competition", true)
    .exec(function(err, attendees) {
      if (err) return next(err);
      if (!attendees.length) {
        next();
      } else {
        attendees.forEach(function(attendee) {
          new keystone.Email("new-competition").send(
            {
              attendee: attendee,
              competition: competition,
              subject: "New competition: " + competition.name,
              to: attendee.email,
              from: {
                name: "SoteTaalent",
                email: "info@sotetalent.com"
              }
            },
            next
          );
        });
      }
    });
};

Competition.schema.set("toJSON", {
  transform: function(doc, rtn, options) {
    return _.pick(
      doc,
      "_id",
      "name",
      "startDate",
      "endDate",
      "place",
      "map",
      "description",
      "rsvpsAvailable",
      "remainingRSVPs"
    );
  }
});

/**
 * Registration
 * ============
 */

Competition.defaultSort = "-startDate";
Competition.defaultColumns =
  "name, state|10%, startDate|15%, publishedDate|15%";
Competition.register();
