// define collection
Form7600A = new Mongo.Collection("form7600a");

Meteor.methods({
  findForm7600AById: function(id) {
    return Form7600A.findOne(id);
  },
  createForm7600A: function(formValues) {
    if (userIsLoggedInWithGitHub(this.userId)) {
      // merge in default values
      var mergedFormValues = _.extend(Form7600ADefaults, formValues)
      // hacky timestamps
      var currentTime = new Date();
      mergedFormValues['owner'] = this.userId;
      mergedFormValues['sharedWith'] = [this.userId];
      mergedFormValues['createdAt'] = currentTime;
      mergedFormValues['updatedAt'] = currentTime;
      // returns the _id
      return Form7600A.insert(mergedFormValues);
    }
  },
  updateForm7600A: function(formValues) {
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
  },
  deleteForm7600A: function(id) {
    Form7600A.remove(id);
  }
});

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
  
  Accounts.ui.config({
    requestPermissions: {
      github: ['repo', 'read:org']
    }
  });

  Meteor.subscribe("all_form7600as");
  
  Template.index.events({
    'submit .create-new-7600a-form': function(event) {
      event.preventDefault();
      var form = $('.create-new-7600a-form');
      var formValues = form.serializeJSON();
      Meteor.call('createForm7600A', formValues, function(err, id) {
        if (err) { console.log(err); }
        form[0].reset();
        window.open('/7600a/' + id + '/edit');
      });
    },
    'submit .delete-7600a-form': function(event) {
      event.preventDefault();
      var id = event.target.id.value;
      Meteor.call('deleteForm7600A', id);
    },
    'submit .generate-7600a-pdf': function(event) {
      event.preventDefault();
      alert("Coming soon!");
    }
  });

  Template.index.helpers({
    forms: function() {
      var controller = Iron.controller();
      var foo = controller.state.get('forms');
      return foo;
    },
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
    Session.set('lastSaved', 'Shaving...');
    event.preventDefault();
    var form = $('.form-7600a');
    var formValues = form.serializeJSON();
    Meteor.call('updateForm7600A', formValues);
  }

  Template.form_7600a.events({
    'submit form': updateForm7600AEvent
  });
}


if (Meteor.isServer) {
  var userIsLoggedInWithGitHub = function(userId) {
    // from: https://gist.github.com/pyrtsa/8270927
    var getIn = function(x, ks) {
      for (var i = 0, n = ks.length; x != null && i < n; i++) x = x[ks[i]];
      return x;
    }
    var get = function(x, path) {
      if (path == '') return x;
      if (path[0] != '.') return;
      return getIn(x, path.slice(1).split(/\./i));
    }
    // In the real world, get this list from the GitHub API ...
    // ... and like maybe cache it somewhere.
    var usernameWhitelist = [
      'adelevie',
      'batemapf',
      'vzvenyach',
      'joshuabailes',
      'andrewmaier'
    ];
    var user = Meteor.users.findOne(userId);
    var username = get(user, ".services.github.username");
    if (_.contains(usernameWhitelist, username)) {
      return true;
    } else {
      return false;
    }
  };
  Meteor.publish("all_form7600as", function () {
    return Form7600A.find();
    // if (userIsLoggedInWithGitHub(this.userId)) {
    //   return Form7600A.find();
    // } else {
    //   this.stop();
    // }
  });
}
