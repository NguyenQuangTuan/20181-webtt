
$('form#sign-up-form')
.validate({
  rules: {
    email: {
      required: true,
      email: true
    },
    password: {
      required: true,
      minlength: 6
    },
    full_name: {
      required: true,
    }
  },
  submitHandler: function (form) {
    $(form).ajaxSubmit({
      success: function (response) {
        debugger
        if (response == true) {
          window.location.href = '/home';
        } else {
          $(form).parent().find('.form-error').html('Sorry, something is wrong. Please reaload this page and try again.').css({ 'opacity': 1, 'display': 'block' });
        }
      },
      error: function (error) {
        debugger
        console.log(error) 
        if (error.status == 401) {
          $(form).parent().find('.form-error').html('Wrong Email or Password').css({ 'opacity': 1, 'display': 'block' });
        } else {
          $(form).parent().find('.form-error').html('Sorry, something is wrong. Please reaload this page and try again.').css({ 'opacity': 1, 'display': 'block' });
        }
      },
    })
  }
});
