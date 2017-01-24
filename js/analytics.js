// Load the Visualization API and the corechart package.
      google.charts.load('current', {'packages':['corechart']});

      // Set a callback to run when the Google Visualization API is loaded.
      google.charts.setOnLoadCallback(initialize);

      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.



/*

function drawChart() {
	var wrapper = new google.visualization.ChartWrapper({
		"continerId": "chart_div",
		"chartType": "PieChart",
		"options" : {"width":600,"height":440,"title":"Yo"},
		"dataScourceURL": "https://apisuperproxyconsole.appspot.com/query?id=ahZzfmFwaXN1cGVycHJveHljb25zb2xlchULEghBcGlRdWVyeRiAgICA-MKECgw&format=data-table-response"

	});
	wrapper.draw();
}*/

function initialize() {

  devices();
  var opts = {sendMethod: 'auto'};
  // Replace the data source URL on next line with your data source URL.
  var query = new google.visualization.Query('https://apisuperproxyconsole.appspot.com/query?id=ahZzfmFwaXN1cGVycHJveHljb25zb2xlchULEghBcGlRdWVyeRiAgICA-MKECgw&format=data-table-response', opts);
  query.send(handleQueryResponse);

  var queryCountry = new google.visualization.Query('https://apisuperproxyconsole.appspot.com/query?id=ahZzfmFwaXN1cGVycHJveHljb25zb2xlchULEghBcGlRdWVyeRiAgICAvNWTCQw&format=data-table-response', opts);
  queryCountry.send(handleQueryResponseCountry);

}


function handleQueryResponse(response) {

  if (response.isError()) {
    alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  }

   $('#playValue').text(''+ response.getDataTable().getValue(0,1 ));
}


function handleQueryResponseCountry(response) {

  if (response.isError()) {
    alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  }

  //alert(response.getDataTable().getValue(0,0));
  var data = response.getDataTable();
  data.setCell(0,0,'Canada');
  var chart = new google.visualization.PieChart(document.getElementById('map_chart'));
  chart.draw(data, {chartArea:{width:'100%',height:'100%'}, width:270,is3D: true});

}


function devices(response) {

  // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'device');
        data.addColumn('number', 'percent');
        data.addRows([
          ['Tablet', 43],
          ['Computer', 32],
          ['Phone', 25]
        ]);

        // Set chart options
        var options = {'is3D':true,
                       'chartArea':{width:'100%',height:'100%'},
                       'width':270};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('device_chart'));
        chart.draw(data, options);

}

