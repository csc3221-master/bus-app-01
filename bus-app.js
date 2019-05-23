// Change to use EXPRESS & Router
//

// app.js: Main Program

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express

var port = 3000;        // set our port

var stops = require("./buses.json"); // Once for all times


// ROUTES FOR OUR API
// =============================================================================
app.all('/', function HandleAll(request, response, next){
    console.log(request.connection.remoteAddress);
    next();
});

app.use('/', express.static('./public'));

app.get('/', function HandleRootGet(request, response){
	response.write(
        '<!DOCTYPE html> \n' +
        '<html lang="en"> \n' +
        '        <head> \n' +
        '               <meta charset="utf-8"> \n' +
        '               <meta http-equiv="X-UA-Compatible" content="IE=edge"> \n' +
        '               <meta name="viewport" content="width=device-width, initial-scale=1"> \n' +
        '               <meta name="description" content="Home Page"> \n' +
        '               <meta name="author" content="Carlos Arias"> \n' +
        '               <script type="text/javascript" src="buses.js"></script> \n' +
        '               <title>Client Side Example</title> \n' +
        '               <!-- Bootstrap core CSS --> \n' +
        '               <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"> \n' +
        '       </head> \n' +
        '        <body> \n' +
        '               <div class="container" style="text-align: center"> \n' +
        '               <h1>Client Side Example</h1><br> \n'

    );
    var currentDate = new Date();
    response.write(
        '               <p>Current time is: ' + currentDate + '</p>\n\n'
    );
    response.write(
		'				<div class="form-group"> \n' +
		'					<label for="stopId">Select Bus Stop ID:</label> \n' +
		'					<select class="form-control" id="stopId"> \n'
	);
	for (var stop in stops["BusStopIds"]){
		response.write(
			'						<option value="' + stops["BusStopIds"][stop] + '">' + stops["BusStopIds"][stop] + '</option> \n'
		);
	}


    response.write(
		'					</select> <br>\n' +
		'					<button type="button" class="btn btn-primary form-control" onclick="QueryNextBuses()">Next Buses</button> \n' +
		'				</div> <br> \n'
    );
    response.write(
        '               <div class="jumbotron" id="output"> </div>\n'
    );
    response.write(
        '       </body> \n' +
        '</html> \n'
    );
    response.end();
});


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Version 4: Magic happens on port ' + port);
