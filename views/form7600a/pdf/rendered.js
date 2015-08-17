if (Meteor.isClient) {
  Template.form_7600a_pdf.onRendered(function() {
    var data = {
      'servicing_agency_tracking_number': 'theData'
    };
    Meteor.call('fillPdf', data, function(error, result) {
      if (!error) {
        var blob = new Blob([result.content], {type: "application/pdf"});
        saveAs(blob, "7600a_filled.pdf");
      } else {
        console.log('error:');
        console.log(error);
      }
    });
  });
}
