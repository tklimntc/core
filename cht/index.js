var socket = io();
var TempJson = null;
// var SelectStmt = ""+
//                 "SELECT "+
//                 " time as Time "+
//                 // ",FROM_UNIXTIME(JSON_EXTRACT(value,\"$.Timestamp\")) as Timestamp "+
//                 ",value as JSON "
// var FromStmt =   "FROM mobiusdb.sensdb "
// var WhereStmt =  " "
// var EtcStmt =    "ORDER BY time DESC LIMIT 100 "
var SelectStmt = null;
var FromStmt = null;
var WhereStmt = null;
var EtcStmt = null;
var AllFetchSQL = SelectStmt + FromStmt + WhereStmt + EtcStmt;
var Data = {};
var defaultDataRows = 150;
var defaultRadix = 10;
function init(){
	firstFetchDB();
}
function dataInit(){
	// Data = {};
	Data.fetchedData = null;
	Data.AirQualityStatic=[];
	Data.Ambient_light=[];
	Data.BatteryLevel=[];
	Data.GatewayId=[];
	Data.Humidity=[];
	Data.IAQaccuracyStatic=[];
	Data.Movement=[];
	Data.Pressure=[];
	Data.SensorNodeId=[];
	Data.SourceAddress=[];
	Data.Temperature=[];
	Data.NodeStatus=[];
	Data.NodeRole=[];
	Data.Hall=[];
	Data.Objects=[];
	Data.User=[];
	Data.selectedData=null;
	Data.lastTimeStamp = null;
	// Data.selectedDataName = undefined;
}


