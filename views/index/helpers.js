if (Meteor.isClient) {
  Template.index.helpers({
    form7600as: function() {
      return Form7600A.collection.find();
    },
    d: function(attr) {
      return this[attr];
    }
  });
}
