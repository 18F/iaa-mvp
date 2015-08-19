if (Meteor.isClient) {
  Template.index.onRendered(function() {
    $('main').addClass('l-7600a-index page');
  });
}
