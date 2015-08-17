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
/* 
 merges without overwriting if key already exists
*/
var merge = function(obj, key, value) {
  var copy = lodash.cloneDeep(obj);
  if (_.has(copy, key)) {
    var oldValue = copy[key];
    copy[key] = oldValue + ' ' + value;
  } else {
    copy[key] = value;
  }
  
  return copy;
};

Form7600AAttributes = [  
  {
    "parties-requesting-agency-mailing-address-state": "requesting_agency_address"
  },
  {
    "parties-requesting-agency-mailing-address-city": "requesting_agency_address"
  },
  {
    "parties-servicing-agency-name": "servicing_agency_name"
  },
  {
    "parties-servicing-agency-mailing-address-street-address": "servicing_agency_address"
  },
  {
    "parties-servicing-agency-mailing-address-city": "servicing_agency_address"
  },
  {
    "parties-servicing-agency-mailing-address-state": "servicing_agency_address"
  },
  {
    "parties-servicing-agency-mailing-address-zip": "servicing_agency_address"
  },
  {
    "parties-requesting-agency-name": "requesting_agency_name_of_products_services"
  },
  {
    "iaa-number": null
  },
  {
    "formId": null
  },
  {
    "parties-requesting-agency-mailing-address-street-address": "requesting_agency_address"
  },
  {
    "parties-requesting-agency-mailing-address-zip": "requesting_agency_address"
  },
  {
    "servicing-agency-tracking-number": "servicing_agency_tracking_number"
  },
  {
    "assisted-acquisition-agreement": null
  },
  {
    "gtc-action": null
  },
  {
    "gtc-action-amendment-explanation": null
  },
  {
    "gtc-action-cancellation-explanation": null
  },
  {
    "agreement-period-start-date": null
  },
  {
    "agreement-period-end-date": null
  },
  {
    "recurring-agreement": null
  },
  {
    "recurring-agreement-period": null
  },
  {
    "recurring-agreement-period-other-description": null
  },
  {
    "agreement-type": null
  },
  {
    "advance-payments": null
  },
  {
    "advance-payments-authority": null
  },
  {
    "estimated-cost": null
  },
  {
    "estimated-overhead": null
  },
  {
    "estimated-total": null
  },
  {
    "estimated-overhead-explanation": null
  },
  {
    "statutory-authority-requesting-agency": null
  },
  {
    "statutory-authority-requesting-agency-authority": null
  },
  {
    "statutory-authority-servicing-agency": null
  },
  {
    "statutory-authority-servicing-agency-authority": null
  },
  {
    "scope": null
  },
  {
    "roles-and-responsibilities": null
  },
  {
    "restrictions": null
  },
  {
    "assisted-acquisition-small-business-credit-clause": null
  },
  {
    "disputes": null
  },
  {
    "termination-days": null
  },
  {
    "termination-additional-terms": null
  },
  {
    "authorized-assistants-requesting-agency": null
  },
  {
    "authorized-assistants-servicing-agency": null
  },
  {
    "clauses-requesting-agency": null
  },
  {
    "clauses-servicing-agency": null
  },
  {
    "additional-agency-attachments": null
  },
  {
    "agency-official-requesting-agency-name": null
  },
  {
    "agency-official-requesting-agency-title": null
  },
  {
    "agency-official-requesting-agency-telephone-number": null
  },
  {
    "agency-official-requesting-agency-fax-number": null
  },
  {
    "agency-official-requesting-agency-email-address": null
  },
  {
    "agency-official-requesting-agency-approval-date": null
  },
  {
    "agency-official-servicing-agency-name": null
  },
  {
    "agency-official-servicing-agency-title": null
  },
  {
    "agency-official-servicing-agency-telephone-number": null
  },
  {
    "agency-official-servicing-agency-fax-number": null
  },
  {
    "agency-official-servicing-agency-email-address": null
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

_.each(_.keys(Form7600AAttributes), function(attribute) {
  schemaHash[attribute] = { type: String };
});

_.extend(schemaHash, 
  Timestamps, 
  Ownership,
  Revisions
);

Form7600ASchema = new SimpleSchema(schemaHash);

TransformForm7600AToPDFAttributes = function(form) {
  var result = {}
  
  var noNulls = _.reject(Form7600AAttributes, function(obj) {
    return _.values(obj)[0] === null;
  });
  _.each(noNulls, function(obj) {
    var key = _.keys(obj)[0];
    var value = _.values(obj)[0];
    
    result = merge(result, value, form[key]);
  });
  
  console.log(result)
  
  return result;
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

