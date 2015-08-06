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
  }
});

Form7600ARevisionsListController = ApplicationController.extend({
  subscriptions: function() {
    return Meteor.subscribe("Form7600A");
  },
  action: function() {
    var id = this.params._id;
    this.state.set('formId', id);
    this.render();
  }
});

Form7600ARevisionController = ApplicationController.extend({
  subscriptions: function() {
    return Meteor.subscribe("Form7600A");
  },
  action: function() {
    var id = this.params._id;
    var revisionId = this.params._revision_id;
    this.state.set('formId', id);
    this.state.set('revisionId', revisionId);
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

Router.route('/7600a/:_id/revisions', {
  template: 'form_7600a_revisions_list',
  controller: 'Form7600ARevisionsListController'
});

Router.route('/7600a/:_id/revisions/:_revision_id', {
  template: 'form_7600a_revision',
  controller: 'Form7600ARevisionController'
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