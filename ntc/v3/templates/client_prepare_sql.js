/* 
// =========================================================
// cleint prepared SQL javascript file
// =========================================================
*/
var preparedSQL = {
none:'none'
,search:'SELECT time as Time, values_ FROM mobiusdb.sensdb WHERE JSON_EXTRACT(value,"$.SensorNodeId") IN sensors_ and begin_date_ <= time and time <= end_date_ ORDER BY Time DESC LIMIT 99'
,search_other: //, AVG(Temperature) as AVG_TEMPERATURE\
'SELECT id, Time, count(*) as COUNT\
\n data_\
\n FROM(\
\n SELECT REPLACE(JSON_EXTRACT(value,"$.SensorNodeId"), "\\\"","") AS id\
\n ,date_format_ AS Time\
\ndata2_\
\n FROM mobiusdb.sensdb\
\n WHERE ( JSON_EXTRACT(value, "$.Temperature") IS NOT NULL \
\n  OR JSON_EXTRACT(value, "$.Hall") IS NOT NULL \
\n  OR JSON_EXTRACT(value, "$.AirQualityStatic") IS NOT NULL \
\n  OR JSON_EXTRACT(value, "$.Movement") IS NOT NULL ) \
\n AND REPLACE(JSON_EXTRACT(value,"$.SensorNodeId"), "\\\"","") IN sensors_ \
\n AND UNIX_TIMESTAMP(time) <= UNIX_TIMESTAMP(end_date_) AND UNIX_TIMESTAMP(begin_date_) <= UNIX_TIMESTAMP(time) ORDER BY Time DESC \
\n ) tab_a GROUP BY id, Time ORDER BY Time DESC LIMIT limit_count_\
'
,search_real: //, AVG(Temperature) as AVG_TEMPERATURE\
'SELECT id, Time, count(*) as COUNT\
\n data_\
\n FROM(\
\n SELECT REPLACE(JSON_EXTRACT(value,"$.SensorNodeId"), "\\\"","") AS id\
\n ,date_format_ AS Time\
\ndata2_\
\n FROM mobiusdb.sensdb\
\n WHERE ( JSON_EXTRACT(value, "$.Temperature") IS NOT NULL \
\n  OR JSON_EXTRACT(value, "$.Hall") IS NOT NULL \
\n  OR JSON_EXTRACT(value, "$.AirQualityStatic") IS NOT NULL \
\n  OR JSON_EXTRACT(value, "$.Movement") IS NOT NULL ) \
\n AND REPLACE(JSON_EXTRACT(value,"$.SensorNodeId"), "\\\"","") IN sensors_ \
\n AND UNIX_TIMESTAMP(begin_date_) < UNIX_TIMESTAMP(time) ORDER BY Time DESC \
\n ) tab_a GROUP BY id, Time ORDER BY Time DESC LIMIT limit_count_\
' // to be changed to '< time' from '<= time'
// select ID, Time, avg(Temperature) as AVT from (select JSON_EXTRACT(value,"$.SensorNodeId") as ID, DATE_FORMAT(time,'%Y-%m-%d') as Time, JSON_EXTRACT(value,"$.Temperature") as Temperature from mobiusdb.sensdb) tab_a group by Time;
// values_ : ['JSON_EXTRACT(value,"$.temperature") as "temperature"', ...], sensors_ : ['sensornodeid', ...], begin_date_,end_date_:"2019-05-27"
,rename:'INSERT INTO mobiusdb.nodename (serial,name) VALUES values_ ON DUPLICATE KEY UPDATE name=VALUES(name)'
// values_ : [("serial","name"), ...]
};