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
var sensors = {
    '':''
    ,menu_data_checkbox_temperature : 'Temperature'
    ,menu_data_checkbox_humidity : 'Humidity'
    ,menu_data_checkbox_atmospheric_pressure : 'Pressure'
    ,menu_data_checkbox_ambient_light : 'Ambient_light'
    ,menu_data_checkbox_air_quality : 'AirQualityStatic'
    ,menu_data_checkbox_indoor_air_quality : 'IAQaccuracyStatic'
    ,menu_data_checkbox_movement : 'Movement'
    ,menu_data_checkbox_hall : 'Hall'
    ,menu_data_checkbox_battery_level : 'BatteryLevel'
    ,menu_data_checkbox_sensor_node_id : 'SensorNodeId'
    ,menu_data_checkbox_gateway_id : 'GatewayId'
    ,menu_data_checkbox_node_status : 'NodeStatus'
    ,menu_data_checkbox_node_role : 'NodeRole'
    ,menu_data_checkbox_object : 'Objects'
    ,menu_data_checkbox_source_address : 'SourceAddress'
    ,menu_data_checkbox_user : 'User'
    ,menu_data_checkbox_timestamp : 'Timestamp'
};
var menus = {
     menu_term:menu_term
    ,menu_sens:menu_sens
    ,menu_data:menu_data
    ,menu_sort:menu_sort
    ,menu_valu:menu_valu
    ,menu_char:menu_char
    ,menu_view:menu_view
};
var charts = [];
class ChartBase {
    /* global udf_generate_id */
    /* global udf_duplication_check_id */
    /* global udf_charts_tab_attach */
    /* global udf_remove_element */
    constructor(name) {
        // this.id=udf_generate_id();
        this.chart_material = {
             menu_term:[] // what term to 
            ,menu_sens:[] // what sensor to wahch?
            ,menu_data:[] // what data to watch?
            ,menu_sort:[] // what order to follow?
            ,menu_valu:[] // value or avg, etc?
            ,menu_char:[] // what chart to use?
            ,menu_view:[] // partition or ?
        };
        this.id = this.generate_condition();
        if(udf_chart_is_unique(this.id)){
            this.name = name;
            this.chart_tab = this.generate_tab();
            this.chart_dom = {};// this.generate_dom();
            this.chart_sql = this.generate_sql(); // many chart to compare
            this.chart_res = {}; // responce data from DBMS
            charts.push(this);
            udf_alert('chart made by '+this.id);
        }
        else {
            this.delete_chart();
        }
    }
    generate_res(res){
        this.chart_res = res;
    }
    generate_dom(){
        this.chart_dom = udf_charts_dom_attach(this.id, this.charts_data)
    }
    generate_tab(){
        return udf_charts_tab_attach(this.id, this.name);
    }
    generate_sql(){
        if(udf_check_value_order(this)){ // 값 선택
            return udf_generate_sql(this);
        }
        else {
            return udf_generate_sql_other(this);
        }
    }
    delete_chart(){
        delete this;
        udf_alert('duplicated id.\nplease change search condition.');
    }
    generate_condition() {
        /* global udf_get_title */
        /* global udf_str_sum */
        var hash_id = "";
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
            hash_sum += udf_int_sum(title_sum)+udf_int_sum(content_sum);
        }
        // hash_id+=hash_sum;
        return hash_id+hash_sum;
    }
}