if (Meteor.isClient) {
  Template.form_7600a.onRendered(function() {
    $('main').attr('class', '');
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

  $('body').addClass('branches');
  
    branches = $('.branch');
    branches.hide();

    $('fieldset[data-branch-name]').each(function(){
      this.fields = $(this).find('.field-radio input[type="radio"]');
      this.fields.change(function(){
        branchName = $(this).parents('fieldset[data-branch-name]').attr('data-branch-name');
        value = $(this).attr('value');
        branches.filter('.branch[data-branch-name=' + branchName + ']').attr('disabled', 'disabled').hide();
        branches.filter('.branch[data-branch-name=' + branchName + '][data-branch-value~=' + value + ']').removeAttr('disabled').show();
      });
    });

    $('.field input, .field textarea, .field select').focus(function(){ $(this).parents('.field').addClass('is-focused'); });
    $('.field input, .field textarea, .field select').blur(function(){ $(this).parents('.field').removeClass('is-focused'); });

  });
}

