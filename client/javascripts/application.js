$(document).ready(function(){

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