// define collection
Form7600A = new Mongo.Collection("form7600a");

CreateForm7600A = function(formValues) {
  // merge in default values
  var mergedFormValues = _.extend(Form7600ADefaults, formValues)
  
  // hacky timestamps
  var currentTime = new Date();
  mergedFormValues['createdAt'] = currentTime;
  mergedFormValues['updatedAt'] = currentTime;
  
  // ownership fields
  mergedFormValues['owner'] = Meteor.userId();
  mergedFormValues['sharedWith'] = [Meteor.userId()];

  // versioning fields
  // start with an empty revisions history
  var clone = _.clone(mergedFormValues);
  mergedFormValues['history'] = [];

  // returns the id
  return Form7600A.insert(mergedFormValues);
};

UpdateForm7600A = function(id, formValues) {
  // get current revision history
  var form = Form7600A.findOne(id);  
  var historyGlob = form.history;
  
  // add the soon-to-be-outdated form to revision history
  // omit the history so we don't infinitely nest it
  historyGlob.push(_.omit(form, 'history'));
  
  // add the history to the formValues object
  formValues['history'] = historyGlob;
  
  // another hacky timestamp
  var currentTime = new Date();
  formValues['updatedAt'] = currentTime;
  
  return Form7600A.update(id, {
    "$set": formValues
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
  {
    "ui": "parties-requesting-agency-mailing-address-state",
    "pdf": "requesting_agency_address"
  },
  {
    "ui": "parties-requesting-agency-mailing-address-city",
    "pdf": "requesting_agency_address"
  },
  {
    "ui": "parties-servicing-agency-name",
    "pdf": "servicing_agency_name"
  },
  {
    "ui": "parties-servicing-agency-mailing-address-street-address",
    "pdf": "servicing_agency_address"
  },
  {
    "ui": "parties-servicing-agency-mailing-address-city",
    "pdf": "servicing_agency_address"
  },
  {
    "ui": "parties-servicing-agency-mailing-address-state",
    "pdf": "servicing_agency_address"
  },
  {
    "ui": "parties-servicing-agency-mailing-address-zip",
    "pdf": "servicing_agency_address"
  },
  {
    "ui": "parties-requesting-agency-name",
    "pdf": "requesting_agency_name_of_products_services"
  },
  {
    "ui": "iaa-number"
  },
  {
    "ui": "formId"
  },
  {
    "ui": "parties-requesting-agency-mailing-address-street-address",
    "pdf": "requesting_agency_address"
  },
  {
    "ui": "parties-requesting-agency-mailing-address-zip",
    "pdf": "requesting_agency_address"
  },
  {
    "ui": "servicing-agency-tracking-number",
    "pdf": "servicing_agency_tracking_number"
  },
  {
    "ui": "assisted-acquisition-agreement"
  },
  {
    "ui": "gtc-action"
  },
  {
    "ui": "gtc-action-amendment-explanation"
  },
  {
    "ui": "gtc-action-cancellation-explanation"
  },
  {
    "ui": "agreement-period-start-date"
  },
  {
    "ui": "agreement-period-end-date"
  },
  {
    "ui": "recurring-agreement"
  },
  {
    "ui": "recurring-agreement-period"
  },
  {
    "ui": "recurring-agreement-period-other-description"
  },
  {
    "ui": "agreement-type"
  },
  {
    "ui": "advance-payments"
  },
  {
    "ui": "advance-payments-authority"
  },
  {
    "ui": "estimated-cost"
  },
  {
    "ui": "estimated-overhead"
  },
  {
    "ui": "estimated-total"
  },
  {
    "ui": "estimated-overhead-explanation"
  },
  {
    "ui": "statutory-authority-requesting-agency"
  },
  {
    "ui": "statutory-authority-requesting-agency-authority"
  },
  {
    "ui": "statutory-authority-servicing-agency"
  },
  {
    "ui": "statutory-authority-servicing-agency-authority"
  },
  {
    "ui": "scope"
  },
  {
    "ui": "roles-and-responsibilities"
  },
  {
    "ui": "restrictions"
  },
  {
    "ui": "assisted-acquisition-small-business-credit-clause"
  },
  {
    "ui": "disputes"
  },
  {
    "ui": "termination-days"
  },
  {
    "ui": "termination-additional-terms"
  },
  {
    "ui": "authorized-assistants-requesting-agency"
  },
  {
    "ui": "authorized-assistants-servicing-agency"
  },
  {
    "ui": "clauses-requesting-agency"
  },
  {
    "ui": "clauses-servicing-agency"
  },
  {
    "ui": "additional-agency-attachments"
  },
  {
    "ui": "agency-official-requesting-agency-name"
  },
  {
    "ui": "agency-official-requesting-agency-title"
  },
  {
    "ui": "agency-official-requesting-agency-telephone-number"
  },
  {
    "ui": "agency-official-requesting-agency-fax-number"
  },
  {
    "ui": "agency-official-requesting-agency-email-address"
  },
  {
    "ui": "agency-official-requesting-agency-approval-date"
  },
  {
    "ui": "agency-official-servicing-agency-name"
  },
  {
    "ui": "agency-official-servicing-agency-title"
  },
  {
    "ui": "agency-official-servicing-agency-telephone-number"
  },
  {
    "ui": "agency-official-servicing-agency-fax-number"
  },
  {
    "ui": "agency-official-servicing-agency-email-address"
  }
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

Revisions = {
  history: {
    type: [Object]
  }
}

var schemaHash = {};

_.each(_.pluck(Form7600AAttributes, "ui"), function(attribute) {
  schemaHash[attribute] = { type: String };
});

_.extend(schemaHash, 
  Timestamps, 
  Ownership,
  Revisions
);

Form7600ASchema = new SimpleSchema(schemaHash);

TransformForm7600AToPDFAttributes = function(form) {
  return {
    servicing_agency_tracking_number: 'staticData'
  };
};

if (Meteor.isClient) {
  DownloadForm7600A = function(form) {
    
    var savePdf = function(pdf) {
      var blob = new Blob([pdf], {type: "application/pdf"});
      saveAs(blob, "7600a_filled.pdf");
    };
    
    var url = 'https://iaa-pdf-api.18f.gov/iaa/7600a';
    var options = {
      data: TransformForm7600AToPDFAttributes(form),
      responseType: 'blob'
    };
    var callback = function(error, result) {
      if (!error) {
        savePdf(result.content);
      } else {
        alert('There was an error downloading the PDF: ' + error);
      }
    };

    HTTP.post(url, options, callback);
  };
}

