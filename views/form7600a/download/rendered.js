if (Meteor.isClient) {  
  Template.form_7600a_pdf_download.onRendered(function() {
    Session.set('downloadPrompt', 'Your download will begin shortly.')
    var controller = Iron.controller();    
    var formId = controller.state.get('formId');   
    var form = Form7600A.collection.findOne({_id: formId});
    
    Form7600A.download(form);
    Session.set('downloadPrompt', 'Your form has downloaded. You can refresh the page to download again.'); 
  });
}