const keystone = require("keystone");
const _ = require("lodash");
const moment = require("moment");

const Competition = keystone.list("Competition");
const RSVP = keystone.list("RSVP");

exports = module.exports = function(req, res) {
  var view = new keystone.View(req, res),
    locals = res.locals;

  locals.section = "me";
  locals.page.title = "Profile Settings - SoteTalent";

  view.query(
    "nextCompetition",
    Competition.model
      .findOne()
      .where("state", "active")
      .sort("startDate"),
    "talks[who]"
  );

  view.query(
    "rsvps.history",
    RSVP.model
      .find()
      .where("who", req.user)
      .where("attending", true)
      .populate("competition")
      .sort("-createdAt")
  );

  view.on("post", { action: "profile.details" }, function(next) {
    req.user.getUpdateHandler(req).process(
      req.body,
      {
        fields:
          "name, email, notifications.competitions, notifications.posts," +
          "website, isPublic, bio, photo," +
          "mentoring.available, mentoring.free, mentoring.paid, mentoring.swap, mentoring.have, mentoring.want",
        flashErrors: true
      },
      function(err) {
        if (err) {
          return next();
        }

        req.flash("success", "Your changes have been saved.");
        return next();
      }
    );
  });

  view.on("init", function(next) {
    if (!_.has(req.query, "disconnect")) return next();

    var serviceName = "";

    switch (req.query.disconnect) {
      case "github":
        req.user.services.github.isConfigured = null;
        serviceName = "GitHub";
        break;
      case "facebook":
        req.user.services.facebook.isConfigured = null;
        serviceName = "Facebook";
        break;
      case "google":
        req.user.services.google.isConfigured = null;
        serviceName = "Google";
        break;
      case "twitter":
        req.user.services.twitter.isConfigured = null;
        serviceName = "Twitter";
        break;
    }

    req.user.save(function(err) {
      if (err) {
        req.flash(
          "success",
          "The service could not be disconnected, please try again."
        );
        return next();
      }

      req.flash(
        "success",
        serviceName + " has been successfully disconnected."
      );
      return res.redirect("/me");
    });
  });

  view.on("post", { action: "profile.password" }, function(next) {
    if (!req.body.password || !req.body.password_confirm) {
      req.flash("error", "Please enter a password.");
      return next();
    }

    req.user.getUpdateHandler(req).process(
      req.body,
      {
        fields: "password",
        flashErrors: true
      },
      function(err) {
        if (err) {
          return next();
        }

        req.flash("success", "Your changes have been saved.");
        return next();
      }
    );
  });

  view.render("site/me");
};
