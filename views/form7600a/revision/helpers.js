if (Meteor.isClient) {
  Template.form_7600a_revision.helpers({
    revision: function() {
      var controller = Iron.controller();
      var formId = controller.state.get('formId');
      var revisionId = controller.state.get('revisionId');
      var form = Form7600A.findOne(formId);
      var revision = _.find(form.history, function(rev) {
        return rev['md5'] === revisionId;
      });
      
      var str = '';
      
      _.each(_.keys(revision), function(key) {
        str = str + "<p>" + key + ": " + revision[key] +"</p>";
      });
      
      return str;
    },
    formId: function() {
      var controller = Iron.controller();
      var formId = controller.state.get('formId');
      
      return formId;
    }
  });
}