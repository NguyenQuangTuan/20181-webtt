$('ul.dropdown-menu li a').click(function () {
  let new_tag = $(this).text().toLowerCase().trim()
  let tags = $("#cb-tagsinput").tagsinput('items')
  
  $('#cb-tagsinput').tagsinput('add', $(this).text().toLowerCase().trim())
})