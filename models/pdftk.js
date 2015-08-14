if (Meteor.isServer) {
  
  Meteor.methods({
    fillForm: function(fields) {
      var fdf = Npm.require('fdf');
      var fs = Npm.require('fs');
      var path = Npm.require('path');
      var exec = Npm.require('child_process').exec;
      
      var data = fdf.generate({
        'servicing_agency_tracking_number': '123456789'
      });


      var runCommand = function(error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);

        if(error !== null) {
          console.log('exec error: ' + error);
        }
      };

      // exec("pdftk assets/app/7600A.pdf fill_form assets/app/data.fdf output assets/app/output.pdf", runCommand);
//
//       // exec("pwd", runCommand);
      //exec("ls assets/app/", runCommand);


      var callback = function(error, stdout, stderr) {
        console.log(error, stdout, stderr)
      };

      var makeId = function() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 5; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
      };
      
      var pdfId = makeId();
      
      var pdfFilePath = 'assets/app/out.pdf';
            
      PDFTK.execute(
        [
          'assets/app/7600A.pdf', 
          'fill_form', 
          'assets/app/data.fdf', 
          'output', 
          pdfFilePath
        ], 
        callback
      );
      
      exec("open " + pdfFilePath, runCommand);

      return pdfFilePath;
    }
  });
}