function pushData(data, selecteddata, selectedData, i){
	if (typeof(selecteddata)=="undefined"){return;}
	var count = 0;
	for ( var j = 0 ; j < selectedData.length ; j++ ){
		if (data[i].SensorNodeId == selectedData[j].key){
			count++;
			selectedData[j].values.push({x:data[i].Time,y:selecteddata});
			break;
		}
	}
	if(count==0){
		selectedData.push({key:data[i].SensorNodeId,values:[{x:data[i].Time,y:selecteddata}]});
	}
}
function releaseData(){
	var data = Data.fetchedData;
	for (var i = data.length-1; i >= 0 ; i--){
	// for (var i = 0 ; i < data.length ; i++){
		// data[i]=JSON.parse(data[i].JSON.replace("}",", \"Time\":\""+data[i].Time+"\", \"Times\":\""+data[i].Timestamp+"\"}"));
		data[i]=JSON.parse(data[i].JSON.replace("}",", \"Time\":\""+data[i].Time+"\"}"));
		data[i].Time = new Date(data[i].Time);
		data[i].Times = new Date(data[i].Timestamp);
		// if(typeof(data[i].SensorNodeId) == "undefined"){
		// 	console.log(undefined);
		// }
		pushData(data, data[i].AirQualityStatic,
		                  Data.AirQualityStatic, i);
		pushData(data, data[i].Ambient_light,
		                  Data.Ambient_light, i);
		pushData(data, data[i].BatteryLevel,
		                  Data.BatteryLevel, i);
		pushData(data, data[i].GatewayId,
		                  Data.GatewayId, i);
		pushData(data, data[i].Humidity,
		                  Data.Humidity, i);
		pushData(data, data[i].IAQaccuracyStatic,
		                  Data.IAQaccuracyStatic, i);
		pushData(data, data[i].Movement,
		                  Data.Movement, i);
		pushData(data, data[i].Pressure,
		                  Data.Pressure, i);
		pushData(data, data[i].SensorNodeId,
		                  Data.SensorNodeId, i);
		pushData(data, data[i].SourceAddress,
		                  Data.SourceAddress, i);
		pushData(data, data[i].Temperature,
		                  Data.Temperature, i);

		pushData(data, data[i].NodeStatus,
		                  Data.NodeStatus, i);
		pushData(data, data[i].NodeRole,
		                  Data.NodeRole, i);
		pushData(data, data[i].Hall,
		                  Data.Hall, i);
		pushData(data, data[i].Objects,
		                  Data.Objects, i);
		pushData(data, data[i].User,
		                  Data.User, i);

		if(i == 0){
			Data.lastTimeStamp = data[i].Timestamp;
		}
	}
}
function drawChart(){
    /* global nv */
    /* global d3 */
	nv.addGraph(function() {
	  var chart = nv.models.lineWithFocusChart();
	  chart.xAxis
        .tickFormat(function(d) {
        	return d3.time.format("[%H:%M]")(new Date(d));
        	// return d3.time.format("[%Y-%m-%d %H:%M]")(new Date(d))
          });
	  chart.x2Axis
        .tickFormat(function(d) {
        	// return d3.time.format("[%Y-%m-%d %H:%M]")(new Date(d))
        	return d3.time.format("[%Y-%m-%d]")(new Date(d));
          });
	  chart.yAxis
	    .tickFormat(d3.format(',.2f'));
	  chart.y2Axis
	    .tickFormat(d3.format(',.2f'));
	  d3.select('#chart svg')
	    .datum(Data.selectedData)
	    .transition().duration(500)
	    .call(chart)
	    ;
	  nv.utils.windowResize(chart.update);
	  return chart;
	});
}
// function updateChart(){
//     /* global nv */
//     /* global d3 */
// 	nv.addGraph(function() {
// 	  //var chart = nv.models.lineWithFocusChart();
// 	  //chart.xAxis
//   //     .tickFormat(function(d) {
//   //     	return d3.time.format("[%H:%M]")(new Date(d))
//   //     	// return d3.time.format("[%Y-%m-%d %H:%M]")(new Date(d))
//   //       });
// 	  //chart.x2Axis
//   //     .tickFormat(function(d) {
//   //     	// return d3.time.format("[%Y-%m-%d %H:%M]")(new Date(d))
//   //     	return d3.time.format("[%Y-%m-%d]")(new Date(d))
//   //       });
// 	  //chart.yAxis
// 	  //  .tickFormat(d3.format(',.2f'));
// 	  //chart.y2Axis
// 	  //  .tickFormat(d3.format(',.2f'));
// 	  d3.select('#chart svg')
// 	    .datum(Data.selectedData)
// 	    .transition().duration(500)
// 	    .call(chart)
// 	    ;
// 	  nv.utils.windowResize(chart.update);
// 	  return chart;
// 	});
// }
function getSelectedData(){
	if(typeof(Data.selectedDataName)=="undefined"){
		Data.selectedDataName = "Temperature";
	}
	// console.log(Data.selectedDataName)
	return Data.selectedDataName;
}
function selectData(selectedDataName) {
	if(typeof(selectedDataName)=="undefined"){
		selectedDataName = getSelectedData();
	}
	Data.selectedDataName = selectedDataName;
	if (Data.selectedDataName =="AirQualityStatic"){
		Data.selectedData = Data.AirQualityStatic}
	if (Data.selectedDataName =="Ambient_light"){
		Data.selectedData = Data.Ambient_light}
	if (Data.selectedDataName =="BatteryLevel"){
		Data.selectedData = Data.BatteryLevel}
	if (Data.selectedDataName =="GatewayId"){
		Data.selectedData = Data.GatewayId}
	if (Data.selectedDataName =="Humidity"){
		Data.selectedData = Data.Humidity}
	if (Data.selectedDataName =="IAQaccuracyStatic"){
		Data.selectedData = Data.IAQaccuracyStatic}
	if (Data.selectedDataName =="Movement"){
		Data.selectedData = Data.Movement}
	if (Data.selectedDataName =="Pressure"){
		Data.selectedData = Data.Pressure}
	if (Data.selectedDataName =="SensorNodeId"){
		Data.selectedData = Data.SensorNodeId}
	if (Data.selectedDataName =="SourceAddress"){
		Data.selectedData = Data.SourceAddress}
	if (Data.selectedDataName =="Temperature"){
		Data.selectedData = Data.Temperature}
		
	if (Data.selectedDataName =="NodeStatus"){
		Data.selectedData = Data.NodeStatus}
	if (Data.selectedDataName =="NodeRole"){
		Data.selectedData = Data.NodeRole}
	if (Data.selectedDataName =="Hall"){
		Data.selectedData = Data.Hall}
	if (Data.selectedDataName =="Objects"){
		Data.selectedData = Data.Objects}
	if (Data.selectedDataName =="User"){
		Data.selectedData = Data.User}

	// console.log("draw")
	drawChart();
}
function getLastTimestamp(){
	return Data.lastTimeStamp;
}
function firstFetchDB(){
	/* global defaultRadix */
	var datarows = parseInt(document.getElementById('DataRows').value, defaultRadix);
	if(isNaN(datarows) || datarows <= 0){
		document.getElementById('DataRows').value = datarows = defaultDataRows;
	}
	SelectStmt = "SELECT "+
	             " time as Time "+
	             // ",FROM_UNIXTIME(JSON_EXTRACT(value,\"$.Timestamp\")) as Timestamp "+
	             ",value as JSON, JSON_EXTRACT(value,\"$.Timestamp\") as times ";
	FromStmt =   "FROM mobiusdb.sensdb ";
	WhereStmt =  " ";
	EtcStmt =    "ORDER BY time DESC LIMIT "+String(datarows)+" ";
	// console.log((getLastTimestamp()))
	AllFetchSQL = SelectStmt + FromStmt + WhereStmt + EtcStmt;
	// console.log(AllFetchSQL)
	socket.emit('firstData',AllFetchSQL);
}
function checkDB(){
	/* global defaultRadix */
	var datarows = parseInt(document.getElementById('DataRows').value, defaultRadix);
	if(isNaN(datarows) || datarows <= 0){
		document.getElementById('DataRows').value = datarows = defaultDataRows;
	}
	SelectStmt = "SELECT "+
	             " time as Time "+
	             // ",FROM_UNIXTIME(JSON_EXTRACT(value,\"$.Timestamp\")) as Timestamp "+
	             ",value as JSON, JSON_EXTRACT(value,\"$.Timestamp\") as times ";
	FromStmt =   "FROM mobiusdb.sensdb ";
	WhereStmt =  "WHERE JSON_EXTRACT(value,\"$.Timestamp\") > "+String(getLastTimestamp()) + " "
	EtcStmt =    "ORDER BY time DESC LIMIT "+String(datarows)+" ";
	// console.log((getLastTimestamp()))
	AllFetchSQL = SelectStmt + FromStmt + WhereStmt + EtcStmt;
	// console.log(AllFetchSQL)
	socket.emit('data',AllFetchSQL);
}
socket.on('firstData', function(data){
	/* global startWorker */
	/* global dataInit */
	dataInit();
	Data.fetchedData = data;
	console.log(data)
	releaseData();
	selectData();
	startWorker();
});
socket.on('data', function(data){
	if(data.length){
		Data.fetchedData = data;
		releaseData();
		console.log(data)
		selectData();
		// updateChart();
	}
});