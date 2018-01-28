var friends = require('../data/friends');

module.exports = function(app){
	app
		.get('/api/friends',(req,res)=>res.json(friends))
		.post('/api/friends',(req,res)=>{
			console.log('Post request received on /api/friends');
		});
};