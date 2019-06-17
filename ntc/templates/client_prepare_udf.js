/* 
// =========================================================
// client dom control javascript file
// =========================================================
*/
/* global menus */
/* global ChartBase */
/* global preparedHTML */
/* global preparedSQL */

var udf_init_test = function () {
    menu_term_content_date_start.value='2019-04-23';
    // menu_sens_checkbox_981e0ded.checked= true;
    // menu_sens_checkbox_30c7098e.checked= false;
    // menu_sens_checkbox_22580.checked= true;
    menu_sens_checkbox_14351.checked= true;
    menu_sens_checkbox_19126.checked= true;
    menu_data_checkbox_Humidity.checked=true;
    menu_sort_checkbox_data_partition.checked=true;
    // menu_valu_checkbox_max_month.checked=true;
    udf_i18n_menu_navigator_button_create_click();
    // udf_i18n_nav_title_chart_click();
};

var udf_ = function () {
    
};

var udf_chart_draw = function(element,data, chart){
    /* global d3 */
    // set the dimensions and margins of the graph
    var margin = {top: 100, right: 40, bottom: 30, left: 70},
    		width = 960 - margin.left - margin.right,
    		height = 500 - margin.top - margin.bottom;

    // parse the date / time
    /*
    chart_data . chart.id
               . emt . "name" . id
                              . smt . "name" . id
                                             . data [  ] . Time
                                                         . Value
    */
    var sample_data_time = {};
    for (var i in data.smt){
        sample_data_time = data.smt[i].data.slice()[0].Time;
        break;
    }
    // sample_data_time.time=sample_data_time;
    // sample_data_time = sample_data_time.time;
    var smt_list = [];
    for (var i in data.smt){
        smt_list.push(i);
    }
    var time_parse_reserve = "%Y-%m-%d %H:%M:%S.%L"
    var parseTime = d3.timeParse(time_parse_reserve.slice(0,(3*((sample_data_time.replace('T',' ').replace('Z','').length-1)/3)-1)));

    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var ys = []
    for (var i = 0 ; i < smt_list.length ; i++){
        ys.push(d3.scaleLinear().range([height, 0]));
    }
    
    var valuelines = [];
    for (var i = 0 ; i < smt_list.length ; i++){
        // define the 1st line
        valuelines.push( d3.line()
        		.x(function(d) { return x(d.Time); })
        		.y(function(d) { return ys[i](d.Value); }));
    }
    
    
    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("body").append("svg")
    		.attr("width", width + margin.left + margin.right)
    		.attr("height", height + margin.top + margin.bottom)
            .append("g")
    		.attr("transform","translate(" + margin.left + "," + margin.top + ")");

    for (var i = 0 ; i < smt_list.length ; i++){
    	data.smt[smt_list[i]].data.forEach(function(d) {
    		d.Time = parseTime(d.Time.replace('T',' ').replace('Z',''));
    		d.Value = +d.Value;
    	});
	}
	
	var time_data= chart.chart_res.slice();
	console.log(time_data)
	time_data.forEach(function(d) {
        console.log(d)
        console.log(d.Time)
	    if(typeof(d.Time.replace)=='undefined'){
	       // console.log(d)
	       // console.log(d.Time)
	    }
	    else {
	       // console.log(d)
	       // console.log(d.Time)
	    }
		d.Time = parseTime(d.Time.replace('T',' ').replace('Z',''));
	});
	
    // 이후 각 데이터별 유효성 검사 필요 
	// Scale the range of the data
	x.domain(d3.extent(time_data, function(d) { return d.Time; }));
    for (var i = 0 ; i < smt_list.length ; i++){
    	ys[i].domain([0, d3.max(data.smt[smt_list[i]].data, function(d) {return Math.max(d.Value);})]);
    	// Add the valueline path.
    	svg.append("path").data([data.smt[smt_list[i]].data])
    			.attr("class", "line")
    			.style("stroke", "skyblue")
    			.attr("d", valuelines[i]);
	}

	// Add the X Axis
	svg.append("g")
			.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(x));
			
    for (var i = 0 ; i < smt_list.length ; i++){
    	// Add the Y0 Axis
    	svg.append("g")
    			.attr("class", "axisSteelBlue")
    			.attr("transform", "translate( " + width + ", 0 )")
    			.call(d3.axisLeft(ys[i]));
	}
}

