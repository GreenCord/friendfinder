var path = require('path');

module.exports = function(app){
	app
		.get('/assets/css/style.css',(req,res)=>res.sendFile(path.join(__dirname,'../public/assets/css/style.css')))
		.get('/assets/img/:filename',(req,res)=>res.sendFile(path.join(__dirname,'../public/assets/img/' + req.params.filename)))
		.get('/assets/js/:filename',(req,res)=>res.sendFile(path.join(__dirname,'../public/assets/js/' + req.params.filename)))
		.get('/survey',(req,res)=>res.sendFile(path.join(__dirname,'../public/survey.html')))
		.get('*',(req,res)=>res.sendFile(path.join(__dirname,'../public/home.html')));
};