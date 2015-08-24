if (Meteor.isClient) {
  Template.form_7600a_pdf_download.helpers({
    downloadPrompt: function() {
      return Session.get('downloadPrompt');
    },
    form: function() {
      var controller = Iron.controller();
      var formId = controller.state.get('formId');
      var form = Form7600A.collection.findOne(formId);
      
      return form;
    }
  });
}