var udf_chart_create = function (chart) {
    /* global chart_root */
    // 동일포맷 데이터 준비
    chart.chart_data = udf_generate_chart_data(chart)
    // 차트 최상위 엘리먼트 생성
    chart_root.insertAdjacentHTML(word_symbol.beforeend, preparedHTML.chart_emt.replace(word_symbol.global_id,chart.id).replace(word_symbol.global_inner_html,word_symbol.empty_string));
    var element = document.getElementById('chart_emt_'+chart.id);
    chart.generate_emt(element);
    // emt 갯수대로 차트 차상위 엘리먼트 생성
    chart.smt = [];
    for(var i in chart.chart_data.emt){
        // console.log(i)
        element.insertAdjacentHTML(word_symbol.beforeend, preparedHTML.chart_smt.replace(word_symbol.global_id,chart.chart_data.emt[i].id+'_chart_emt_'+chart.id).replace(word_symbol.global_inner_html,word_symbol.empty_string));
        var sub_element = document.getElementById('chart_smt_'+chart.chart_data.emt[i].id+'_chart_emt_'+chart.id);
        chart.smt.push(sub_element);
        udf_chart_draw(sub_element, chart.chart_data.emt[i], chart);
    }
};

var udf_chart_get_checked = function (chart,word) {
    var _list = [];
    var list_ = chart.chart_material[word_symbol.menu_+word];
    for (var i in list_) {
        if(list_[i].checked){
            _list.push(list_[i]);
        }
    }
    return _list;
};

var udf_chart_get_checked_id = function (chart,word) {
    var _list = [];
    var list_ = chart.chart_material[word_symbol.menu_+word];
    for (var i in list_) {
        if(list_[i].checked){
            _list.push(list_[i].id);
        }
    }
    return _list;
};


var udf_chart_get_dimension_length = function (chart) {
    return udf_chart_get_dimension(chart).length;
}

var udf_chart_get_dimension = function (chart) {
    var sort = chart.chart_material.menu_sort;
    console.log(sort)
    var checked_id;
    for(var i in sort){
        if(sort[i].checked){
            checked_id = sort[i].id
        }
    }
    console.log(checked_id)
    var checked_word = checked_id.slice(19);
    console.log(checked_word)
    var checked_list = udf_chart_get_checked(chart,checked_word.slice(0,4));
    var _length = checked_list.length;
    console.log(checked_list)
    return checked_list;
}


