Form7600A = new Mongo.Collection("form7600a");

if (Meteor.isClient) {
  Template.index.events({
    'submit form': function(event) {
      event.preventDefault();
      var id = Form7600A.insert({});
      //Router.go('/7600a/' + id + '/edit');
      window.open('/7600a/' + id + '/edit');
    }
  });

  Template.index.helpers({
    form7600as: function() {
      return Form7600A.find();
    },
    d: function(attr) {
      return this[attr];
    }
  });

  Template.form_7600a.helpers({
    lastSaved: function() {
      if (!Session.get('lastSaved')) {
        var controller = Iron.controller();
        var lastSaved = controller.state.get('lastSaved');
        Session.set('lastSaved', lastSaved);
      }

      return Session.get('lastSaved');
    },
    formValues: function() {
      var controller = Iron.controller();
      return controller.state.get('formValues');
    },
    /*
    Allows us to access attribute names that have dashes in them.
    */
    d: function(attr) {
      return this[attr];
    }
  });

  var updateForm7600A = function(event) {
    Session.set('lastSaved', 'Saving...');
    event.preventDefault();
    var form = $('.form-7600a');
    var formValues = form.serializeJSON();
    var id = formValues.formId;
    var updated = Form7600A.update(id, formValues);
    var currentTime = new Date().toString();
    Session.set('lastSaved', 'Last saved at ' + currentTime);
  }

  Template.form_7600a.events({
    'submit form': function(event) {
      updateForm7600A(event);
    }
  });
}

if (Meteor.isServer) {
}
