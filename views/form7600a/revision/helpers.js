if (Meteor.isClient) {
  Template.form_7600a_revision.helpers({
    revision: function() {
      var controller = Iron.controller();
      var formId = controller.state.get('formId');
      var revisionId = controller.state.get('revisionId');
      var form = Form7600A.findOne(formId);
      var revision = _.select(form.history, {md5: revisionId});
      
      return revision;
    },
    formId: function() {
      var controller = Iron.controller();
      var formId = controller.state.get('formId');
      
      return formId;
    }
  });
}