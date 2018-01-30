var friends = require('../data/friends');

module.exports = function(app){
	app
		.get('/api/friends',(req,res)=>res.json(friends))
		.post('/api/friends',(req,res)=>{
			console.log('Post request received on /api/friends');
			console.log('Body Scores:',req.body['scores[]']);
			// console.log('Friends:',friends);
			var userScores = req.body['scores[]'];
			var newFriend = {
				name: req.body.name,
				photo: req.body.photo,
				scores: userScores
			};
			var friendMatch = [];
			// compare to friends and find match
			console.log('Comparing to friends...');
			for (var i = 0; i < friends.length; i++) {
				console.log('Friend: ',friends[i]);
				var totalDifference = 0;
				
				for (var j = 0; j < friends[i].scores.length; j++) {
					// console.log('Comparing friend to user, question ',j);
					// console.log(Math.abs(friends[i].scores[j] - req.body['scores[]'][j]));
					totalDifference += Math.abs(friends[i].scores[j] - userScores[j]);
				}
				console.log('Total Difference',totalDifference);
				// add to match if difference is less than current match
				if (friendMatch.length > 0) {
					if (totalDifference < friendMatch[0]) {
						friendMatch[0] = totalDifference;
						friendMatch[1] = friends[i];
					}
				} else {
					// first friend matched
					friendMatch[0] = totalDifference;
					friendMatch[1] = friends[i];
				}
			}
			console.log('Final Match: ',friendMatch[1]);
			friends.push(newFriend);
			console.log('Added new friend: ',friends);
			res.json(friendMatch[1]);
		});
};