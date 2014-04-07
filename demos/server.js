var express = require('express');
var app = express();

var app_username = 'Murtaza',
    app_password = 'somepassword';

app.use(express.static(__dirname + '/static'));

app.listen(process.env.PORT || 3000, function(err) {
  if (err) {
    console.log('Server couldn\'t be started!', err);
  } else {
    console.log('Server started.');
  }
});

app.get('/validate', function(req, res) {
  var username = req.query.username,
      password = req.query.password,
      response = {
        'error': 1,
        'message': 'Incorrect username or password!'
      };

  if (username === app_username && password === app_password) {
    response.error = 0;
    response.message = '';
    response.nickname = 'Mtz';
  }

  res.send(response);
});