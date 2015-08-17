if (Meteor.isServer) {
  var exec = Npm.require('child_process').exec;
  
  Meteor.methods({
    fillPdf: function(data) {
      var url = 'https://iaa-pdf-api.18f.gov/iaa/7600a';
      var options = {
        data: data
      };
      
      return HTTP.post(url, options);
    }
  });
}