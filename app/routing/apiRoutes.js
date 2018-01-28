var friends = require('../app/data/friends.js');

module.exports = function(app){
	app
		.get('/api/friends',(res,req)=>res.json(friends))
		.post('/api/friends',(res,req)=>{
			console.log('Post request received on /api/friends');
		});
};