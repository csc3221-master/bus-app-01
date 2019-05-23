function QueryNextBuses(){
	var busStopId = document.getElementById('stopId').value;
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function ReceivedCallback() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("output").innerHTML = CreateTable(JSON.parse(this.responseText));
		}
	};
	xhttp.open("GET", "https://api.wmata.com/NextBusService.svc/json/jPredictions?StopID=" + busStopId + "&api_key=e13626d03d8e4c03ac07f95541b3091b", true);
	xhttp.send();
}


function CreateTable(data){
	var retVal = '';
	retVal =
		'<div class="jumbotron"> \n' +
		'<h2>' + data["StopName"] + '</h2> \n' +
		'<table class="table table-bordered table-hover"> \n' +
		'	<thead> \n' +
		'		<tr> \n' +
		'			<th scope="col">Route ID</th> \n' +
		'			<th scope="col">Direction</th> \n' +
		'			<th scope="col">Estimated Minutes</th> \n' +
		'			<th scope="col">Vehicle ID</th> \n' +
		'		</tr> \n' +
		'	</thead> \n' +
		'	<tbody> \n';

	for (var prediction in data["Predictions"]){
		retVal +=
			'<tr> \n' +
			'	<td>' + data["Predictions"][prediction]["RouteID"] + '</td> \n' +
			'	<td>' + data["Predictions"][prediction]["DirectionText"] + '</td> \n' +
			'	<td>' + data["Predictions"][prediction]["Minutes"] + '</td> \n' +
			'	<td>' + data["Predictions"][prediction]["VehicleID"] + '</td> \n' +
			'</tr> \n';

	}
	retVal +=
		'</tbody> \n' +
		'</table> \n' +
		'</div> \n ' ;
	return retVal;
	}
