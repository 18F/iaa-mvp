if (Meteor.isClient) {
  Template.form_7600a_pdf.onRendered(function() {
    // fetch the pdf when the page renders
    var controller = Iron.controller();
    var formId = controller.state.get('formId');
    
    PDFJS.workerSrc = '/packages/pascoual_pdfjs/build/pdf.worker.js';
    
    
    GetPDF(formId, function(error, result) {
      if (!error) {
        var str = result.content;
        uint=new Uint8Array(str.length);
        for(var i=0,j=str.length;i<j;++i){
          uint[i]=str.charCodeAt(i);
        }
        
        console.log(uint);
        
        PDFJS.getDocument(uint).then(function(pdf) {
          pdf.getPage(1).then(function getPageHelloWorld(page) {
            var scale = 1;
            var viewport = page.getViewport(scale);

            // Prepare canvas using PDF page dimensions
            var canvas = document.getElementById('pdfcanvas');
            var context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // Render PDF page into canvas context
            page.render({canvasContext: context, viewport: viewport}).promise.then(function () {
                //...
            });
          });
        });
      } else {
        console.log(error);
      }
    });
  });
}
