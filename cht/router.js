module.exports={
	init : function(app){
		app.get(                         '/', function(req, res){
				res.sendFile(__dirname + '/cht.html');});
		app.get(                         '/newc', function(req, res){
				res.sendFile(__dirname + '/newc.html');});
		app.get(                         '/news.js', function(req, res){
				res.sendFile(__dirname + '/news.js');});
		app.get(                         '/newc.js', function(req, res){
				res.sendFile(__dirname + '/newc.js');});
		app.get(                         '/newc.css', function(req, res){
				res.sendFile(__dirname + '/newc.css');});
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
		app.get(                         '/chart.html', function(req, res){
				res.sendFile(__dirname + '/chart.html');});
		app.get(                         '/cht.js', function(req, res){
				res.sendFile(__dirname + '/cht.js');});
		app.get(                         '/cht.css', function(req, res){
				res.sendFile(__dirname + '/cht.css');});
		app.get(                         '/cht.html', function(req, res){
				res.sendFile(__dirname + '/cht.html');});
		app.get(                         '/worker.js', function(req, res){
				res.sendFile(__dirname + '/worker.js');});
		app.get(                         '/logo.png', function(req, res){
				res.sendFile(__dirname + '/logo.png');});

		app.get(                         '/assets/fonts/fa-solid-900.eot', function(req, res){
				res.sendFile(__dirname + '/assets/fonts/fa-solid-900.eot');});
		app.get(                         '/assets/fonts/fa-solid-900.svg', function(req, res){
				res.sendFile(__dirname + '/assets/fonts/fa-solid-900.svg');});
		app.get(                         '/assets/fonts/fa-solid-900.ttf', function(req, res){
				res.sendFile(__dirname + '/assets/fonts/fa-solid-900.ttf');});
		app.get(                         '/assets/fonts/fa-solid-900.woff', function(req, res){
				res.sendFile(__dirname + '/assets/fonts/fa-solid-900.woff');});
		app.get(                         '/assets/fonts/fa-solid-900.woff2', function(req, res){
				res.sendFile(__dirname + '/assets/fonts/fa-solid-900.woff2');});
		app.get(                         '/assets/fonts/Pe-icon-7-stroke.eot', function(req, res){
				res.sendFile(__dirname + '/assets/fonts/Pe-icon-7-stroke.eot');});
		app.get(                         '/assets/fonts/Pe-icon-7-stroke.svg', function(req, res){
				res.sendFile(__dirname + '/assets/fonts/Pe-icon-7-stroke.svg');});
		app.get(                         '/assets/fonts/Pe-icon-7-stroke.ttf', function(req, res){
				res.sendFile(__dirname + '/assets/fonts/Pe-icon-7-stroke.ttf');});
		app.get(                         '/assets/fonts/Pe-icon-7-stroke.woff', function(req, res){
				res.sendFile(__dirname + '/assets/fonts/Pe-icon-7-stroke.woff');});

		app.get(                         '/assets/images/avatars/1.jpg', function(req, res){
				res.sendFile(__dirname + '/assets/images/avatars/1.jpg');});
		app.get(                         '/assets/images/avatars/2.jpg', function(req, res){
				res.sendFile(__dirname + '/assets/images/avatars/2.jpg');});
		app.get(                         '/assets/images/avatars/3.jpg', function(req, res){
				res.sendFile(__dirname + '/assets/images/avatars/3.jpg');});
		app.get(                         '/assets/images/avatars/4.jpg', function(req, res){
				res.sendFile(__dirname + '/assets/images/avatars/4.jpg');});
		app.get(                         '/assets/images/avatars/5.jpg', function(req, res){
				res.sendFile(__dirname + '/assets/images/avatars/5.jpg');});
		app.get(                         '/assets/images/avatars/8.jpg', function(req, res){
				res.sendFile(__dirname + '/assets/images/avatars/8.jpg');});
		app.get(                         '/assets/images/avatars/9.jpg', function(req, res){
				res.sendFile(__dirname + '/assets/images/avatars/9.jpg');});
		app.get(                         '/assets/images/avatars/10.jpg', function(req, res){
				res.sendFile(__dirname + '/assets/images/avatars/10.jpg');});
		app.get(                         '/assets/images/avatars/11.jpg', function(req, res){
				res.sendFile(__dirname + '/assets/images/avatars/11.jpg');});
		app.get(                         '/assets/images/avatars/12.jpg', function(req, res){
				res.sendFile(__dirname + '/assets/images/avatars/12.jpg');});
		app.get(                         '/assets/images/logo.png', function(req, res){
				res.sendFile(__dirname + '/assets/images/logo.png');});
		app.get(                         '/assets/images/node.png', function(req, res){
				res.sendFile(__dirname + '/assets/images/node.png');});
		app.get(                         '/assets/images/temp.png', function(req, res){
				res.sendFile(__dirname + '/assets/images/temp.png');});
		app.get(                         '/assets/images/logos.png', function(req, res){
				res.sendFile(__dirname + '/assets/images/logos.png');});
		app.get(                         '/assets/images/logo-inverse.png', function(req, res){
				res.sendFile(__dirname + '/assets/images/logo-inverse.png');});

		app.get(                         '/assets/scripts/main.js', function(req, res){
				res.sendFile(__dirname + '/assets/scripts/main.js');});
	}
}








