const keystone = require("keystone");
const moment = require("moment");
const Competition = keystone.list("Competition");
const RSVP = keystone.list("RSVP");

exports = module.exports = function(req, res) {
  var view = new keystone.View(req, res),
    locals = res.locals;

  locals.section = "competition";
  locals.page.title = "Competitions - SoteTalent";

  locals.rsvpStatus = {};

  // LOAD the Competition

  view.on("init", function(next) {
    Competition.model
      .findOne()
      .where("key", req.params.competition)
      .exec(function(err, competition) {
        if (err) return res.err(err);
        if (!competition) return res.notfound("Post not found");

        locals.competition = competition;
        locals.competition.populateRelated("talks[who] rsvps[who]", next);
      });
  });

  // LOAD an RSVP

  view.on("init", function(next) {
    if (!req.user || !locals.competition) return next();

    RSVP.model
      .findOne()
      .where("who", req.user._id)
      .where("competition", locals.competition)
      .exec(function(err, rsvp) {
        locals.rsvpStatus = {
          rsvped: rsvp ? true : false,
          attending: rsvp && rsvp.attending ? true : false
        };
        return next();
      });
  });

  view.render("site/competition");
};
