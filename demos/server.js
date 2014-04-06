var express = require('express');
var app = express();

app.use(express.static(__dirname + '/static'));

app.listen(process.env.PORT || 3000, function(err) {
	if (err) {
		console.log('Server couldn\'t be started!', err);
	} else {
		console.log('Server started.');
	}
});