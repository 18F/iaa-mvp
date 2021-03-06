if (Meteor.isClient) {  
  Template.form_7600a_pdf.onRendered(function() {
    var self = this;
    
    self.autorun(function() {
      var controller = Iron.controller();    
      var formId = controller.state.get('formId');   
      var form = Form7600A.findOne({_id: formId});
    
      var url = 'https://iaa-pdf-api.18f.gov/iaa/7600a';
      var options = {
        data: TransformForm7600AToPDFAttributes(form),
        responseType: 'blob'
      };

      var callback = function(error, result) {
        if (!error) {
          var blob = result.content;
          var canvases = ['pdfcanvas1', 'pdfcanvas2', 'pdfcanvas3', 'pdfcanvas4'];
          Render7600APDFFromBlob(blob, canvases);
        } else {
          alert('There was an error rendering the PDF: ' + error);
        }
      };

      HTTP.post(url, options, callback);
    });
  });
}
