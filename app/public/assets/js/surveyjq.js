$(document).ready(function(){
	console.log('READY!');

	// check to make sure required fields are filled out and validated:
	$('#username').on('blur', function(){
		if ($(this).val()) {
			console.log('Has value');
			$(this).parent().removeClass('has-error').addClass('has-success');
			$('#username-error').hide();
			$('#username-ok').fadeIn();
		} else {
			console.log('Does not have value');
			$(this).parent().removeClass('has-success').addClass('has-error');
			$('#username-ok').hide();
			$('#username-error').fadeIn();
		}
	});


	// Some day I will learn RegEx. Until then, there's StackExchange. 
	// https://stackoverflow.com/questions/2723140/validating-url-with-jquery-without-the-validate-plugin
	function isUrlValid(url) {
	    return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
	} 

	$('#photo').on('blur', function(){
		if (isUrlValid($(this).val().trim())) {
			console.log('is url');
			$(this).parent().removeClass('has-error').addClass('has-success');
			$('#url-error').hide();
			$('#url-ok').fadeIn();
		} else {
			console.log('is not url');
			$(this).parent().removeClass('has-success').addClass('has-error');
			$('#url-ok').hide();
			$('#url-error').fadeIn();
		}
	});

	$('select').on('blur', function(){
		console.log('Value selected: ',$(this).val());
		if ($(this).val()) {
			console.log('select has value', $(this).attr('id'));
			$(this).parent().removeClass('has-error').addClass('has-success');
			$('#'+ $(this).attr('id') +'-error').hide();
			$('#'+ $(this).attr('id') +'-ok').fadeIn();
		} else {
			console.log('select does not have value', $(this).attr('id'));
			$(this).parent().removeClass('has-success').addClass('has-error');
			$('#'+ $(this).attr('id') +'-ok').hide();
			$('#'+ $(this).attr('id') +'-error').fadeIn();
		}
	});

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
				if ($('#'+this).val()) {
					answers.scores.push($('#'+this).val());
				} else {
					answers.scores.push(0);
				}
			});
		if ( (!answers.name) || (answers.scores.indexOf(0) > -1) || (!isUrlValid(answers.photo))) {
			$('#form-error').text('Please correct errors on the form and submit again.');
			$("html, body").animate({ scrollTop: $('#form-error').offset().top }, 1000);
			return;
		} else {
			
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
				$('.has-error').removeClass('has-error');
				$('.has-success').removeClass('has-success');
				$('.glyphicon-ok').hide();
				$('.glyphicon-remove').hide();
				$(qs).each(function(){
					$('#'+this).find('option:first').attr('selected','selected');
				});
			});
		}
		
	});
});