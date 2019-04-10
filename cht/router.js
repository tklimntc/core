module.exports={
		init : function(app){
				app.get(                         '/', function(req, res){
						res.sendFile(__dirname + '/index.html');});
				app.get(                         '/index.html', function(req, res){
						res.sendFile(__dirname + '/index.html');});
				app.get(                         '/index.js', function(req, res){
						res.sendFile(__dirname + '/index.js');});
				app.get(                         '/index.css', function(req, res){
						res.sendFile(__dirname + '/index.css');});
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
 
				app.get(                         '/assets/scripts/main.js', function(req, res){
						res.sendFile(__dirname + '/assets/scripts/main.js');});
				app.get(                         '/main.css', function(req, res){
						res.sendFile(__dirname + '/main.css');});
				app.get(                         '/main.js', function(req, res){
						res.sendFile(__dirname + '/main.js');});
				app.get(                         '/assets/scripts/main.css', function(req, res){
						res.sendFile(__dirname + '/assets/scripts/main.css');});
				app.get(                         '/assets/images/avatars/1.jpg', function(req, res){
						res.sendFile(__dirname + '/assets/images/avatars/1.jpg');});
				app.get(                         '/charts-chartjs.html', function(req, res){
						res.sendFile(__dirname + '/charts-chartjs.html');});
				app.get(                         '/worker.js', function(req, res){
						res.sendFile(__dirname + '/worker.js');});
				app.get(                         '/logo.png', function(req, res){
						res.sendFile(__dirname + '/logo.png');});
		}
}