var udf_generate_chart_data = function(chart) {
    var res = chart.chart_res;
    var sort_list = [
          'whole_partition'
        ,'sensor_partition'
        ,  'data_partition'
        , 'whole_merge'
    ];

    var get_check_data = {
        char : udf_chart_get_checked_id(chart,'char'),
        data : udf_chart_get_checked_id(chart,'data'),
        sens : udf_chart_get_checked_id(chart,'sens'),
        sort : udf_chart_get_checked_id(chart,'sort'),
        valu : udf_chart_get_checked_id(chart,'valu'),
    }
    chart.selection = get_check_data;
    // console.log(get_check_data);
    var selected_data_list = [];
    for (var index_dd_list in get_check_data.data) {
        selected_data_list.push(get_check_data.valu[0].substr(19,4).replace('valu','')+get_check_data.data[index_dd_list].slice(19))
    }
    // console.log(selected_data_list);
    var data_root = {
        chart_id:chart.id
        
    }; // [smt] - emt - data (root)
    switch (get_check_data.sort[0].slice(19)) {
        case sort_list[0]: // whole_partition
            // preset for whole partition ( smt 1, emt n )
            // data_root.emt = {
            //     id:"whole",
            //     smt:[]
            // };
            // var whole_emt_id = '';
            data_root.emt = [];
            // console.log(res)
            for (var i = 0 ; i < res.length ; i++){
                for (var selected_data_list_index in selected_data_list) {
                    var data_name = selected_data_list[selected_data_list_index];
                    var node_name = res[i].id;
                    var mt_name = node_name +'_'+ data_name;
                    var whole_emt_id = mt_name;
                    if(typeof(data_root.emt[whole_emt_id])=='undefined'){
                        data_root.emt[whole_emt_id] = [];
                        data_root.emt[whole_emt_id].id=whole_emt_id;
                        data_root.emt[whole_emt_id].smt=[];
                    }
                    // console.log(typeof(data_root.emt.smt[mt_name]));
                    if(typeof(data_root.emt[whole_emt_id].smt[mt_name])=='undefined'){
                        data_root.emt[whole_emt_id].smt[mt_name] = [];
                        data_root.emt[whole_emt_id].smt[mt_name].id = mt_name;
                        data_root.emt[whole_emt_id].smt[mt_name].data = [];
                    }
                    if(res[i][data_name]!=null) {
                        data_root.emt[whole_emt_id].smt[mt_name].data.push({Time:res[i].Time,Value:res[i][data_name]});
                    }
                }
            }
            break;
        case sort_list[1]: // sensor_partition
            // data_root.emt = {
            //     id:"whole",
            //     smt:[]
            // };
            data_root.emt = [];
            // console.log(res)
            for (var i = 0 ; i < res.length ; i++){
                for (var selected_data_list_index in selected_data_list) {
                    var data_name = selected_data_list[selected_data_list_index];
                    var node_name = res[i].id;
                    var mt_name = data_name //+'_'+ node_name;
                    var whole_emt_id = node_name;
                    if(typeof(data_root.emt[whole_emt_id])=='undefined'){
                        data_root.emt[whole_emt_id] = [];
                        data_root.emt[whole_emt_id].id=whole_emt_id;
                        data_root.emt[whole_emt_id].smt=[];
                    }
                    // console.log(typeof(data_root.emt.smt[mt_name]));
                    if(typeof(data_root.emt[whole_emt_id].smt[mt_name])=='undefined'){
                        data_root.emt[whole_emt_id].smt[mt_name] = [];
                        data_root.emt[whole_emt_id].smt[mt_name].id = mt_name;
                        data_root.emt[whole_emt_id].smt[mt_name].data = [];
                    }
                    if(res[i][data_name]!=null) {
                        data_root.emt[whole_emt_id].smt[mt_name].data.push({Time:res[i].Time,Value:res[i][data_name]});
                    }
                }
            }
            break;
        case sort_list[2]: // data_partition
            // data_root.emt = {
            //     id:"whole",
            //     smt:[]
            // };
            data_root.emt = [];
            // console.log(res)
            for (var i = 0 ; i < res.length ; i++){
                for (var selected_data_list_index in selected_data_list) {
                    var data_name = selected_data_list[selected_data_list_index];
                    var node_name = res[i].id;
                    var mt_name = node_name //+'_'+ data_name;
                    var whole_emt_id = data_name;
                    if(typeof(data_root.emt[whole_emt_id])=='undefined'){
                        data_root.emt[whole_emt_id] = [];
                        data_root.emt[whole_emt_id].id=whole_emt_id;
                        data_root.emt[whole_emt_id].smt=[];
                    }
                    // console.log(typeof(data_root.emt.smt[mt_name]));
                    if(typeof(data_root.emt[whole_emt_id].smt[mt_name])=='undefined'){
                        data_root.emt[whole_emt_id].smt[mt_name] = [];
                        data_root.emt[whole_emt_id].smt[mt_name].id = mt_name;
                        data_root.emt[whole_emt_id].smt[mt_name].data = [];
                    }
                    if(res[i][data_name]!=null) {
                        data_root.emt[whole_emt_id].smt[mt_name].data.push({Time:res[i].Time,Value:res[i][data_name]});
                    }
                }
            }
            break;
        case sort_list[3]: // whole_merge
            // data_root.emt = {
            //     id:"whole",
            //     smt:{}
            // };
            var whole_emt_id = 'whole';
            data_root.emt = [];
            data_root.emt[whole_emt_id] = [];
            data_root.emt[whole_emt_id].id=whole_emt_id;
            data_root.emt[whole_emt_id].smt=[];
            // console.log(res)
            for (var i = 0 ; i < res.length ; i++){
                for (var selected_data_list_index in selected_data_list) {
                    var data_name = selected_data_list[selected_data_list_index];
                    var node_name = res[i].id;
                    var mt_name = node_name +'_'+ data_name;
                    // console.log(typeof(data_root.emt.smt[mt_name]));
                    if(typeof(data_root.emt[whole_emt_id].smt[mt_name])=='undefined'){
                        data_root.emt[whole_emt_id].smt[mt_name] = [];
                        data_root.emt[whole_emt_id].smt[mt_name].id = mt_name;
                        data_root.emt[whole_emt_id].smt[mt_name].data = [];
                    }
                    if(res[i][data_name]!=null) {
                        data_root.emt[whole_emt_id].smt[mt_name].data.push({Time:res[i].Time,Value:res[i][data_name]});
                    }
                }
            }
            break;
        default:
            break;
    }
    // console.log(data_root);
    return data_root;
};

