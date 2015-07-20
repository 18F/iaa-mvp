Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {
  template: 'index'
});

Router.route('/7600a/new', {
  template: '7600a_form'
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