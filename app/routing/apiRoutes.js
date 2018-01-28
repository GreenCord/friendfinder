var friends = require('../data/friends');

module.exports = function(app){
	app
		.get('/api/friends',(req,res)=>res.json(friends))
		.post('/api/friends',(req,res)=>{
			console.log('Post request received on /api/friends');
			console.log(req.body);
			// TODO compare to friends and find match
			res.json(req.body); // do not leave this it's dumb
		});
};