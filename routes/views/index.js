const keystone = require("keystone");
const moment = require("moment");

const Competition = keystone.list("Competition");
const Post = keystone.list("Post");
const RSVP = keystone.list("RSVP");

exports = module.exports = function(req, res) {
  var view = new keystone.View(req, res),
    locals = res.locals;

  locals.section = "home";
  locals.competition = {};
  locals.page.title = "SoteTalent - Pursue Your Talents";

  locals.rsvpStatus = {};

  locals.user = req.user;

  // Load the first, NEXT competition

  view.on("init", function(next) {
    Competition.model
      .findOne()
      .where("state", "active")
      .sort("-startDate")
      .exec(function(err, activeCompetition) {
        locals.activeCompetition = activeCompetition;
        next();
      });
  });

  // Load the first, PAST Competition

  view.on("init", function(next) {
    Competition.model
      .findOne()
      .where("state", "past")
      .sort("-startDate")
      .exec(function(err, pastCompetition) {
        locals.pastCompetition = pastCompetition;
        next();
      });
  });

  // Load an RSVP

  view.on("init", function(next) {
    if (!req.user || !locals.activeCompetition) return next();

    RSVP.model
      .findOne()
      .where("who", req.user._id)
      .where("competition", locals.activeCompetition)
      .exec(function(err, rsvp) {
        locals.rsvpStatus = {
          rsvped: rsvp ? true : false,
          attending: rsvp && rsvp.attending ? true : false
        };
        return next();
      });
  });

  // Decide which to render

  view.on("render", function(next) {
    locals.competition = locals.activeCompetition || locals.pastCompetition;
    if (locals.competition) {
      locals.competition.populateRelated("talks[who] rsvps[who]", next);
    } else {
      next();
    }
  });

  view.render("site/index");
};
