const keystone = require("keystone");
const moment = require("moment");
const RSVP = keystone.list("RSVP");

const Competitions = keystone.list("Competition");

exports = module.exports = function(req, res) {
  var view = new keystone.View(req, res),
    locals = res.locals;

  locals.section = "competitions";
  locals.page.title = "Competitions - SoteTalent";

  view.query(
    "upcomingCompetition",
    Competitions.model
      .findOne()
      .where("state", "active")
      .sort("-startDate"),
    "talks[who]"
  );

  view.query(
    "pastCompetitions",
    Competitions.model
      .find()
      .where("state", "past")
      .sort("-startDate"),
    "talks[who]"
  );

  view.on("render", function(next) {
    if (!req.user || !locals.upcomingCompetition) return next();

    RSVP.model
      .findOne()
      .where("who", req.user._id)
      .where("competition", locals.upcomingCompetition)
      .exec(function(err, rsvp) {
        locals.rsvpStatus = {
          rsvped: rsvp ? true : false,
          attending: rsvp && rsvp.attending ? true : false
        };
        return next();
      });
  });

  view.render("site/competitions");
};
