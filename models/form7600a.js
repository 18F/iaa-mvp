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

if (Meteor.isServer) {
  Meteor.publish("Form7600A", function () {
    return Form7600A.find({owner: this.userId});
  });
  
  Form7600A.allow({
    update: function(userId, doc, fields, modifier) {
      return doc.owner === userId;
    },
    insert: function (userId, doc) {
      return (userId && doc.owner === userId);
    },
    remove: function (userId, doc) {
      return doc.owner === userId;
    }
  });
}

Form7600AAttributes = [  
  "parties-requesting-agency-mailing-address-state",
  "parties-requesting-agency-mailing-address-city",
  "parties-servicing-agency-name",
  "parties-servicing-agency-mailing-address-street-address",
  "parties-servicing-agency-mailing-address-city",
  "parties-servicing-agency-mailing-address-state",
  "parties-servicing-agency-mailing-address-zip",
  "parties-requesting-agency-name",
  "iaa-number",
  "formId",
  "parties-requesting-agency-mailing-address-street-address",
  "parties-requesting-agency-mailing-address-zip",
  "servicing-agency-tracking-number",
  "assisted-acquisition-agreement",
  "gtc-action",
  "gtc-action-amendment-explanation",
  "gtc-action-cancellation-explanation",
  "agreement-period-start-date",
  "agreement-period-end-date",
  "recurring-agreement",
  "recurring-agreement-period",
  "recurring-agreement-period-other-description",
  "agreement-type",
  "advance-payments",
  "advance-payments-authority",
  "estimated-cost",
  "estimated-overhead",
  "estimated-total",
  "estimated-overhead-explanation",
  "statutory-authority-requesting-agency",
  "statutory-authority-requesting-agency-authority",
  "statutory-authority-servicing-agency",
  "statutory-authority-servicing-agency-authority",
  "scope",
  "roles-and-responsibilities",
  "restrictions",
  "assisted-acquisition-small-business-credit-clause",
  "disputes",
  "termination-days",
  "termination-additional-terms",
  "authorized-assistants-requesting-agency",
  "authorized-assistants-servicing-agency",
  "clauses-requesting-agency",
  "clauses-servicing-agency",
  "additional-agency-attachments",
  "agency-official-requesting-agency-name",
  "agency-official-requesting-agency-title",
  "agency-official-requesting-agency-telephone-number",
  "agency-official-requesting-agency-fax-number",
  "agency-official-requesting-agency-email-address",
  "agency-official-requesting-agency-approval-date",
  "agency-official-servicing-agency-name",
  "agency-official-servicing-agency-title",
  "agency-official-servicing-agency-telephone-number",
  "agency-official-servicing-agency-fax-number",
  "agency-official-servicing-agency-email-address"
];

Timestamps = {
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  }
};

Ownership = {
  owner: {
    type: String,
    optional: false
  },
  sharedWith: {
    type: [Object]
  }
};

var schemaHash = {};

_.each(Form7600AAttributes, function(attribute) {
  schemaHash[attribute] = { type: String };
});

_.extend(
  schemaHash, 
  Timestamps, 
  Ownership
);

Form7600ASchema = new SimpleSchema(schemaHash);
