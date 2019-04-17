/* global io */
var socket = io();
var SelectStmt = null;
var FromStmt = null;
var WhereStmt = null;
var EtcStmt = null;
var AllFetchSQL = SelectStmt + FromStmt + WhereStmt + EtcStmt;
var Data = {};
var defaultDataRows = 150;
var defaultRadix = 10;
function init(){
	// initDateForm();
	// initDataRows();
	getLastDataTime();
}

init();

function getLastDataTime(){
	socket.emit("getLastDataTime","SELECT time FROM mobiusdb.sensdb ORDER BY time DESC LIMIT 1");
}

function initDateForm(){
	/* global startDate */
	/* global endDate */
	startDate.value = getDay(new Date,0,0,-3);
	endDate.value = getDay(new Date);
}

function initDataRows(){
	/* global DataRows */
	DataRows.value = 150;
	return false;
}

// $("#DataRows").on("click",function(event){
//     event.stopPropagation();
// });

function dataInit(){
	// Data = {};
	Data.fetchedData = null;
	Data.AirQualityStatic	=[];
	Data.Ambient_light		=[];
	Data.BatteryLevel		=[];
	Data.GatewayId			=[];
	Data.Humidity			=[];
	Data.IAQaccuracyStatic	=[];
	Data.Movement			=[];
	Data.Pressure			=[];
	Data.SensorNodeId		=[];
	Data.SourceAddress		=[];
	Data.Temperature		=[];
	Data.NodeStatus			=[];
	Data.NodeRole			=[];
	Data.Hall				=[];
	Data.Objects			=[];
	Data.User				=[];
	Data.selectedData=null;
	Data.lastTimeStamp = null;
	Data.dataList = [];
	Data.nodeNameList = [];
	Data.dataList.push(Data.AirQualityStatic	);
	Data.dataList.push(Data.Ambient_light		);
	Data.dataList.push(Data.BatteryLevel		);
	Data.dataList.push(Data.GatewayId			);
	Data.dataList.push(Data.Humidity			);
	Data.dataList.push(Data.IAQaccuracyStatic	);
	Data.dataList.push(Data.Movement			);
	Data.dataList.push(Data.Pressure			);
	Data.dataList.push(Data.SensorNodeId		);
	Data.dataList.push(Data.SourceAddress		);
	Data.dataList.push(Data.Temperature			);
	Data.dataList.push(Data.NodeStatus			);
	Data.dataList.push(Data.NodeRole			);
	Data.dataList.push(Data.Hall				);
	Data.dataList.push(Data.Objects				);
	Data.dataList.push(Data.User				);
}
function pushData(data, selecteddata, selectedData, i){
	if (typeof(selecteddata)=="undefined"){return;}
	var count = 0;
	for ( var j = 0 ; j < selectedData.length ; j++ ){
		if (data[i].SensorNodeId == selectedData[j].key || (typeof(selectedData[j].key_org) != "undefined" && data[i].SensorNodeId == selectedData[j].key_org)){
			count++;
			selectedData[j].values.push({x:data[i].Time,y:selecteddata});
			break;
		}
	}
	if(count==0){
		var nodeName = document.getElementById("n"+data[i].SensorNodeId+"input");
		if(nodeName==null){
			document.getElementById("nodeNameList").insertAdjacentHTML("beforeend", 
			"<div id=\"n"+data[i].SensorNodeId+"div\" style=\"margin-left: 11px;\" class=\"custom-checkbox custom-control\">"+
			"<input type=\"checkbox\" id=\"n"+data[i].SensorNodeId+"checkbox\" class=\"custom-control-input\">"+
			"<label id=\"n"+data[i].SensorNodeId+"label\" class=\"custom-control-label\" for=\"n"+data[i].SensorNodeId+"checkbox\">"+
			"<input id=\"n"+data[i].SensorNodeId+"input\" type=\"text\" class=\"form-control form-controls\" placeholder=\""+data[i].SensorNodeId+"\" required=\"\">"+
			"<button onclick=\"saveRenameNode(n"+data[i].SensorNodeId+"input.placeholder,n"+data[i].SensorNodeId+"input.value)\" id=\"n"+data[i].SensorNodeId+"button\" class=\"mb-2 mr-2 btn-transition btn btn-outline-dark\" style=\"padding: 0; margin: -5px 0px 0px 7px !important;\">"+
			"<a href=\"javascript:void(0);\" class=\"nav-link\" style=\"padding: 5px;\">"+
			"<i class=\"nav-link-icon fa fa-edit\" style=\"margin: 0; width: 16px;\"></i></a></button></label></div>");
			// "<input id=\"n"+data[i].SensorNodeId+"\" class=\"form-control form-control-dark w-100\" type=\"text\" placeholder=\""+data[i].SensorNodeId+"\" aria-label=\"Search\"></input>");
			document.getElementById("n"+data[i].SensorNodeId+"input").addEventListener("keyup", function (evt) {
			    renameNode(data[i].SensorNodeId,document.getElementById("n"+data[i].SensorNodeId+"input").value);
			}, false);
			document.getElementById("n"+data[i].SensorNodeId+"button").addEventListener("onclick", function (evt) {
			    renameNode(data[i].SensorNodeId,document.getElementById("n"+data[i].SensorNodeId+"input").value);
			}, false);
		}
		else{
		}
		var nodeName = localStorage.getItem(data[i].SensorNodeId);
		if (nodeName!=null){
			document.getElementById("n"+data[i].SensorNodeId+"input").defaultValue = nodeName;
		}
		selectedData.push({key:localStorage.getItem(data[i].SensorNodeId) || data[i].SensorNodeId,key_org:data[i].SensorNodeId,values:[{x:data[i].Time,y:selecteddata}]});
	}
}

