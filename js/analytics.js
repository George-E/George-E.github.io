// Load the Visualization API and the corechart package.
      google.charts.load('current', {'packages':['corechart']});

      // Set a callback to run when the Google Visualization API is loaded.
      google.charts.setOnLoadCallback(initialize);

      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.

//google analytics FOR THIS SITE

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-90719231-2', 'auto');
ga('send', 'pageview');


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

  var opts = {sendMethod: 'auto'};
  // Replace the data source URL on next line with your data source URL.
  var query = new google.visualization.Query('https://apisuperproxyconsole.appspot.com/query?id=ahZzfmFwaXN1cGVycHJveHljb25zb2xlchULEghBcGlRdWVyeRiAgICA3pCBCgw&format=data-table-response', opts);
  query.send(handleQueryResponse);

  var queryToday = new google.visualization.Query('https://apisuperproxyconsole.appspot.com/query?id=ahZzfmFwaXN1cGVycHJveHljb25zb2xlchULEghBcGlRdWVyeRiAgICAvNXTCAw&format=data-table-response', opts);
  queryToday.send(handleQueryResponseToday);

  var queryCountry = new google.visualization.Query('https://apisuperproxyconsole.appspot.com/query?id=ahZzfmFwaXN1cGVycHJveHljb25zb2xlchULEghBcGlRdWVyeRiAgICAmdKFCgw&format=data-table-response', opts);
  queryCountry.send(handleQueryResponseCountry);

}


function handleQueryResponse(response) {

  if (response.isError()) {
   // alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  }

   $('#playValue').text(''+ response.getDataTable().getValue(0,1 ));

   var d = new Date();
   var months = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"]; 
   var days = [31,28,31,30,31,30,31,31,30,31,30,31]; 
   if (d.getDate() ==1) {
      var mon = months[d.getMonth()]-1;
      if (mon == -1) {
        mon = 11;
      }
      $('#date').text('Yesterday\'s (' + mon+' '+ days[mon]+ ') Total Play Count:');
   } else {
    $('#date').text('Yesterday\'s (' + months[d.getMonth()]+' '+ (d.getDate()-1)+ ') Total Play Count:');
   }

}

function handleQueryResponseToday(response) {

  /*if (response.isError()) {
    //alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  }

   $('#playValueToday').text(''+ response.getDataTable().getValue(0,1 ));

   var d = new Date();
   var months = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"]; 
    $('#dateToday').text('Plays So Far Today (' + (months[d.getMonth()]) + ' ' +(d.getDate()) + "):") ;
   */
}

function handleQueryResponseCountry(response) {

  if (response.isError()) {
    //alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  }

  //alert(response.getDataTable().getValue(0,0));
  var data = response.getDataTable();
  data.setCell(0,0,'Canada');
  data.sort({column: 1, desc: true});
  var chart = new google.visualization.PieChart(document.getElementById('map_chart'));
  chart.draw(data, {chartArea:{width:'100%',height:'100%'}, width:270,is3D: true});

  $('#spinner').hide();
  devices();

}


function devices(response) {

  // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'device');
        data.addColumn('number', 'percent');
        data.addRows([
          ['Tablet', 0.43],
          ['Computer', 0.32],
          ['Phone', 0.25]
        ]);

        // Set chart options
        var options = {'is3D':true,
                       'chartArea':{width:'100%',height:'100%'},
                       'width':270};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('device_chart'));
        chart.draw(data, options);

}

