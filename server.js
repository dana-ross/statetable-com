var http = require('http');
var express = require('express');
var fs = require('fs');
var csv = require('csv');
var StateTableFormatter = require('StateTableFormatter');

// Express
var app = express();
app.set('views', __dirname);
app.set('view engine', 'ejs');
app.use(express.errorHandler({ dumpExceptions:false, showStack:false }));

// Static resource passthrough
app.use("/js", express.static(__dirname + '/js'));
app.use("/stylesheets", express.static(__dirname + '/stylesheets'));
app.use("/images", express.static(__dirname + '/images'));

app.get('/', function(request, response) {
	response.render('index');
});

app.get('/file', function(request, response, next) {

	var country = (request.query.country || '').toLowerCase();
	var time = (request.query.time || '').toLowerCase();
	var occupied = (request.query.occupied || '').toLowerCase();
	var format = (request.query.format || '').toLowerCase();
	var division = (request.query.division || '').toLowerCase();
	var dc = ((request.query.dc || '').toLowerCase() === 'true');

	var sourceFile = csv().from.stream(fs.createReadStream(__dirname + '/state.csv'));
	var headers, formatter;
	
	if(format === '') {
		return next(new Error('invalid format'));
	}

	formatter = StateTableFormatter.factory(format);
	if(formatter === undefined) {
		return next(new Error('invalid format'));
	}

	// Download headers
	response.setHeader("Expires", "0");
	response.setHeader("Cache-Control", "must-revalidate, post-check=0, pre-check=0");
	response.setHeader("Content-Type", "application/force-download");
	response.setHeader("Content-Type: application/octet-stream");
	response.setHeader("Content-Type: application/download");
	response.setHeader("Content-Transfer-Encoding", "binary");

	sourceFile.on('record', function(row, index) {

		var header_index;

		if(headers === undefined) {

			// Header row
			headers = row;
			formatter.header(headers);

		}
		else {

			// Normal row
			var assocRow = [];
			for(header_index in headers) {
				assocRow[headers[header_index]] = row[header_index];
			}

			if(country !== 'all' && country !== assocRow['country'].toLowerCase()) {
				return;
			}

			if(time !== 'all' && time !== assocRow['status'].toLowerCase()) {
				return;
			}

			if(occupied !== 'all' && assocRow['type'].toLowerCase() == 'minor') {
				return;
			}

			if(division !== 'all' && assocRow['type'].toLowerCase() !== 'state' && assocRow['type'].toLowerCase() !== 'province' && assocRow['type'].toLowerCase() !== 'capitol' ) {
				return;
			}

			if(!dc && assocRow['type'].toLowerCase() === 'capitol') {
				return;
			}

			formatter.row(assocRow);
		}
	});

	sourceFile.on('end', function(count) {
		var response_text = formatter.output_buffer.render();
		formatter.footer();
		response.setHeader("Content-Disposition", "attachment; filename=" + formatter.filename + ";");
		response.setHeader("Content-Length", response_text.length());
		response.send(response_text);
		response.end();
	});

});

app.listen(8100);