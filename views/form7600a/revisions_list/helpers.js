if (Meteor.isClient) {
  Template.form_7600a_revisions_list.helpers({
    revisions: function() {
      var controller = Iron.controller();
      var formId = controller.state.get('formId');
      var form = Form7600A.findOne(formId);
      var revisions = form.history;
      
      return revisions;
    },
    formId: function() {
      var controller = Iron.controller();
      var formId = controller.state.get('formId');
      
      return formId;
    }
  });
}