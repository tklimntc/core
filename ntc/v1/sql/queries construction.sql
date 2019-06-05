
#0. 더이상 쓰지 않을 쿼리
SELECT * FROM mobiusdb.sensdb order by time desc limit 99999999;

#1. 등록된 노드 id 전체 조회 (무조건, 고정)
SELECT JSON_EXTRACT(value, "$.SensorNodeId") as name from mobiusdb.sensdb GROUP BY name;

#2. 데이터 존재 날짜 범위 조회 (무조건, 고정)
SELECT MIN(JSON_EXTRACT(value, "$.Timestamp")) as mint, MAX(JSON_EXTRACT(value, "$.Timestamp")) as maxt from mobiusdb.sensdb;
SELECT FROM_UNIXTIME(MIN(JSON_EXTRACT(value, "$.Timestamp"))) as mint, FROM_UNIXTIME(MAX(JSON_EXTRACT(value, "$.Timestamp"))) as maxt from mobiusdb.sensdb;

#3. 