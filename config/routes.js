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
    return [
      Meteor.subscribe("Form7600A"),
      Meteor.subscribe("userData"),
      Meteor.subscribe("allUserData")
    ];
  },
  action: function() {
    if (this.ready()) {    
      var id = this.params._id;
      this.state.set('formId', id);
      this.render();
    } else {
      this.render('Loading');
    }
  }
});

IndexController = ApplicationController.extend({
  subscriptions: function() {
    return [
      Meteor.subscribe("Form7600A"),
      Meteor.subscribe("userData"),
      Meteor.subscribe("allUserData")
    ];
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

Router.route('/7600a/:_id/pdf', {
  template: 'form_7600a_pdf',
  controller: 'Form7600AController'
});

Router.route('/7600a/:_id/pdf/download', {
  template: 'form_7600a_pdf_download',
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
