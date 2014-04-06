var express = require('express');
var app = express();

app.use(express.static(__dirname + '/AngularApp-Todo'));

app.listen(process.env.PORT || 3000);