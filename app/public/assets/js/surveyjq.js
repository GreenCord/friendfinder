$(document).ready(function(){
	console.log('READY!');

	$('#submit').click(function(e){
		e.preventDefault();
		var qs = ['q1','q2','q3','q4','q5','q6','q7','q8','q9','q10'];
		var answers = {
			name: $('#username').val().trim(),
			photo: $('#photo').val().trim(),
			scores: []
		};
		$(qs).each(function(){
			console.log('Is this id? #'+this);
			answers.scores.push($('#'+this).val());
		});
		console.log('Survey answers',answers);

		$.post('/api/friends', answers, function(data){
			if (data != null) {
				console.log('Found a match');
				console.log(JSON.stringify(data,null,2));
			} else {
				console.log('NO MATCH FOUND');
			}

			// $('#username').val('');
			// $('#photo').val('');
			// $(qs).each(function(){
			// 	$('#'+this).find('option:first').attr('selected','selected');
			// });
		});
		
		// $.ajax({
		// 	url: '/api/friends',
		// 	type: 'POST',
		// 	data: answers,
		// 	contentType: 'application/json; charset=utf-8',
		// 	dataType: 'json'
		// }).done(function(data){
		// 	if (data != null) {
		// 		console.log('Found a match');
		// 	} else {
		// 		console.log('NO MATCH FOUND');
		// 	}

		// 	$('#username').val('');
		// 	$('#photo').val('');
		// 	$(qs).each(function(){
		// 		$('#'+this).find('option:first').attr('selected','selected');
		// 	});
		// });

	});
});