if (Meteor.isClient) {
  Template.index.helpers({
    myForm7600as: function() {
      return Form7600A.find({owner: Meteor.userId()});
    },
    theirForm7600as: function() {
      return Form7600A.find(
        {owner: {$ne: Meteor.userId()}}
      );
    },
    d: function(attr) {
      return this[attr];
    },
    usernameFromUserId: function(userId) {
      var user = Meteor.users.findOne({_id: userId});
      return user.services.github.username;
    }
  });
}
