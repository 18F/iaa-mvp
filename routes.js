ApplicationController = RouteController.extend({
  layoutTemplate: 'layout'  
});

Router.configure({
  controller: 'ApplicationController'
});

Form7600AController = ApplicationController.extend({
  action: function() {
    var id = this.params._id;
    var formValues = Form7600A.findOne(id);
    this.state.set('formValues', formValues);
    this.render();
  }
});

Router.route('/', {
  template: 'index'
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