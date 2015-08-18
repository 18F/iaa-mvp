if (Meteor.isClient) {
  Template.form_7600a.onRendered(function() {
    $('main').addClass('l-7600a-new');
    // set autosave timer
    // Disabling per bug report from Eric Mill
    // var timer =  setInterval(submitForm7600A, 10000);
    
    // overrides default implementation so shortcuts work
    // inside of input and other elements.
    // see: https://craig.is/killing/mice
    Mousetrap.stopCallback = function(e, element, combo) {
      // never stop callback
      return false;
    }
    // sets up keyboard shortcuts
    // see https://craig.is/killing/mice for preventDefault docs
    Mousetrap.bind(['command+s', 'ctrl+s'], function(e) {
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false; // Internet Explorer
      }
      $('.form-7600a').submit();
    });

    $('.field input, .field textarea, .field select').focus(function(){ $(this).parents('.field').addClass('is-focused'); });
    $('.field input, .field textarea, .field select').blur(function(){ $(this).parents('.field').removeClass('is-focused'); });


  });
}