function getDay(inputDate, inputYear, inputMonth, inputDay){
	var now = new Date(inputDate||null);
	if(typeof(inputYear)!="undefined"){ now.setYear(now.getFullYear()+inputYear) }
	if(typeof(inputMonth)!="undefined"){ now.setMonth(now.getMonth()+inputMonth) }
	if(typeof(inputDay)!="undefined"){ now.setDate(now.getDate()+inputDay) }
	var day = ("00" + now.getDate()).slice(-2);
	var month = ("00" + (now.getMonth()+ 1)).slice(-2);
	var today = ("0000" + now.getFullYear()).slice(-4)+"-"+(month)+"-"+(day) ;
	return today;
}

function storeNodeName(){
	var nodeNameList = document.getElementById("nodeNameList")
	// /* global nodeNameList */
	var insertSQL = "INSERT INTO mobiusdb.nodename (serial,name) VALUES ";
	for(var i = 0 ; i < nodeNameList.childElementCount ; i++){
		insertSQL += "( \"" + nodeNameList.getElementsByTagName("input")[i].id.substr(1,8)+"\" ,\""+nodeNameList.getElementsByTagName("input")[i].value+"\")";
		if(i != nodeNameList.childElementCount-1){
			insertSQL+=", ";
		}
		else{
			insertSQL+=" ON DUPLICATE KEY UPDATE name=VALUES(name);";
		}
	}
	socket.emit("nodename",insertSQL);
}

function saveRenameNode(id,name){
	renameNode(id,name);
	var insertSQL = "INSERT INTO mobiusdb.nodename (serial,name) VALUES ";
		insertSQL+= "(\""+id+"\",\""+name+"\") ";
		insertSQL+= "ON DUPLICATE KEY UPDATE name=VALUES(name);";
	socket.emit("nodename",insertSQL);
	console.log(insertSQL);
}

function renameNode(id,name){
	/* global localStorage */
	// console.log(id+"/"+name)
	for (var i = 0 ; i < Data.dataList.length ; i++){
		for (var j = 0 ; j < Data.dataList[i].length ; j++){
			if (Data.dataList[i][j].key_org == id){
				Data.dataList[i][j].key=name;
				localStorage.setItem(id, name);
			}
		}
	}
	// if (typeof(document.getElementById("n"+id+"input"))!="undefined"){
	// 	document.getElementById("n"+id+"input").value = name;
	// 	// document.getElementById(id+"label").innerHTML = name;
	// }
	for (var i = 0 ; i < nodeNameList.getElementsByTagName('input').length ; i++){
		if(nodeNameList.getElementsByTagName('input')[i].id.substr(1,8)==id){
			nodeNameList.getElementsByTagName('input')[i].value=name
			// nodeNameList.getElementsByTagName('label')[i].textContent=name
		}
	}
	selectData()
}

function renameNodes(){
	for(var i = 0 ; i < Data.nodeNameList.length ; i++){
		renameNode(Data.nodeNameList[i].serial,Data.nodeNameList[i].name);
	}
}

