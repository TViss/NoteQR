var mongoose = require('mongoose');
var crypto = require('crypto');
var Qrcode = require('./src/models/qrcodes');
mongoose.connect(process.env.connectionString);
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(process.cwd() + '/public'));
app.get("/qrcodes", function(req, res)
{
	Qrcode.find({}, function(err, qrcodes)
	{		
		if (err) return console.error(err);
		res.send(qrcodes);
	});
});
app.get("/generate", function(req, res)
{
	var secret = 'abcdefg';
  var hash = crypto.createHmac('sha256', secret)
    .update(new Date() + "TEMPORARY")
    .digest('hex');
	console.log(hash);
	var qrcode = new Qrcode({hash: hash});
	qrcode.save(function (err, code)
	{
		if (err) return console.error(err);
		res.send(code);
	});
}
)
app.get("/qrcode/:hash", function(req, res)
{
	Qrcode.findOne({hash: req.params.hash}, function(err, qrcode)
	{
		if (err) return console.error(err);
		res.send(qrcode);
	});
});
app.put("/qrcode/:hash", function(req, res)
{
	console.log(req.body.message);
	Qrcode.findOneAndUpdate({hash: req.params.hash}, {message: req.body.message}, function(err, qrcode)
	{
		if (err) return console.error(err);
		res.send(qrcode);
	});
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
