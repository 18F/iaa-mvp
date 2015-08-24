if (Meteor.isClient) {
  Template.form_7600a.events({
    'submit form': function(event) {
      event.preventDefault();
      var form = $('.form-7600a');
      var formValues = form.serializeJSON();
      var id = formValues.formId;
  
      Form7600A.update(id, formValues);
    }
  });
}
