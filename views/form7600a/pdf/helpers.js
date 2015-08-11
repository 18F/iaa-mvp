if (Meteor.isClient) {
  Template.form_7600a_pdf.helpers({
    httpRequest: function() {
      var controller = Iron.controller();
      var formId = controller.state.get('formId');      
      var form = Form7600A.findOne(formId);
      
      // //var url = "http://httpbin.org/post";
      var url = "http://localhost:4000/iaa/7600a";
      var options = {
         data: {
           "servicing_agency_tracking_number": "1234"
         }
      };
      var callback = function(error, result) {
        if (!error) {
          console.log(result);
        } else {
          console.log(error);
        }
      };
      HTTP.post(url, options, callback);
    }
  });  
}
