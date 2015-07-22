Form7600A = new Mongo.Collection("form7600a");

if (Meteor.isClient) {
  Template.index.events({
    'submit form': function(event) {
      event.preventDefault();
      var id = Form7600A.insert({});
      Router.go('/7600a/' + id + '/edit');      
    }
  });
  
  Template.form_7600a.helpers({
    formValues: function() {
      var controller = Iron.controller();
      return controller.state.get('formValues');
    }
  });
  
  Template.form_7600a.events({
    'submit form': function(event) {
      event.preventDefault();
      var form = $('.form-7600a');
      var formValues = form.serializeJSON();
      var id = formValues.formId;
      var updated = Form7600A.update(id, formValues);
    }
  });
}

if (Meteor.isServer) {
}


/*

<input required="" name="parties-requesting-agency-mailing-address-street-address" id="parties-requesting-agency-mailing-address-street-address" type="text">
*/