var udf_res_search_data = function (res) {
    return udf_chart_response_attach(res)
};

var udf_chart_response_attach = function (res) {
    var chart = udf_find_chart(res.id);
    if (typeof(chart) != word_symbol.undefined) {
        chart.chart_res = res.res
        udf_chart_create(chart);
    }
};

var udf_find_chart = function (id){
    for (var i in charts){
        if(charts[i].id == id){
            return charts[i];
        }
    }
}

var udf_check_value_order = function (chart) {
    return chart.chart_material.menu_valu[0].checked == true && chart.chart_material.menu_valu[0].id == word_symbol.menu_valu_checkbox_value
};

var udf_generate_sql = function (chart) {
    /* global socket */
    if (chart.chart_material.menu_valu[0].checked==true){
        return preparedSQL.search.replace(
        'values_',udf_get_selected_data(chart)).replace(
        'sensors_',udf_get_selected_sensors(chart)).replace(
        'begin_date_',udf_get_selected_begin_date(chart)).replace(
        'end_date_',udf_get_selected_end_date(chart));
    } else {
        return udf_generate_sql_other;
    }
};

var udf_generate_sql_other = function (chart) {
    /* global socket */
    var sql = preparedSQL.search_other.replace(
    word_symbol.global_data,udf_get_selected_data_other(chart)).replace(
    word_symbol.global_data2,udf_get_selected_data2_other(chart)).replace(
    word_symbol.global_values,udf_get_selected_valu_other(chart)).replace(
    word_symbol.global_sensors,udf_get_selected_sensors(chart)).replace(
    word_symbol.global_date_format,udf_get_date_format_other(chart)).replace(
    word_symbol.global_begin_date,udf_get_selected_begin_date(chart)).replace(
    word_symbol.global_end_date,udf_get_selected_end_date(chart));
    return sql;
};

var udf_get_date_format_other = function (chart) {
    /* global sensors */
    var selected_values = '"%Y-%m-%d %H';
    var n = 0;
    for (var i in chart.chart_material.menu_valu){
        var _data = chart.chart_material.menu_valu[i];
        if (_data.checked){
            var time_order = _data.id.slice(23)[0];
            switch (time_order) {
                case 'h':
                    return '"%Y-%m-%d %H"';
                    break;
                case 'd':
                    return '"%Y-%m-%d"';
                    break;
                case 'm':
                    return '"%Y-%m"';
                    break;
                case 'y':
                    return '"%Y"';
                    break;
                default:
                    return '"%Y-%m-%d %H"';
            }
        }
    }
    return '"%Y-%m-%d %H"';
};

