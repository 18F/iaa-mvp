if (Meteor.isClient) {  
  Template.form_7600a_pdf.onRendered(function() {
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
        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function() {
          var dataUri = reader.result;
          var binaryDataUri = ConvertDataURIToBinary(dataUri);
          
          PDFJS.workerSrc = '/packages/pascoual_pdfjs/build/pdf.worker.js';
          PDFJS.getDocument(url).then(function getPdfHelloWorld(pdf) {            
              RenderPdfPage(pdf, 1, 'pdfcanvas1');
              RenderPdfPage(pdf, 2, 'pdfcanvas2');
              RenderPdfPage(pdf, 3, 'pdfcanvas3');
              RenderPdfPage(pdf, 4, 'pdfcanvas4');
          });       
        };    
      } else {
        alert('There was an error downloading the PDF: ' + error);
      }
    };

    HTTP.post(url, options, callback);
  });
}
