// define collection
Form7600A = new Mongo.Collection("form7600a");

var createForm7600A = function(formValues) {
  // merge in default values
  var mergedFormValues = $.extend(Form7600ADefaults, formValues)
  // hacky timestamps
  var currentTime = new Date();
  mergedFormValues['createdAt'] = currentTime;
  mergedFormValues['updatedAt'] = currentTime;
  return Form7600A.insert(mergedFormValues);
};

var updateForm7600A = function(formValues) {
  // another hacky timestamp
  var currentTime = new Date();
  formValues['updatedAt'] = currentTime;
  var id = formValues.formId;
  // using findAndModify to ensure createdAt and other fields
  // remain unchanged.
  // see: https://github.com/fongandrew/meteor-find-and-modify
  return Form7600A.findAndModify({
    query: {_id: id},
    update: {$set: formValues}
  });
};

var submitForm7600A = function() {
  return $('.form-7600a').submit();
};

var isSelected = function(returnString) {
  return function(v1, v2) {
    var controller = Iron.controller();
    var formValues = controller.state.get('formValues');
    if (formValues[v1] === v2) {
      return returnString;
    } else {
      return '';
    };
  };
};

if (Meteor.isClient) {  
  Template.index.events({
    'submit .create-new-7600a-form': function(event) {
      event.preventDefault();
      var form = $('.create-new-7600a-form');
      var formValues = form.serializeJSON();
      var id = createForm7600A(formValues);
      form[0].reset();
      window.open('/7600a/' + id + '/edit');
    },
    'submit .delete-7600a-form': function(event) {
      event.preventDefault();
      var id = event.target.id.value;
      Form7600A.remove(id);
    },
    'submit .generate-7600a-pdf': function(event) {
      event.preventDefault();
      alert("Coming soon!");
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
  
  Template.form_7600a.onRendered(function() {
    // set autosave timer
    var timer =  setInterval(submitForm7600A, 10000);
    
    // overrides default implementation so shortcuts work
    // inside of input and other elements.
    // see: https://craig.is/killing/mice
    Mousetrap.stopCallback = function(e, element, combo) {
      // never stop callback
      return false;
    }
    // sets up keyboard shortcuts
    // see https://craig.is/killing/mice for preventDefault docs
    Mousetrap.bind(['command+s', 'ctrl+s'], function(e) {
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false; // Internet Explorer
      }
      submitForm7600A();
    });
  });

  Template.form_7600a.helpers({
    formValues: function() {
      var controller = Iron.controller();
      return controller.state.get('formValues');
    },
    /*
    Allows us to access attribute names that have dashes in them.
    */
    d: function(attr) {
      return this[attr];
    },
    usStates: function() {
      return _.map(_.keys(USStates), function(abbrev) {
        return {
          abbrev: abbrev,
          name: USStates[abbrev]
        }
      });
    },
    isStateSelected: isSelected('selected'),
    isRadioChecked: isSelected('checked')
  });

  var updateForm7600AEvent = function(event) {
    Session.set('lastSaved', 'Saving...');
    event.preventDefault();
    var form = $('.form-7600a');
    var formValues = form.serializeJSON();
    updateForm7600A(formValues);
  }

  Template.form_7600a.events({
    'submit form': updateForm7600AEvent
  });
}

if (Meteor.isServer) {
}
