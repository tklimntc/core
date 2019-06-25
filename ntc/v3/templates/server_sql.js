/*
// =========================================================
// server query javascript file
// =========================================================
*/
//
module.exports={
nothing:'\
\
'
// serial_ , name_
,node_list:
'\
SELECT a.serial AS serial, b.name \
FROM (SELECT REPLACE(JSON_EXTRACT(value, "$.SensorNodeId"),"\\"","") AS serial FROM mobiusdb.sensdb \
WHERE JSON_EXTRACT(value, "$.Temperature") IS NOT NULL \
   OR JSON_EXTRACT(value, "$.Hall") IS NOT NULL \
   OR JSON_EXTRACT(value, "$.Movement") IS NOT NULL \
GROUP BY serial limit 99999999)\
a LEFT OUTER JOIN mobiusdb.nodename b ON a.serial = b.serial ORDER BY name;\
'
,node_list_replace:node_list_replace()
,search:
'SELECT time as Time, values_ FROM mobiusdb.sensdb \
  WHERE JSON_EXTRACT(value,"$.SensorNodeId") IN sensors_ \
    AND begin_date_ <= time and time <= end_date_ ORDER BY Time DESC LIMIT 9999;'
// values_ : ['JSON_EXTRACT(value,"$.temperature") as "temperature"', ...], sensors_ : ['sensornodeid', ...], begin_date_,end_date_:"2019-05-27"
,rename:'INSERT INTO mobiusdb.nodename (serial,name) VALUES values_ ON DUPLICATE KEY UPDATE name=VALUES(name);'
,get_last_date:'select time from mobiusdb.sensdb order by time desc limit 1;'
,get_time_top:'SELECT min(time) as mnt, max(time) as mxt FROM ( SELECT DATE_FORMAT(time,"%Y-%m-%d %T.%f") as time FROM mobiusdb.sensdb WHERE JSON_EXTRACT(value, "$.Temperature") IS NOT NULL \
   OR JSON_EXTRACT(value, "$.Hall") IS NOT NULL \
   OR JSON_EXTRACT(value, "$.Movement") IS NOT NULL \
 ORDER BY time DESC LIMIT 150 )T;'
// values_ : [("serial","name"), ...]
/*
,function (input){
	return ''.replace(input)
}


*/
}
function node_list_replace(){
	
}
/*
function (input){
	
}


*/
