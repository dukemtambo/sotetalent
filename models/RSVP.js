const keystone = require("keystone");
const Types = keystone.Field.Types;

/**
 * RSVPs Model
 * ===========
 */

const RSVP = new keystone.List("RSVP");

RSVP.add({
  competition: {
    type: Types.Relationship,
    ref: "Competition",
    required: true,
    initial: true,
    index: true
  },
  // who should be startup instead of individuals
  who: {
    type: Types.Relationship,
    ref: "User",
    required: true,
    initial: true,
    index: true
  },
  attending: { type: Types.Boolean, index: true },
  createdAt: { type: Date, noedit: true, collapse: true, default: Date.now },
  changedAt: { type: Date, noedit: true, collapse: true }
});

/**
 * Hooks
 * =====
 */

RSVP.schema.pre("save", function(next) {
  if (!this.isModified("changedAt")) {
    this.changedAt = Date.now();
  }
  next();
});

RSVP.schema.post("save", function() {
  keystone
    .list("Competition")
    .model.findById(this.competition, function(err, competition) {
      if (competition) competition.refreshRSVPs();
    });
});

RSVP.schema.post("remove", function() {
  keystone
    .list("Competition")
    .model.findById(this.competition, function(err, competition) {
      if (competition) competition.refreshRSVPs();
    });
});

/**
 * Registration
 * ============
 */

RSVP.defaultColumns = "competition, who, createdAt";
RSVP.defaultSort = "-createdAt";
RSVP.register();
