ApplicationController = RouteController.extend({
  layoutTemplate: 'layout'  
});

Router.configure({
  controller: 'ApplicationController',
  notFoundTemplate: 'not_found' 
});

Router.onBeforeAction(function () {
  // all properties available in the route function
  // are also available here such as this.params

  if (!Meteor.userId()) {
    // if the user is not logged in, render the Login template
    this.render('landing_page');
  } else {
    // otherwise don't hold up the rest of hooks or our route/action function
    // from running
    this.next();
  }
});

Router.plugin('dataNotFound', {notFoundTemplate: 'not_found'});

Form7600AController = ApplicationController.extend({
  action: function() {
    var id = this.params._id;
    var formValues = Form7600A.findOne(id);
    this.state.set('formValues', formValues);
    this.render();
  }
});

IndexController = ApplicationController.extend({
  action: function() {
    var forms = Form7600A.find().fetch();
    console.log(forms);
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