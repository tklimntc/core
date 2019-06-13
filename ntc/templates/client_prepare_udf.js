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
    menu_sens_checkbox_5834a91c.checked= false;
    // menu_sens_checkbox_981e0ded.checked= true;
    menu_sens_checkbox_22580.checked= true;
    menu_sens_checkbox_14351.checked= true;
    menu_sens_checkbox_19126.checked= true;
    menu_data_checkbox_humidity.checked=true;
    // menu_valu_checkbox_max_month.checked=true;
    udf_i18n_menu_navigator_button_create_click();
};

var udf_ = function () {
    
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


var udf_chart_get_dimension_length = function (chart) {
    return udf_chart_get_dimension(chart).length;
}

var udf_chart_get_dimension = function (chart) {
    var sort = chart.chart_material.menu_sort;
    var checked_id;
    for(var i in sort){
        if(sort[i].checked){
            checked_id = sort[i].id
        }
    }
    var checked_word = checked_id.slice(19);
    var checked_list = udf_chart_get_checked(chart,checked_word.slice(0,4));
    var _length = checked_list.length;
    return checked_list;
}


var udf_sample_chart_draw = function(chart){
    // must included chart_emt, chart_smt, chart_data
    /* global d3 */
    // set the dimensions and margins of the graph
    var margin = {top: 100, right: 40, bottom: 30, left: 50},
    		width = 960 - margin.left - margin.right,
    		height = 500 - margin.top - margin.bottom;
    
    // parse the date / time
    // var parseTime = d3.timeParse("%Y-%m-%d %H:%M:%S.%L");
	var data=chart.chart_res;
    var time_parse_count = ((data[0].Time.replace('T',' ').replace('Z','').length-1)/3);
    var slice_parse_count = (3*(time_parse_count)-1);
    var time_parse_reserve = "%Y-%m-%d %H:%M:%S.%L"
    var parseTime = d3.timeParse(time_parse_reserve.slice(0,slice_parse_count));
    var privDate = '';
    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y0 = d3.scaleLinear().range([height, 0]);
    var y1 = d3.scaleLinear().range([height, 0]);
    var y2 = d3.scaleLinear().range([height, 0]);
    
    // define the 1st line
    var valueline = d3.line()
    		.x(function(d) { return x(d["Time"]); })
    		.y(function(d) { return y0(d["Temperature"]); });
    
    // define the 2nd line
    var valueline2 = d3.line()
    		.x(function(d) { return x(d.Time); })
    		.y(function(d) { return y1(d["Humidity"]); });
    	
    var valueline3 = d3.line()
    		.x(function(d) { return x(d.Time); })
    		.y(function(d) { return y2(Math.log(d["Humidity"])); });
    
    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("body").append("svg")
    		.attr("width", width + margin.left + margin.right)
    		.attr("height", height + margin.top + margin.bottom)
            .append("g")
    		.attr("transform","translate(" + margin.left + "," + margin.top + ")");
    // Get the data
    // d3.csv("data4.csv")
    // .then(function(dat) {
        // data is now whole data set
        // draw chart in here! 
    	// format the data
//     	data.forEach(function(d) {
// 			d.date = parseTime(d.date);
// 			d.close = +d.close;
// 			d.open = +d.open;d["Temperature
// 			if (d.date==null) {
// 			    d=null;
// 			}
//     	});

// y4
// m7
// d10
// h13
// m
// s
// -1/3
// 4=1
// 7=2
// 10=3
// 13=4
    	data.forEach(function(d) {
    	   // console.log(d)
			d.Time = parseTime(d.Time.replace('T',' ').replace('Z',''));
			d["Temperature"] = +d["Temperature"] | 1;
			d["Humidity"] = +d["Humidity"] | 1;
    	   // console.log(d)
			if (d.Time==null) {
			    d=null;
			}
    	});
    	// 이후 각 데이터별 유효성 검사 필요 
    	// Scale the range of the data
    	x.domain(d3.extent(data, function(d) { return d.Time; }));
    	y0.domain([0, d3.max(data, function(d) {return Math.max(d["Temperature"]);})]);
    	y1.domain([0, d3.max(data, function(d) {return Math.max(d["Humidity"]); })]);
    	y2.domain([0, d3.max(data, function(d) {return Math.max(Math.log(d["Humidity"])); })]);
    
    	// Add the valueline path.
    	svg.append("path").data([data])
    			.attr("class", "line")
    			.attr("d", valueline);
    	// Add the valueline2 path.
    	svg.append("path").data([data])
    			.attr("class", "line")
    			.style("stroke", "red")
    			.attr("d", valueline2);
		console.log
    	// Add the valueline3 path.
    	svg.append("path").data([data])
    			.attr("class", "line")
    			.style("stroke", "purple")
    			.attr("d", valueline3);
    	// Add the X Axis
    	svg.append("g")
    			.attr("transform", "translate(0," + height + ")")
    			.call(d3.axisBottom(x));
    	// Add the Y0 Axis
    	svg.append("g")
    			.attr("class", "axisSteelBlue")
    			.call(d3.axisLeft(y0));
    	// Add the Y1 Axis
    	svg.append("g")
    			.attr("class", "axisRed")
    			.attr("transform", "translate( " + width + ", 0 )")
    			.call(d3.axisRight(y1));
    	// Add the Y2 Axis
    	svg.append("g")
    			.attr("class", "axisPurple")
    			.attr("transform", "translate( " + width + ", 0 )")
    			.call(d3.axisLeft(y2));
//     }).catch(function (err) {
//         console.log('then error : ', err); // then error :  Error: Error in then()
//     }).catch(function (err) {
//         console.log('then error : ', err); // then error :  Error: Error in then()
//     });
}

var udf_sample_chart_draw_detail = function(chart_emt, chart_smt, chart_data){
}



var udf_chart_create_sub_part = function (chart, element, _merge) {
    console.log('create_lsp');
    var chart_sort_list = udf_chart_get_dimension(chart);
    var word = chart_sort_list[0].id.slice(5,9)
    console.log(word);
    if (_merge){ // 통합 옵션이 "분리"인 경우
        for(var i in chart_sort_list){
            var _chart = document.createElement(word_symbol.svg);
            _chart.id = 'chart_smt_'+chart_sort_list[i].id.slice(19,)+'_'+chart.id;
            _chart.className = word_symbol.cn_chart_smt;
            element.insertAdjacentHTML(word_symbol.beforeend,_chart.outerHTML);
        }
    }
    else { // 통합 옵션이 "통합"인 경우
        var _chart = document.createElement(word_symbol.svg);
        _chart.id = 'chart_smt_'+chart.id;
        _chart.className = word_symbol.cn_chart_smt;
        element.insertAdjacentHTML(word_symbol.beforeend,_chart.outerHTML);
    }
    udf_sample_chart_draw(chart) // will be deleted
};

var udf_chart_create = function (chart, res) {
    /* global chart_root */
    var _order = chart.chart_material.menu_sort[0].checked;
    var _merge = chart.chart_material.menu_view[0].checked;
    var _chart = chart.chart_material.menu_char[0].checked;
    // 조회조건 취합
    // 차트 개별 상위 엘리먼트 생성
    chart_root.insertAdjacentHTML(word_symbol.beforeend, preparedHTML.chart_emt.replace(word_symbol.global_id,chart.id).replace(word_symbol.global_inner_html,word_symbol.empty_string));
    var element = chart_root.lastElementChild;
    // 차트에 붙이기
    chart.generate_emt(element);
    // 내부 제작
    udf_chart_create_sub_part(chart, element, _merge);
    // chart.chart_emt = chart_root.lastElementChild;
};

var udf_res_search_data = function (res) {
    return udf_chart_add_as_response(res)
};

var udf_chart_add_as_response = function (res) {
    var chart = udf_find_chart(res.id);
    if (typeof(chart) != word_symbol.undefined) {
        chart.chart_res = res.res
        udf_chart_create(chart, res);
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
    return nav_charts_tab.lastElementChild
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

var udf_str_sum = function (string) {
    var summary = 0;
    for (var i in string){
        summary += udf_atoi(string[i]);
    }
    return summary;
    // return udf_itos(summary);
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
    if (!udf_validate_request_condition()) {
        udf_alert(word_current.i18n_alert_select_none);
        return;
    }
    else {
        return new ChartBase(word_symbol.chart_name_noname);
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
}
var udf_valu_list_release = function(){
    /* global menu_valu_content */
    var b = [word_symbol.hour,word_symbol.day,word_symbol.month,word_symbol.year];
    var a = [word_symbol.avg,word_symbol.min,word_symbol.max];
    for ( var i = 0 ; i < a.length ; i++){
        for ( var j = 0 ; j < b.length ; j++){
            udf_list_attach_valu(menu_valu_content, a[i]+word_symbol._+b[j]);
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