function releaseData(){
	var data = Data.fetchedData;
	for (var i = data.length-1; i >= 0 ; i--){
		data[i]=JSON.parse(data[i].JSON.replace("}",", \"Time\":\""+data[i].Time+"\"}"));
		data[i].Time = new Date(data[i].Time);
		data[i].Times = new Date(data[i].Timestamp);
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
          });
	  chart.x2Axis
        .tickFormat(function(d) {
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
function getSelectedData(){
	if(typeof(Data.selectedDataName)=="undefined"){
		Data.selectedDataName = "Temperature";
	}
	return Data.selectedDataName;
}
function selectData(selectedDataName) {
	if(typeof(selectedDataName)=="undefined"){
		selectedDataName = getSelectedData();
	}
	Data.selectedDataName = selectedDataName;
	if (Data.selectedDataName == "AirQualityStatic"){
		 Data.selectedData = Data.AirQualityStatic}
	if (Data.selectedDataName == "Ambient_light"){
		 Data.selectedData = Data.Ambient_light}
	if (Data.selectedDataName == "BatteryLevel"){
		 Data.selectedData = Data.BatteryLevel}
	if (Data.selectedDataName == "GatewayId"){
		 Data.selectedData = Data.GatewayId}
	if (Data.selectedDataName == "Humidity"){
		 Data.selectedData = Data.Humidity}
	if (Data.selectedDataName == "IAQaccuracyStatic"){
		 Data.selectedData = Data.IAQaccuracyStatic}
	if (Data.selectedDataName == "Movement"){
		 Data.selectedData = Data.Movement}
	if (Data.selectedDataName == "Pressure"){
		 Data.selectedData = Data.Pressure}
	if (Data.selectedDataName == "SensorNodeId"){
		 Data.selectedData = Data.SensorNodeId}
	if (Data.selectedDataName == "SourceAddress"){
		 Data.selectedData = Data.SourceAddress}
	if (Data.selectedDataName == "Temperature"){
		 Data.selectedData = Data.Temperature}
	if (Data.selectedDataName == "NodeStatus"){
		 Data.selectedData = Data.NodeStatus}
	if (Data.selectedDataName == "NodeRole"){
		 Data.selectedData = Data.NodeRole}
	if (Data.selectedDataName == "Hall"){
		 Data.selectedData = Data.Hall}
	if (Data.selectedDataName == "Objects"){
		 Data.selectedData = Data.Objects}
	if (Data.selectedDataName == "User"){
		 Data.selectedData = Data.User}
	drawChart();
	changeSubtitle(selectedDataName);
}
function changeSubtitle(selectedDataName){
	/* global title */
	title.innerText = "Dashboard-"+getWordKr(selectedDataName)
}
function getWordKr(engName){
	var korName = "";
	if ( engName == "AirQualityStatic") { korName = "공기 "}
	if ( engName == "Ambient_light") { korName = "조도 "}
	if ( engName == "BatteryLevel") { korName = "전원 "}
	if ( engName == "GatewayId") { korName = "게이트웨이ID "}
	if ( engName == "Humidity") { korName = "습도 %"}
	if ( engName == "IAQaccuracyStatic") { korName = "실내 "}
	if ( engName == "Movement") { korName = "진동 "}
	if ( engName == "Pressure") { korName = "기압 ph"}
	if ( engName == "SensorNodeId") { korName = "센서노드ID "}
	if ( engName == "SourceAddress") { korName = "소스주소 "}
	if ( engName == "Temperature") { korName = "온도 ℃"}
	if ( engName == "NodeStatus") { korName = "노드상태 "}
	if ( engName == "NodeRole") { korName = "노드역할 "}
	if ( engName == "Hall") { korName = "자력 "}
	if ( engName == "Objects") { korName = "객체 "}
	return korName
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
	             ",value as JSON, JSON_EXTRACT(value,\"$.Timestamp\") as times ";
	FromStmt =   "FROM mobiusdb.sensdb ";
	WhereStmt =  "WHERE time<='"+endDate.value+"' AND time>'"+startDate.value+"' ";
	// specific case for our data capture
	// WhereStmt =  "WHERE time < \"2019-02-14\" ";
	EtcStmt =    "ORDER BY time DESC LIMIT "+String(datarows)+" ";
	// specific case for our data capture
	//EtcStmt =    "ORDER BY time DESC LIMIT 8000 ";
	AllFetchSQL = SelectStmt + FromStmt + WhereStmt + EtcStmt;
	console.log(AllFetchSQL)
	socket.emit('firstData',AllFetchSQL);
	socket.emit('nodename');
}
function checkDB(){
	/* global defaultRadix */
	var datarows = parseInt(document.getElementById('DataRows').value, defaultRadix);
	if(isNaN(datarows) || datarows <= 0){
		document.getElementById('DataRows').value = datarows = defaultDataRows;
	}
	SelectStmt = "SELECT "+
	             " time as Time "+
	             ",value as JSON, JSON_EXTRACT(value,\"$.Timestamp\") as times ";
	FromStmt =   "FROM mobiusdb.sensdb ";
	WhereStmt =  "WHERE JSON_EXTRACT(value,\"$.Timestamp\") > "+String(getLastTimestamp()) + " "
	EtcStmt =    "ORDER BY time DESC LIMIT "+String(datarows)+" ";
	AllFetchSQL = SelectStmt + FromStmt + WhereStmt + EtcStmt;
	socket.emit('data',AllFetchSQL);
}
socket.on('firstData', function(data){
	/* global startWorker */
	/* global dataInit */
	dataInit();
	Data.fetchedData = data;
	releaseData();
	selectData();
	// auto start to db push request.
	// startWorker();
});
socket.on('data', function(data){
	if(data.length){
		Data.fetchedData = data;
		releaseData();
		selectData();
	}
});
socket.on('nodename', function(data){
	// console.log(data)
	//data    = [{name:"tests",serial:"test"}, ]
	//data[0] =  {name:"tests",serial:"test"}
	Data.nodeNameList = data;
	renameNodes()
});
socket.on('getLastDataTime', function(data){
	setFirstDate(data);
});

function setFirstDate(date){
	console.log(date)
	if(startDate.value=="" || endDate.value==""){
		startDate.value = getDay(date[0].time,0,0,-3)
		endDate.value = getDay(date[0].time)
	}
	firstFetchDB();
}