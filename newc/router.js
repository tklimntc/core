module.exports={
	init : function(app){
		app.get(                         '/', function(req, res){
				res.sendFile(__dirname + '/newc.html');});
		app.get(                         '/newc', function(req, res){
				res.sendFile(__dirname + '/newc.html');});
		app.get(                         '/news.js', function(req, res){
				res.sendFile(__dirname + '/news.js');});
		app.get(                         '/newc.js', function(req, res){
				res.sendFile(__dirname + '/newc.js');});
		app.get(                         '/newc.css', function(req, res){
				res.sendFile(__dirname + '/newc.css');});
		app.get(                         '/favicon.ico', function(req, res){
				res.sendFile(__dirname + '/favicon.ico');});
		app.get(                         '/jquery.js', function(req, res){
				res.sendFile(__dirname + '/jquery.js');});
		app.get(                         '/socket.io.js', function(req, res){
				res.sendFile(__dirname + '/socket.io.js');});
		app.get(                         '/nv.d3.css', function(req, res){
				res.sendFile(__dirname + '/nv.d3.css');});
		app.get(                         '/d3.min.js', function(req, res){
				res.sendFile(__dirname + '/d3.min.js');});
		app.get(                         '/nv.d3.min.js', function(req, res){
				res.sendFile(__dirname + '/nv.d3.min.js');});
		app.get(                         '/bootstrap.min.css', function(req, res){
				res.sendFile(__dirname + '/bootstrap.min.css');});
		app.get(                         '/popper.min.js', function(req, res){
				res.sendFile(__dirname + '/popper.min.js');});
		app.get(                         '/bootstrap.min.js', function(req, res){
				res.sendFile(__dirname + '/bootstrap.min.js');});
		app.get(                         '/bootstrap.bundle.min.js', function(req, res){
				res.sendFile(__dirname + '/bootstrap.bundle.min.js');});

		app.get(                         '/worker.js', function(req, res){
				res.sendFile(__dirname + '/worker.js');});
		app.get(                         '/logo.png', function(req, res){
				res.sendFile(__dirname + '/logo.png');});
	}
}








