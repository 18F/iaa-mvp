ApplicationController = RouteController.extend({
  layoutTemplate: 'layout'  
});

Router.configure({
  controller: 'ApplicationController',
  notFoundTemplate: 'not_found' 
});

Router.onBeforeAction(function () {
  if (!Meteor.userId()) {
    this.render('landing_page');
  } else {
    this.next();
  }
});

Router.plugin('dataNotFound', {notFoundTemplate: 'not_found'});

Form7600AController = ApplicationController.extend({
  subscriptions: function() {
    return Meteor.subscribe("Form7600A");
  },
  action: function() {
    var id = this.params._id;
    this.state.set('formId', id);
    this.render();
  }
});

IndexController = ApplicationController.extend({
  subscriptions: function() {
    return Meteor.subscribe("Form7600A");
  }, 
  action: function() {
    var forms = Form7600A.find().fetch();
    this.state.set('forms', forms);
    this.render();
  }
});

/* 
  Two primary routes:
*/
Router.route('/', {
  template: 'index',
  controller: 'IndexController'
});

Router.route('/7600a/:_id/edit', {
  template: 'form_7600a',
  controller: 'Form7600AController'
});

/* 
  'static' pages: 
*/
Router.route('/for-agencies', {
  template: 'for-agencies_index'
});

Router.route('/for-agencies/primer', {
  template: 'for-agencies_primer'
});

Router.route('/for-agencies/survey', {
  template: 'for-agencies_survey'
});