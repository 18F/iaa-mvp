if (Meteor.isClient) {
  Template.form_7600a_pdf.helpers({
    downloadPrompt: function() {
      return Session.get('downloadPrompt');
    }
  });
}
