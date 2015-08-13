if (Meteor.isClient) {
  Template.form_7600a_pdf.onRendered(function() {
    // fetch the pdf when the page renders
    var controller = Iron.controller();
    var formId = controller.state.get('formId');
    
    GetPDF(formId, function(error, result) {
      if (!error) {
        Session.set('pdf', result.content);
      } else {
        console.log(error);
      }
    });
  });
}
