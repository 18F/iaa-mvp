RenderPdfPage = function(pdfCtx, pageNumber, canvasId) {
  pdfCtx.getPage(pageNumber).then(function getPageHelloWorld(page) {
      var scale = 1;
      var viewport = page.getViewport(scale);

      // Prepare canvas using PDF page dimensions
      var canvas = document.getElementById(canvasId);
      var context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      // Render PDF page into canvas context
      page.render({canvasContext: context, viewport: viewport}).promise.then(function () {
         // ...
      });
  });
};