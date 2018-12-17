// $().ready(function () {
// 	$('.easy-autocomplete-container li').each(function () {
// 		$(this).click(function () {
// 			let title = $(this).text()
// 			console.log(title)
// 		})
// 	})
// })

let options = {
	url: function (phrase) {
		return "/autocomplete";
	},

	// getValue: function (result) {
	// 	return result.name;
	// },

	ajaxSettings: {
		dataType: "json",
		method: "POST",
		data: {

		}
	},

	preparePostData: function (data) {
		data.title = $("#search").val();
		return data;
	},

	categories: [{
		listLocation: "title",
		maxNumberOfElements: 3,
		header: "Title"
	}, {
		listLocation: "full_name",
		maxNumberOfElements: 3,
		header: "Full name"
	}],

	getValue: function (element) {
		return element.title;
	},


	list: {
		maxNumberOfElements: 8,
		match: {
			enabled: true
		},
		onClickEvent: function () {
			console.log('PASS')
			$('#search').focus()
		}
		// sort: {
		// 	enabled: true
		// }
	},

	requestDelay: 400,

	theme: "square"
}

$("#search").easyAutocomplete(options);
