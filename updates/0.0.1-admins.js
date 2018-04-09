/* eslint-disable new-cap */
const keystone = require('keystone');
const async = require('async');

const User = keystone.list('User');

const admins = [{ email: 'user@keystonejs.com', password: 'admin', name: { first: 'Admin', last: 'User' } }];

function createAdmin(admin, done) {
  User.model.findOne({ email: admin.email }).exec((err, user) => {
    admin.isAdmin = true;
    new User.model(admin).save(err => {
      if (err) {
        console.error(`Error adding admin ${admin.email} to the database:`);
        console.error(err);
      } else {
        console.log(`Added admin ${admin.email} to the database.`);
      }
      done();
    });
  });
}

exports = function(done) {
  async.forEach(admins, createAdmin, done);
};

module.exports = function(done) {
  async.forEach(admins, createAdmin, done);
};
