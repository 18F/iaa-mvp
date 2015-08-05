// define collection
Form7600A = new Mongo.Collection("form7600a");

CreateForm7600A = function(formValues) {
  // merge in default values
  var mergedFormValues = _.extend(Form7600ADefaults, formValues)
  
  // hacky timestamps
  var currentTime = new Date();
  mergedFormValues['createdAt'] = currentTime;
  mergedFormValues['updatedAt'] = currentTime;
  
  mergedFormValues['owner'] = Meteor.userId();
  mergedFormValues['sharedWith'] = [Meteor.userId()];

  // returns the id
  return Form7600A.insert(mergedFormValues);
};

UpdateForm7600A = function(id, formValues) {
  // another hacky timestamp
  var currentTime = new Date();
  formValues['updatedAt'] = currentTime;
  // using findAndModify to ensure createdAt and other fields
  // remain unchanged.
  // see: https://github.com/fongandrew/meteor-find-and-modify
  return Form7600A.findAndModify({
    query: {_id: id},
    update: {$set: formValues}
  });
};

Form7600ADefaults = {
  'parties-requesting-agency-mailing-address-state': 'DC',
  'parties-requesting-agency-mailing-address-city': 'Washington',
  'parties-servicing-agency-name': 'General Services Administration',
  'parties-servicing-agency-mailing-address-street-address': '1800 F. Street NW',
  'parties-servicing-agency-mailing-address-city': 'Washington',
  'parties-servicing-agency-mailing-address-state': 'DC',
  'parties-servicing-agency-mailing-address-zip': '20006'
};