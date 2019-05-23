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
select a.serial as serial, b.name \
from (SELECT replace(JSON_EXTRACT(value, "$.SensorNodeId"),"\\"","") as serial from mobiusdb.sensdb GROUP BY serial)\
a left outer join mobiusdb.nodename b on a.serial = b.serial order by name;\
'
,node_list_replace:node_list_replace()
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
