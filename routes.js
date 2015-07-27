ApplicationController = RouteController.extend({
  layoutTemplate: 'layout'  
});

Router.configure({
  controller: 'ApplicationController',
  notFoundTemplate: 'not_found' 
});

Router.plugin('dataNotFound', {notFoundTemplate: 'not_found'});


Form7600AController = ApplicationController.extend({
  action: function() {
    var id = this.params._id;
    var ctx = this;
    Meteor.call('findForm7600AById', id, function(error, formValues) {
      if (error) {
        ctx.state.set('error', error);
      } else {
        ctx.state.set('formValues', formValues);
        ctx.render();
      }
    });
  }
});

IndexController = ApplicationController.extend({
  action: function() {
    //var ctx = this;
    // Meteor.call('findAllForm7600As', function(error, forms) {
    //   if (error) {
    //     ctx.state.set('error', error);
    //   } else {
    //     ctx.state.set('forms', forms);
    //     ctx.render();
    //   }
    // });
    // Meteor.call('getAll7600AForms', function(error, result) {
    //   ctx.state.set('forms', result);
    //   ctx.render();
    // });
    var forms = Form7600A.find();
    console.log(forms);
    this.state.set('forms', forms)
    this.render();
  }
});

Router.route('/', {
  template: 'index',
  controller: 'IndexController'
});

Router.route('/7600a/:_id/edit', {
  template: 'form_7600a',
  controller: 'Form7600AController'
});

Router.route('/7600a/list', {
  template: '7600a_list'
});

Router.route('/for-agencies', {
  template: 'for-agencies_index'
});

Router.route('/for-agencies/primer', {
  template: 'for-agencies_primer'
});

Router.route('/for-agencies/survey', {
  template: 'for-agencies_survey'
});