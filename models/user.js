if (Meteor.isServer) {
  Meteor.publish("userData", function () {
    if (this.userId) {
      return Meteor.users.find(
        {_id: this.userId},
        {fields: {'services': 1, 'orgs': 1}}
      );
    } else {
      this.ready();
    }
  });
  
  Meteor.publish("allUserData", function () {
    if (this.userId) {
      return Meteor.users.find({}, {fields: {'services.github.username': 1}});
    } else {
      this.ready();
    }
  });
}
