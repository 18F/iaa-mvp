Meteor.startup(function () {
  Meteor.users.update({"orgs": {$exists: false}}, {$set: {orgs: ["18F"]}}, {multi: true});
  Form7600A.update({"org": {$exists: false}}, {$set: {org: "18F"}}, {multi: true});
  Meteor.users.remove({"services.github.username": "dkarpenko"});
});
