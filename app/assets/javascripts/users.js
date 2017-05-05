$(document).ready(function() {
console.log('foo');

$("#project").change(function(){
	var project_name = $(this).val();
	console.log("project_name: " + project_name);
	build_tasks(project_name);	
});

build_tasks = function(project_name) {
	var my_url;
	$('#task').find('option').remove();
	my_url = "/project_tasks?project="+ project_name ;
	console.log("my_url: "+my_url)
	return $.ajax(my_url, {
	  data: {},
	  type: 'GET',
	  dataType: 'json',
	  success: function(data, textStatus, jqXHR) {
	  	var $my_data, i, item, len, results;
			$my_data = data;
			console.log("data is  " + data.length + " my_data is  " + $my_data.length);
			results = [];
			for (i = 0, len = $my_data.length; i < len; i++) {
				item = $my_data[i];
				console.log("data is " + item);
				results.push($('#task').append($("<option></option>").attr("value", item).text(item)));
			}
			return results;
			}
	});
};










} );