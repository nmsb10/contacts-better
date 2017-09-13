// Include Server Dependencies
//import express from 'express';
var express = require('express');
//var bodyParser = require("body-parser");

// Create Instance of Express
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('./public'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, function() {
	console.log('app listening on PORT: ' + PORT);
});