// var udf_get_selected_sens_other = function (chart) {
//     /* global sensors */
//     var selected_values = 'JSON_EXTRACT(value,"$.SensorNodeId") as "id", JSON_EXTRACT(value,"$.Timestamp") as "uxtime", ';
//     for (var i in chart.chart_material.menu_data){
//         var _data = chart.chart_material.menu_data[i];
//         if (_data.checked){
//             selected_values += 'JSON_EXTRACT(value,"$.'+sensors[_data.id]+'") as "'+sensors[_data.id]+word_symbol.double_quotes_comma_space;
//         }
//     }
//     return selected_values;
// };

var udf_get_selected_valu_other = function (chart) {
    /* global sensors */
    var selected_values = ''//'JSON_EXTRACT(value,"$.SensorNodeId") as "id", JSON_EXTRACT(value,"$.Timestamp") as "uxtime", ';
    for (var i in chart.chart_material.menu_valu){
        var _data = chart.chart_material.menu_valu[i];
        if (_data.checked){
            selected_values += _data.id.slice(19,22)//'JSON_EXTRACT(value,"$.'+sensors[_data.id]+'") as "'+sensors[_data.id]+word_symbol.double_quotes_comma_space;
        }
    }
    return selected_values;
};

var udf_capitalize = function(s) {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

var udf_get_selected_data_other = function (chart) {
    /* global sensors */
    var selected_sensors = word_symbol.empty_string;
    for (var i in chart.chart_material.menu_data){
        var _data = chart.chart_material.menu_data[i];
        if (_data.checked){
            var data_string = udf_capitalize(_data.id.slice(19).toString());
            // selected_sensors += word_symbol.double_quotes+_data.id.slice(19).toString()+word_symbol.double_quotes_comma_space;
            selected_sensors += " , values_("+data_string+") AS values__"+data_string+"\n";
        }
    }
    return selected_sensors;
};

var udf_get_selected_data2_other = function (chart) {
    /* global sensors */
    var selected_sensors = word_symbol.empty_string;
    for (var i in chart.chart_material.menu_data){
        var _data = chart.chart_material.menu_data[i];
        if (_data.checked){
            var data_string = udf_capitalize(_data.id.slice(19).toString());
            // selected_sensors += word_symbol.double_quotes+_data.id.slice(19).toString()+word_symbol.double_quotes_comma_space;
            selected_sensors += " ,JSON_EXTRACT(value,'$."+data_string+"') AS "+data_string+"\n"
        }
    }
    return selected_sensors;
};

// var udf_get_selected_sens2_other = function (chart) {
//     /* global sensors */
//     var selected_sensors = word_symbol.empty_string;
//     for (var i in chart.chart_material.menu_sens){
//         var _data = chart.chart_material.menu_sens[i];
//         if (_data.checked){
//             // selected_sensors += word_symbol.double_quotes+_data.id.slice(19).toString()+word_symbol.double_quotes_comma_space;
//             selected_sensors += ", values_("+_data.id.slice(19).toString()+" as "+"values__"+_data.id.slice(19).toString();
//         }
//     }
//     return selected_sensors;
// };

var udf_get_selected_data = function (chart) {
    /* global sensors */
    var selected_values = 'JSON_EXTRACT(value,"$.SensorNodeId") as "id", JSON_EXTRACT(value,"$.Timestamp") as "times", ';
    for (var i in chart.chart_material.menu_data){
        var _data = chart.chart_material.menu_data[i];
        if (_data.checked){
            selected_values += 'JSON_EXTRACT(value,"$.'+sensors[_data.id]+'") as "'+sensors[_data.id]+word_symbol.double_quotes_comma_space;
        }
    }
    return selected_values.slice(0,-2);
};
// values_ : ['JSON_EXTRACT(value,"$.temperature") as "temperature"', ...]

var udf_get_selected_sensors = function (chart) {
    /* global sensors */
    var selected_sensors = word_symbol.empty_string;
    for (var i in chart.chart_material.menu_sens){
        var _data = chart.chart_material.menu_sens[i];
        if (_data.checked){
            selected_sensors += word_symbol.double_quotes+_data.id.slice(19).toString()+word_symbol.double_quotes_comma_space;
        }
    }
    return word_symbol.left_round_bracket+selected_sensors.slice(0,-2)+word_symbol.right_round_bracket;
};
// sensors_ : ['sensornodeid', ...]

var udf_get_selected_begin_date = function (chart) {
    return word_symbol.double_quotes+chart.chart_material.menu_term[0].date+word_symbol.double_quotes;
};
// , begin_date_,end_date_:"2019-05-27"

var udf_get_selected_end_date = function (chart) {
    return word_symbol.double_quotes+chart.chart_material.menu_term[1].date+word_symbol.double_quotes;
};

var udf_charts_tab_attach = function (id,name) {
    /* global nav_charts_tab */
    /* global word_symbol */
    nav_charts_tab.insertAdjacentHTML(word_symbol.beforeend, preparedHTML.charts_tab.replace(word_symbol.global_id,id).replace(word_symbol.global_inner_text,name));
    // return nav_charts_tab.lastElementChild
    return document.getElementById('charts_tab_'+id);
};

var udf_chart_load = function(stored_chart) {
    for (var i in stored_chart) {
        stored_chart[i]
    }
};

var udf_get_title = function (menu) {
    return menu.getElementsByClassName(word_symbol.menu_title)[0];
};

var udf_get_date = function (menu) {
    return menu.getElementsByClassName(word_symbol.date);
};

var udf_get_checkbox = function (menu) {
    return menu.getElementsByClassName(word_symbol.checkbox);
};

var udf_get_content = function (menu) {
    return menu.getElementsByClassName(word_symbol.menu_content);
};

var udf_int_sum = function (int) {
    var summary = 0;
    var string = udf_itos(int);
    for (var i in string){
        summary += udf_itoa(string[i]);
    }
    return summary;
};

var udf_int_sum_ta = function (int) {
    var summary = '';
    var string = udf_itos(int);
    // console.log(string)
    for (var i in string){
        summary += udf_itoa_ta(+string[i]);
    }
    return summary;
};

var udf_str_sum = function (string) {
    var summary = 0;
    for (var i in string){
        summary += udf_atoi(string[i]);
    }
    return summary;
    // return udf_itos(summary);
};

var udf_itoa_ta = function(i){
	return String.fromCharCode(i+65);
};

var udf_itoa = function(i){
	return String.fromCharCode(i);
};

var udf_stoi = function(i){
    return parseInt(i,10);
};

var udf_atoi = function(s){
	return s.charCodeAt();
};

var udf_itos = function(i){
    return i.toString();
};

var udf_remove_element = function(element) {
    console.log(element);
    element.parentNode.removeChild(element);
};

var udf_i18n_menu_navigator_button_create_click = function() {
    udf_chart_add();
};

var udf_chart_add = function() {
    /* global menu_chart_name */
    /* global serve_count */
    if (!udf_validate_request_condition()) {
        udf_alert(word_current.i18n_alert_select_none);
        return;
    }
    else {
        return new ChartBase(menu_chart_name.value+word_symbol._+serve_count++);
    }
};

var udf_alert = function(msg){
    // alert(msg);
    // console.log(msg);
}

var udf_chart_is_unique = function (param_id) {
    return udf_duplication_check_id(param_id)==false;
}

var udf_duplication_check_id = function (param_id) {
    var count = 0;
    for(var i in charts){
        if (charts[i].id==param_id) {
            count++;
        }
    }
    if ( count > 0 ){
        return true;
    }
    else {
        return false;
    }
}

var udf_validate_request_condition = function() {
    return (udf_check_fill(menus.menu_sens) && 
            udf_check_fill(menus.menu_data));
};

var udf_check_fill = function(content) {
    return udf_check_count(content)>0;
};

var udf_check_count = function(content) {
    var contents_checkbox = content.getElementsByClassName(word_symbol.menu_content)[0].getElementsByClassName(word_symbol.checkbox);
    var count=0;
    for (var i in contents_checkbox) {
        count += contents_checkbox[i].checked==true?1:0;
    }
    return count;
};

var udf_generate_id = function() {
    return udf_generate_avoid_duplication();
};

var udf_generate_avoid_duplication = function() {
    var id = udf_generate_hash();
    var count = 0;
    var id_group = udf_extract_id_group();
    for (var i = 0 ; i < id_group.length ; i++){
        if ( id_group == id ){ count++; }
    }
    if ( count > 0 ) {
        return udf_generate_avoid_duplication();
    }
    else {
        return id;
    }
};

var udf_generate_hash = function() {
    var id = udf_generate_random_string_16();
    var hash_number = 0;
    for ( var char_index in id ) {
        hash_number += id[char_index].charCodeAt(0);
    }
    var hash_palate = hash_number.toString()+hash_number.toString()+hash_number.toString()+hash_number.toString()+hash_number.toString()+hash_number.toString()+hash_number.toString()+hash_number.toString();
    var hash_character = "";
    for ( var i = 0 ; i < 4 ; i++ ) {
        hash_character += String.fromCharCode(65+parseInt(hash_palate[i],10));
    }
    return id+hash_character;
};

var udf_extract_id_group = function() {
    /* global charts */
    var id_group = [];
    for ( var key in charts ) {
        id_group.push(charts[key].id);
    }
    return id_group;
};

var udf_generate_random_string_16 = function() {
    return udf_generate_random_string(16);
}

var udf_generate_random_string = function(length) {
    var result           = word_symbol.empty_string;
    var characters       = word_symbol.whole_characters;
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

var udf_init = function(res){
    udf_node_list_release(res);
    udf_valu_list_release();
    udf_sort_list_release();
    udf_data_list_release();
    udf_words_apply_kr();
    udf_init_date(0,0,-1);
    udf_init_select();
    udf_init_test();
};

var udf_init_select = function(res){
    menu_sens_content.getElementsByClassName(word_symbol.checkbox)[0].checked=true;
    menu_data_content.getElementsByClassName(word_symbol.checkbox)[0].checked=true;
};

var udf_init_date = function(m,n,o){
    menu_term_content_date_end.value = udf_get_day(new Date);
    menu_term_content_date_start.value = udf_get_day(new Date,m,n,o);
};

var udf_i18n_menu_term_content_label_preset_day_click = function () {
    udf_init_date(0,0,-1);
};
var udf_i18n_menu_term_content_label_preset_week_click = function () {
    udf_init_date(0,0,-7);
};
var udf_i18n_menu_term_content_label_preset_month_click = function () {
    udf_init_date(0,-1);
};
var udf_i18n_menu_term_content_label_preset_year_click = function () {
    udf_init_date(-1);
};

var udf_get_day = function(inputDate, inputYear, inputMonth, inputDay){
	var now = new Date(inputDate||null);
	if(typeof(inputYear)!=word_symbol.undefined){ now.setYear(now.getFullYear()+inputYear) }
	if(typeof(inputMonth)!=word_symbol.undefined){ now.setMonth(now.getMonth()+inputMonth) }
	if(typeof(inputDay)!=word_symbol.undefined){ now.setDate(now.getDate()+inputDay) }
	var day = (word_symbol._0_2 + now.getDate()).slice(-2);
	var month = (word_symbol._0_2 + (now.getMonth()+ 1)).slice(-2);
	var today = (word_symbol._0_4 + now.getFullYear()).slice(-4)+word_symbol.hyphen+(month)+word_symbol.hyphen+(day) ;
	return today;
};

var udf_sort_list_release = function(){
    /* global menu_sort_content */
    var sort_list = [
        'whole_partition'
        ,'sensor_partition'
        ,'data_partition'
        ,'whole_merge'
        // ,'sensor_merge'
        // ,'data_merge'
    ];

    for ( var i = 0 ; i < sort_list.length ; i++){
        udf_list_attach_sort(menu_sort_content,sort_list[i])
    }
};

var udf_list_attach_sort = function(parent_node, id){
    parent_node.insertAdjacentHTML(word_symbol.beforeend, preparedHTML.charts_sort.replace(word_symbol.global_id,id));
};


var udf_data_list_release = function(){
    /* global menu_sort_content */
    /* global sensor_name_list */
    for ( var i = 0 ; i < sensor_name_list.length ; i++){
        udf_list_attach_data(menu_data_content,sensor_name_list[i])
    }
};

var udf_list_attach_data = function(parent_node, id){
    parent_node.insertAdjacentHTML(word_symbol.beforeend, preparedHTML.charts_data.replace(word_symbol.global_id,id));
};

var udf_valu_list_release = function(){
    /* global menu_valu_content */
    var select_time = [word_symbol.hour,word_symbol.day,word_symbol.month,word_symbol.year];
    var select_function = [word_symbol.avg,word_symbol.min,word_symbol.max];
    for ( var i = 0 ; i < select_function.length ; i++){
        for ( var j = 0 ; j < select_time.length ; j++){
            udf_list_attach_valu(menu_valu_content, select_function[i]+word_symbol._+select_time[j]);
        }
    }
};

var udf_list_attach_valu = function(parent_node, id){
    parent_node.insertAdjacentHTML(word_symbol.beforeend, preparedHTML.charts_valu.replace(word_symbol.global_id,id));
};

var udf_node_list_release = function(res){
    /* global menu_sens_content */
    for ( var i = 0 ; i < res.length ; i++){
        udf_list_attach(menu_sens_content, res[i].serial, res[i].name );
    }
};

var udf_list_attach = function(parent_node, serial, name){
    parent_node.insertAdjacentHTML(word_symbol.beforeend, preparedHTML.node.replace(word_symbol.global_serial,serial).replace(word_symbol.global_name,name));
};

var udF_i18n_language_global_korean_click = function(){
    udf_words_apply_kr();
}
var udf_i18n_language_global_english_click = function(){
    udf_words_apply_en();
}

var udf_words_apply_kr = function(){
    /* global word_kr */
    udf_words_apply(word_kr);
}

var udf_words_apply_en = function(){
    /* global word_en */
    udf_words_apply(word_en);
};

var udf_words_apply = function(obj){
    // localstorage 
    /* global word_current */
    word_current = obj;
    for (var key in obj) {
        var element = document.getElementById(key);
        if(udf_exist_object(element)){
            udf_label_rename(element, obj[key]);
        }
    }
};

var udf_exist_object = function(obj){
    return obj && obj !== word_symbol.null && obj !== word_symbol.undefined;
};

var udf_label_rename = function(id, name){
    id.textContent = name;
};

var udf_menu_check_all = function(event){
    var cbx = event.target.parentNode.parentNode.parentNode.getElementsByClassName(word_symbol.menu_content)[0].getElementsByClassName(word_symbol.checkbox);
    var isTrue = event.target.checked;
    for ( var i = 0 ; i < cbx.length ; i++ ) {
        cbx[i].checked = isTrue;
    }
};

var udf_check_true = function(element){
    element.checked = true;
};

var udf_check_false = function(element){
    element.checked = false;
};

var udf_check_toggle = function(element){
    element.checked = element.checked==true?false:true;
};

var udf_chart_add_click = function(){
    udf_menu_wrapper_open();
};

var udf_i18n_nav_title_chart_click = function(){
    udf_menu_wrapper_toggle();
};

var udf_menu_button_shrink_click = function(){
    udf_menu_wrapper_close();
};

var udf_menu_wrapper_open = function(){
    /* global menu_wrapper */
    udf_display_true(menu_wrapper);
};

var udf_menu_wrapper_close = function(){
    /* global menu_wrapper */
    udf_display_none(menu_wrapper);
};

var udf_menu_wrapper_toggle = function(){
    /* global menu_wrapper */
    udf_display_toggle(menu_wrapper);
};

var udf_display_true = function(element){
    element.style.display=word_symbol.empty_string;
};

var udf_display_none = function(element){
    element.style.display=word_symbol.none;
};

var udf_display_toggle = function(element){
    element.style.display=element.style.display===word_symbol.none?word_symbol.empty_string:word_symbol.none;
};

var import_script = function(url) {
    var script = document.createElement(word_symbol.script);  // create a script DOM node
    script.src = url;  // set its src to the provided URL
    document.body.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
};