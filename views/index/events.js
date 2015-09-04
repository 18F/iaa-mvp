if (Meteor.isClient) {
  Template.index.events({
    'submit .create-new-7600a-form': function(event) {
      event.preventDefault();
      var form = $('.create-new-7600a-form');
      var formValues = form.serializeJSON();
      var id = CreateForm7600A(formValues);
      
      form[0].reset();
      window.open('/7600a/' + id + '/edit');
    },
    'submit .delete-7600a-form': function(event) {
      event.preventDefault();
      var id = event.target.id.value;
      Form7600A.remove(id);
    },
    'submit .undelete-7600a-form': function(event) {
      event.preventDefault();
      var id = event.target.id.value;
      Form7600A.unremove(id);
    },
    'submit .generate-7600a-pdf': function(event) {
      event.preventDefault();
      window.open('https://github.com/18F/iaa-forms/raw/master/lib/7600A.pdf');
    }
  });
}
