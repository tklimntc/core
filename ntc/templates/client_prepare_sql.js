/* 
// =========================================================
// cleint prepared SQL javascript file
// =========================================================
*/
var preparedSQL = {
    none:'none'
    ,search:'SELECT time as Time, values_ FROM mobiusdb.sensdb WHERE JSON_EXTRACT(value,"$.SensorNodeId") IN sensors_ and begin_date_ <= time and time <= end_date_ ORDER BY Time DESC LIMIT 99999999;'
    // values_ : ['JSON_EXTRACT(value,"$.temperature") as "temperature"', ...], sensors_ : ['sensornodeid', ...], begin_date_,end_date_:"2019-05-27"
    ,rename:'INSERT INTO mobiusdb.nodename (serial,name) VALUES values_ ON DUPLICATE KEY UPDATE name=VALUES(name);'
    // values_ : [("serial","name"), ...]
};