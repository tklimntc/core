/* 
// =========================================================
// cleint prepared global value javascript file
// =========================================================
*/
/* global menu_term */
/* global menu_sens */
/* global menu_data */
/* global menu_sort */
/* global menu_valu */
/* global menu_char */
/* global menu_view */
//https://bl.ocks.org/uredkar/71c3a0d93cc05527c83cdc12f9549ab3

var serve_count = 0;
var sensors = {
    '':''
    ,menu_data_checkbox_Temperature             : 'Temperature'
    ,menu_data_checkbox_Humidity                : 'Humidity'
    ,menu_data_checkbox_Pressure                : 'Pressure'
    ,menu_data_checkbox_Ambient_light               : 'Ambient_light'
    ,menu_data_checkbox_AirQualityStatic                : 'AirQualityStatic'
    ,menu_data_checkbox_IAQaccuracyStatic               : 'IAQaccuracyStatic'
    ,menu_data_checkbox_Movement                : 'Movement'
    ,menu_data_checkbox_Hall                : 'Hall'
    ,menu_data_checkbox_BatteryLevel                : 'BatteryLevel'
    ,menu_data_checkbox_SensorNodeId                : 'SensorNodeId'
    ,menu_data_checkbox_GatewayId               : 'GatewayId'
    ,menu_data_checkbox_NodeStatus              : 'NodeStatus'
    ,menu_data_checkbox_NodeRole                : 'NodeRole'
    ,menu_data_checkbox_Objects             : 'Objects'
    ,menu_data_checkbox_SourceAddress               : 'SourceAddress'
    ,menu_data_checkbox_User                : 'User'
    ,menu_data_checkbox_Timestamp               : 'Timestamp'
};

var sensor_name_list = [
     'Temperature'
    ,'Humidity'
    ,'Pressure'//'atmospheric_pressure'
    ,'Ambient_light'
    ,'AirQualityStatic'//'air_quality'
    ,'IAQaccuracyStatic'//'indoor_air_quality'
    ,'Movement'
    ,'Hall'
    // ,'battery_level'
    // ,'sensor_node_id'
    // ,'gateway_id'
    // ,'node_status'
    // ,'node_role'
    // ,'object'
    // ,'source_address'
    // ,'user'
    // ,'timestamp'
]

var menus = {
     menu_term:menu_term
    ,menu_sens:menu_sens
    ,menu_data:menu_data
    ,menu_sort:menu_sort
    ,menu_valu:menu_valu
    ,menu_char:menu_char
    // ,menu_view:menu_view
};

var charts = [];
class ChartBase {
    constructor(name) {
        /* global socket */
        /* global udf_chart_is_unique */
        // this.id=udf_generate_id();
        this.chart_material = {
             menu_term:[] // what term to 
            ,menu_sens:[] // what sensor to wahch?
            ,menu_data:[] // what data to watch?
            ,menu_sort:[] // what order to follow?
            ,menu_valu:[] // value or avg, etc?
            ,menu_char:[] // what chart to use?
            // ,menu_view:[] // partition or merge?
        };
        this.generate_condition();
        if(udf_chart_is_unique(this.id)){
            this.name = name;
            this.chart_tab = this.generate_tab();
            // this.chart_emt = // this.generate_dom();
            this.chart_sql = this.generate_sql(); // many chart to compare
            this.chart_res = {}; // responce data from DBMS
            this.chart_var = [];
            charts.push(this);
            udf_alert('chart made');
            socket.emit('req_search_data',{id:this.id,sql:this.chart_sql});
        }
        else {
            udf_alert('duplicate chart')
            this.delete_chart();
        }
    }
    generate_res(res){
        this.chart_res = res;
    }
    generate_emt(element){
        this.chart_emt = element;
    }
    generate_tab(){
        /* global udf_charts_tab_attach */
        return udf_charts_tab_attach(this.id, this.name);
    }
    generate_sql(){
        /* global udf_check_value_order */
        /* global udf_generate_sql */
        /* global udf_generate_sql_other */
        if(udf_check_value_order(this)){ // 값 선택
            return udf_generate_sql(this);
        }
        else {
            return udf_generate_sql_other(this);
        }
    }
    delete_chart(){
        // console.log(this)
        /* global udf_chart_lst_delete */
        /* global udf_chart_emt_delete */
        /* global udf_chart_delete */
        udf_chart_delete(this);
    }
    generate_condition() {
        /* global udf_get_title */
        /* global udf_str_sum */
        /* global udf_get_date */
        /* global udf_get_content */
        /* global udf_itos */
        /* global udf_get_checkbox */
        /* global udf_int_sum */
        // var hash_id = "";
        var hash_sum = "";
        for (var key in menus) {
            var title_menu = udf_get_title(menus[key]);
            var title_sum = udf_str_sum(title_menu.id);
            var content_sum = 0;
            if (menus[key]==menus.menu_term) {
                var menu_contents = udf_get_date(udf_get_content(menus[key])[0]);
                for ( var i = 0 ; i < menu_contents.length ; i++ ) {
                    this.chart_material[key].push({id:menu_contents[i].id,date:menu_contents[i].value});
                    content_sum += udf_itos(udf_str_sum(menu_contents[i].id));
                    content_sum += udf_itos(udf_str_sum(menu_contents[i].value));
                }
            }
            else{
                var menu_contents = udf_get_checkbox(udf_get_content(menus[key])[0]);
                for ( var i = 0 ; i < menu_contents.length ; i++ ) {
                    this.chart_material[key].push({id:menu_contents[i].id,checked:menu_contents[i].checked});
                    if(menu_contents[i].checked) {
                        content_sum += udf_itos(udf_str_sum(menu_contents[i].id));
                    }
                }
            }
            // console.log(title_sum, udf_int_sum_ta(title_sum))
            // console.log(content_sum, udf_int_sum_ta(content_sum))
            hash_sum += udf_int_sum_ta(title_sum)+udf_int_sum_ta(content_sum);
            // console.log(udf_int_sum(title_sum))
            // console.log(udf_int_sum(content_sum))
            
        }
        this.id = hash_sum;
        // console.log(this.id)
    }
}

var worker;
function udf_start_worker(){
	if(typeof(Worker)!=="undefined"){
		if(typeof(worker)=="undefined"){
			worker = new Worker("client_prepare_worker.js");
		}
		worker.onmessage = function(event){
			udf_check_realtime();
		}
	}
}

function udf_stop_worker(){
	if(typeof(Worker)!=="undefined"){
		if(typeof(worker)!=="undefined"){
			worker.terminate();
			worker = undefined;
		}
	}
}