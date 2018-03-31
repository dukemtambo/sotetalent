const keystone = require("keystone");

const Startup = keystone.list("Startup");

exports = module.exports = function(req, res) {
  var view = new keystone.View(req, res),
    locals = res.locals;

  // locals.section = 'members';
  locals.page.title = "Startups - SoteTalent";

  view.query("startups", Startup.model.find().sort("name"), "members");

  view.render("site/startups");
};
