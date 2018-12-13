$('ul.dropdown-menu li a').click(function () {
  $('#cb-tagsinput').tagsinput('add', $(this).text().toLowerCase().trim())
})