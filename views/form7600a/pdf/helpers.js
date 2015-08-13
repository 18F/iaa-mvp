if (Meteor.isClient) {
  Template.form_7600a_pdf.helpers({
    pdf: function() {
      return Session.get('pdf');
    }
  });
}
