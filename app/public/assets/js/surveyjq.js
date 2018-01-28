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
				$('#matchname').text(data.name);
				$('#matchphoto').empty();
				$('#matchphoto').append($('<img>')
					.attr('src',data.photo)
					.attr('alt',data.name)
					.addClass('img-responsive')
					.addClass('center-block')
					.addClass('img-thumbnail')
					.attr('style','max-height:275px'));
				$('#matchmodal').modal('show');
			} else {
				console.log('NO MATCH FOUND');
				$('#matchname').text('Sorry, no match found.');
				$('#matchphoto').empty();
				$('#matchmodal').modal('show');
			}

			$('#username').val('');
			$('#photo').val('');
			$(qs).each(function(){
				$('#'+this).find('option:first').attr('selected','selected');
			});
		});
		
	});
});