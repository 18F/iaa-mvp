var isSelected = function(returnString) {
  return function(v1, v2) {
    var controller = Iron.controller();
    var formId = controller.state.get('formId');
    var formValues = Form7600A.findOne(formId);
    if (formValues[v1] === v2) {
      return returnString;
    } else {
      return '';
    };
  };
};

if (Meteor.isClient) {
  Template.form_7600a.helpers({
    formValues: function() {
      var controller = Iron.controller();
      var formId = controller.state.get('formId');      
      var form = Form7600A.findOne(formId);
      
      return form;
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
}