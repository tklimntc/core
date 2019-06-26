/* 
// =========================================================
// client dom control javascript file
// =========================================================
*/
/* global menus */
/* global ChartBase */
/* global preparedHTML */
/* global preparedSQL */

var udf_alert = function(msg){
    // alert(msg);
    if(msg=='duplicate chart'){
        alert('조회조건이 중복되었습니다.');
    }
    if(msg=='no result'){
        alert('검색결과가 없습니다.');
    }
    if(msg==word_current.i18n_alert_select_none){
        alert(word_current.i18n_alert_select_none);
    }
}
var test = true;
var sync = true;
var udf_init_test = function () {
    /* global menu_sens_checkbox_all */
    /* global menu_data_checkbox_all */
    /* global menu_sort_checkbox_data_partition */
    /* global nav_realtime_toggle_wrapper */
    if(!test){return}
    menu_sens_checkbox_all.click();
    menu_data_checkbox_all.click();
    menu_sort_checkbox_data_partition.click();
    udf_i18n_menu_navigator_button_create_click();
    nav_realtime_toggle_wrapper.click();
};

var udf_ = function () {
    
};

var udf_chart_refresh = function () {
    for(var i in charts){
        udf_chart_create_update(charts[i]);
    }
    udf_remove_tooltip_all()
};

var udf_res_change_node_name = function (res) {
    var node = document.getElementById('menu_sens_'+res.serial);
    if(node!=null){
        node.value = res.name;
        udf_chart_refresh();
    }
};


var udf_req_change_node_name = function (node) {
    var sql = preparedSQL.rename.replace(/values_/gi,'("'+node.placeholder+'","'+node.value+'")');
    socket.emit('req_node_rename',{serial:node.placeholder,name:node.value,sql:sql,sync:sync});
};

var udf_realtime_toggle = function (cbx) {
    /* global udf_start_worker */
    /* global udf_stop_worker */
    if(cbx.checked){
        udf_start_worker();
    } else {
        udf_stop_worker();
    }
};

var udf_check_realtime = function () {
    if(charts.length<1){
        udf_update_prepare();
    } else if (charts[0].chart_res.length>1000){
        document.location.reload();
    } else {
        udf_update_prepare();
    }
};

var udf_update_prepare = function () {
    for(var i in charts){
        var current_chart = charts[i];
        if(typeof(charts[i].chart_emt)!='undefined' && charts[i].chart_emt.style.display!="none"){
            udf_update_emit(current_chart);
        }
    }
};

var udf_update_emit = function (chart) {
    if(chart.chart_res.length>0){
        var sql = udf_generate_sql_real(chart);
        socket.emit('req_update_data',{id:chart.id,sql:sql});
    }
};


var udf_delete_all = function () {
    for(var a in [1,2,3]){
        for(var i in charts){
            charts[i].delete_chart();
        }
    }
    udf_remove_tooltip_all()
};


var udf_show_all = function (id) {
    var chartlist = chart_root.getElementsByClassName('chart_emt');
    var count = 0;
    try{
        for (var i in chartlist){
            count += (chartlist[i].style.display=='')*1;
        }
    }catch(e){}
    var tf = (count!=chartlist.length);
    try{
        switch(tf){
            case true:
                for (var i in chartlist){
                        chartlist[i].style.display='';
                }
                break;
            case false:
                for (var i in chartlist){
                        chartlist[i].style.display='none';
                }
                break;
        }
    }catch(e){}
};

var udf_show_only = function (id) {
    var chartlist = chart_root.getElementsByClassName('chart_emt');
    try{
        for (var i in chartlist){
            if(chartlist[i].id!='chart_emt_'+id){
                chartlist[i].style.display='none';
            }else{
                chartlist[i].style.display='';
            }
        }
    }catch(e){}
};

var udf_chart_delete = function (chart){
    try{
        chart.chart_tab.parentNode.removeChild(chart.chart_tab);
    }catch(e){}
    try{
        chart.chart_emt.parentNode.removeChild(chart.chart_emt);
    }catch(e){}
    try{
        for(var i in charts){
            if(charts[i] == chart){
                charts.splice(i,1);
            }
        }
        udf_remove_tooltip_all()
    }catch(e){}
};

var udf_remove_tooltip_all = function (){
    try{
        var tooltip = document.getElementsByClassName('nvtooltip')
        for(var a in [1,2,3]){
            for(var i in tooltip){
                tooltip[i].parentElement.removeChild(tooltip[i])
            }
        }
    }catch(e){}
}

var udf_chart_draw = function(element,data, chart_org,chart_class, chart){
    /* global nv */
    try{
        /* global d3 */
        var emt_list = [];
        for (var i in chart_org.chart_data.emt){
            emt_list.push(i);
        }
        var smt_list = [];
        for (var i in data.smt){
            smt_list.push(i);
        }
        var margin = {top: 0, right: 20, bottom: 10, left: 0},
        		width = window.innerWidth - 120 - margin.left - margin.right,
        		height = (window.innerHeight - 310 - margin.top - margin.bottom);
        var time_parse_reserve = "%Y-%m-%d %H:%M:%S.%L";
        var parseTime = {};
        var sample_data_time = {};
        var count_ = 0;
        var selected_Data = [];
        for (var i in data.smt){
            if (data.smt[i].values.length==0){continue;}
            sample_data_time = data.smt[i].values[0].x.replace('T',' ').replace('Z','').slice(0,-3);
            if(count_++ == 0){
                parseTime = d3.time.format(time_parse_reserve.slice(0,(3*((sample_data_time.replace('T',' ').replace('Z','').length-1)/3)-1)));
            }
            for (var j in data.smt[i].values){
                sample_data_time = data.smt[i].values[j].x.replace('T',' ').replace('Z','').slice(0,-3);
                data.smt[i].values[j].x = parseTime.parse(sample_data_time);
                data.smt[i].values[j].y = +data.smt[i].values[j].y;
            }
            selected_Data.push({key:udf_chart_get_node_nick(data.smt[i].key,chart_class,data.id, chart),values:data.smt[i].values});
        }
        nv.addGraph(function(){
            var chart = nv.models.lineWithFocusChart().width(width).height(height);
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
            d3.select('#chart_smt_'+data.id+'_chart_emt_'+chart_org.id+' svg')
                .datum(selected_Data)
                .transition().duration(500)
                .call(chart);
            nv.utils.windowResize(chart.update);
            return chart;
        });
    }catch(e){ console.log(e); chart_org.delete_chart(); }
};

var udf_parse_conversion = function(num){
    return parseInt(((num)*4)/5)+(num==4?-1:num==13?1:0);
};

var udf_chart_draw_update = function(element,data, chart_org,chart_class, chart){
    /* global nv */
    try{
        /* global d3 */
        var emt_list = [];
        for (var i in chart_org.chart_data.emt){
            emt_list.push(i);
        }
        var smt_list = [];
        for (var i in data.smt){
            smt_list.push(i);
        }
        var margin = {top: 0, right: 20, bottom: 10, left: 0},
        		width = window.innerWidth - 120 - margin.left - margin.right,
        		height = (window.innerHeight - 310 - margin.top - margin.bottom);
        var time_parse_reserve = "%Y-%m-%d %H:%M:%S.%L";
        var parseTime = {};
        var sample_data_time = {};
        var count_ = 0;
        var selected_Data = [];
        for (var i in data.smt){
            if (data.smt[i].values.length==0){continue;}
            sample_data_time = data.smt[i].values[0].x.replace('T',' ').replace('Z','').slice(0,-3);
            if(count_++ == 0){
                parseTime = d3.time.format(time_parse_reserve.slice(0,(3*((sample_data_time.replace('T',' ').replace('Z','').length-1)/3)-1)));
            }
            for (var j in data.smt[i].values){
                sample_data_time = data.smt[i].values[j].x.replace('T',' ').replace('Z','').slice(0,-3);
                data.smt[i].values[j].x = parseTime.parse(sample_data_time);
                data.smt[i].values[j].y = +data.smt[i].values[j].y;
            }
            selected_Data.push({key:udf_chart_get_node_nick(data.smt[i].key,chart_class,data.id, chart),values:data.smt[i].values});
        }
        nv.addGraph(function(){
            var chart = nv.models.lineWithFocusChart().width(width).height(height);
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
            d3.select('#chart_smt_'+data.id+'_chart_emt_'+chart_org.id+' svg')
                .datum(selected_Data)
                .transition().duration(500)
                .call(chart);
            nv.utils.windowResize(chart.update);
            return chart;
        });
    }catch(e){ console.log(e); }
};

var udf_generate_title_last_name = function (letter) {
    return letter
    .replace('value',':값')
    .replace('avg_',':평균-')
    .replace('min_',':최소-')
    .replace('max_',':최대-')
    .replace('hour','시간')
    .replace('day','일간')
    .replace('month','월간')
    .replace('year','연간');
};

var udf_chart_create = function (chart) {
    /* global chart_root */
    chart.chart_data = udf_generate_chart_data(chart);
    chart_root.insertAdjacentHTML(word_symbol.beforeend, preparedHTML.chart_emt.replace(word_symbol.global_id,chart.id).replace(word_symbol.global_inner_html,word_symbol.empty_string));
    var element = document.getElementById('chart_emt_'+chart.id);
    element.insertAdjacentHTML(word_symbol.beforeend, preparedHTML.chart_emt_title.replace(word_symbol.global_inner_html,udf_get_class_name(chart.chart_data.chart_class)+udf_generate_title_last_name(chart.selection.valu[0].slice(19))));
    chart.generate_emt(element);
    chart.smt = [];
    for(var i in chart.chart_data.emt){
        element.insertAdjacentHTML(word_symbol.beforeend, preparedHTML.chart_smt_title.replace(word_symbol.global_inner_html,udf_chart_get_sub_title(i,chart.chart_data.chart_class, chart)));
        element.insertAdjacentHTML(word_symbol.beforeend, preparedHTML.chart_smt.replace(word_symbol.global_id,chart.chart_data.emt[i].id+'_chart_emt_'+chart.id).replace(word_symbol.global_inner_html,'<svg></svg>'));
        var sub_element = document.getElementById('chart_smt_'+chart.chart_data.emt[i].id+'_chart_emt_'+chart.id);
        chart.smt.push(sub_element);
        udf_chart_draw(sub_element, chart.chart_data.emt[i], chart, chart.chart_data.chart_class, chart);
    }
    chart.chart_tab.click();
};

var udf_chart_create_update = function (chart) {
    /* global chart_root */
    chart.chart_data = udf_generate_chart_data_update(chart);
    if (document.getElementById('chart_emt_'+chart.id)==null) {
        chart_root.insertAdjacentHTML(word_symbol.beforeend, preparedHTML.chart_emt.replace(word_symbol.global_id,chart.id).replace(word_symbol.global_inner_html,word_symbol.empty_string));
        var element = document.getElementById('chart_emt_'+chart.id);
        element.insertAdjacentHTML(word_symbol.beforeend, preparedHTML.chart_emt_title.replace(word_symbol.global_inner_html,udf_get_class_name(chart.chart_data.chart_class)+udf_generate_title_last_name(chart.selection.valu[0].slice(19))));
        chart.generate_emt(element);
    }
    var element = document.getElementById('chart_emt_'+chart.id);
    chart.smt = chart.smt || [];
    for(var i in chart.chart_data.emt){
        if (document.getElementById('chart_smt_'+chart.chart_data.emt[i].id+'_chart_emt_'+chart.id)==null) {
            element.insertAdjacentHTML(word_symbol.beforeend, preparedHTML.chart_smt_title.replace(word_symbol.global_inner_html,udf_chart_get_sub_title(i,chart.chart_data.chart_class, chart)));
            element.insertAdjacentHTML(word_symbol.beforeend, preparedHTML.chart_smt.replace(word_symbol.global_id,chart.chart_data.emt[i].id+'_chart_emt_'+chart.id).replace(word_symbol.global_inner_html,'<svg></svg>'));
            var sub_element = document.getElementById('chart_smt_'+chart.chart_data.emt[i].id+'_chart_emt_'+chart.id);
            chart.smt.push(sub_element);
        }
        udf_chart_draw_update(sub_element, chart.chart_data.emt[i], chart, chart.chart_data.chart_class, chart);
    }
};

var udf_get_class_name = function (class_) {
    switch (+class_) {
        case 0:
            return word_current.i18n_menu_sort_content_whole_partition;
        case 1:
            return word_current.i18n_menu_sort_content_sensor_partition;
        case 2:
            return word_current.i18n_menu_sort_content_data_partition;
        case 3:
            return word_current.i18n_menu_sort_content_whole_merge;
        default:
            return class_;
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

var udf_replace_options = function (id){
    return id.replace('avg_','평균_').replace('min_','최소_').replace('max_','최대_');
};

var udf_separate_names = function (name, insert_sentence) {
    var return_name = name.replace('_','-').split('-');
    var return_name_1 = '';
    var return_name_2 = '';
    for (var i = 0 ; i < return_name.length ; i++ ){
        if(i==0){
            return_name_1+= return_name[i];
        }
        else{
            return_name_2+= return_name[i];
        }
    }
    return document.getElementById('menu_sens_'+return_name_1).value+':'+insert_sentence+word_current['i18n_menu_data_content_'+udf_replace_options(return_name_2)];
};

var udf_chart_get_node_nick = function (name,class_,id, chart) {
    var return_value = '';
    switch (+class_) {
        case 0:
            if(name.search('avg_')!=-1||name.search('min_')!=-1||name.search('max_')!=-1){
                 return_value = udf_separate_names(name.replace('avg_','').replace('min_','').replace('max_',''),chart.selection.valu[0].slice(22).replace('_hour','시간').replace('_day','일간').replace('_month','월간').replace('_year','연간')+'별 '+udf_replace_to_whole_words(name));
            }else{
                return_value = udf_separate_names(name,'');
            }
            break;
        case 1:
            if(name.search('avg_')!=-1||name.search('min_')!=-1||name.search('max_')!=-1){
                return_value = chart.selection.valu[0].slice(22).replace('_hour','시간').replace('_day','일간').replace('_month','월간').replace('_year','연간')+'별 '+udf_replace_to_whole_words(name)+word_current['i18n_menu_data_content_'+udf_replace_options(name.replace('avg_','').replace('min_','').replace('max_',''))];
            }else{
                return_value = word_current['i18n_menu_data_content_'+udf_replace_options(name)];
            }
            break;
        case 2:
            if(name.search('avg_')!=-1||name.search('min_')!=-1||name.search('max_')!=-1){
                return_value = chart.selection.valu[0].slice(22).replace('_hour','시간').replace('_day','일간').replace('_month','월간').replace('_year','연간')+'별 '+udf_replace_to_whole_words(name)+ document.getElementById('menu_sens_'+name.replace('avg_','').replace('min_','').replace('max_','')).value;
            }else{
                return_value = document.getElementById('menu_sens_'+name).value;
            }
            break;
        case 3:
            if(name.search('avg_')!=-1||name.search('min_')!=-1||name.search('max_')!=-1){
                return_value = udf_separate_names(name.replace('avg_','').replace('min_','').replace('max_',''),chart.selection.valu[0].slice(22).replace('_hour','시간').replace('_day','일간').replace('_month','월간').replace('_year','연간')+'별 '+udf_replace_to_whole_words(name));
            }else{
                return_value = udf_separate_names(name,'');
            }
            break;
        default:
            return_value = name+'-'+id;
            break;
    }
    return return_value;
};

var udf_chart_get_sub_title = function (name,class_, chart) {
    var return_value = '';
    switch (+class_) {
        case 0:
            if(name.search('avg_')!=-1||name.search('min_')!=-1||name.search('max_')!=-1){
                return_value = udf_separate_names(name.replace('avg_','').replace('min_','').replace('max_',''),chart.selection.valu[0].slice(22).replace('_hour','시간').replace('_day','일간').replace('_month','월간').replace('_year','연간')+'별 '+udf_replace_to_whole_words(name));
            }else{
                return_value = udf_separate_names(name,'');
            }
            break;
        case 1:
            if(name.search('avg_')!=-1||name.search('min_')!=-1||name.search('max_')!=-1){
                return_value = chart.selection.valu[0].slice(22).replace('_hour','시간').replace('_day','일간').replace('_month','월간').replace('_year','연간')+'별 '+udf_replace_to_whole_words(name)+document.getElementById('menu_sens_'+name.replace('avg_','').replace('min_','').replace('max_','')).value;
            }else{
                return_value = document.getElementById('menu_sens_'+name).value;
            }
            break;
        case 2:
            if(name.search('avg_')!=-1||name.search('min_')!=-1||name.search('max_')!=-1){
                return_value = chart.selection.valu[0].slice(22).replace('_hour','시간').replace('_day','일간').replace('_month','월간').replace('_year','연간')+'별 '+udf_replace_to_whole_words(name)+word_current['i18n_menu_data_content_'+udf_replace_options(name.replace('avg_','').replace('min_','').replace('max_',''))];
            }else{
                return_value =word_current['i18n_menu_data_content_'+udf_replace_options(name)];
            }
            break;
        case 3:
            return_value = '전체';
            break;
        default:
            return_value = name;
            break;
    }
    return return_value;
};
var udf_replace_to_whole_words = function(name) {
    if(name.search('avg_')!=-1)return'평균 ';
    if(name.search('min_')!=-1)return'최소 ';
    if(name.search('max_')!=-1)return'최대 ';
    else return'';
};

var udf_generate_chart_data_update = function(chart) {
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
    };
    chart.selection = get_check_data;
    var selected_data_list = [];
    for (var index_dd_list in get_check_data.data) {
        selected_data_list.push(get_check_data.valu[0].substr(19,4).replace('valu','')+get_check_data.data[index_dd_list].slice(19));
    }
    var data_root = {
        chart_id:chart.id
        ,chart_class:''
    };
    chart.data_root = data_root;
    switch (get_check_data.sort[0].slice(19)) {
        case sort_list[0]:
            data_root.emt = [];
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
                    if(typeof(data_root.emt[whole_emt_id].smt[mt_name])=='undefined'){
                        data_root.emt[whole_emt_id].smt[mt_name] = [];
                        data_root.emt[whole_emt_id].smt[mt_name].key = mt_name;
                        data_root.emt[whole_emt_id].smt[mt_name].values = [];
                    }
                    if(res[i][data_name]!=null) {
                        data_root.emt[whole_emt_id].smt[mt_name].values.push({x:res[i].Time,y:res[i][data_name]});
                    }
                }
            }
            data_root.chart_class='0';
            break;
        case sort_list[1]:
            data_root.emt = [];
            for (var i = 0 ; i < res.length ; i++){
                for (var selected_data_list_index in selected_data_list) {
                    var data_name = selected_data_list[selected_data_list_index];
                    var node_name = res[i].id;
                    var mt_name = data_name;
                    var whole_emt_id = node_name;
                    if(typeof(data_root.emt[whole_emt_id])=='undefined'){
                        data_root.emt[whole_emt_id] = [];
                        data_root.emt[whole_emt_id].id=whole_emt_id;
                        data_root.emt[whole_emt_id].smt=[];
                    }
                    if(typeof(data_root.emt[whole_emt_id].smt[mt_name])=='undefined'){
                        data_root.emt[whole_emt_id].smt[mt_name] = [];
                        data_root.emt[whole_emt_id].smt[mt_name].key =  mt_name;
                        data_root.emt[whole_emt_id].smt[mt_name].values = [];
                    }
                    if(res[i][data_name]!=null) {
                        data_root.emt[whole_emt_id].smt[mt_name].values.push({x:res[i].Time,y:res[i][data_name]});
                    }
                }
            }
            data_root.chart_class='1';
            break;
        case sort_list[2]:
            data_root.emt = [];
            for (var i = 0 ; i < res.length ; i++){
                for (var selected_data_list_index in selected_data_list) {
                    var data_name = selected_data_list[selected_data_list_index];
                    var node_name = res[i].id;
                    var mt_name = node_name;
                    var whole_emt_id = data_name;
                    if(typeof(data_root.emt[whole_emt_id])=='undefined'){
                        data_root.emt[whole_emt_id] = [];
                        data_root.emt[whole_emt_id].id=whole_emt_id;
                        data_root.emt[whole_emt_id].smt=[];
                    }
                    if(typeof(data_root.emt[whole_emt_id].smt[mt_name])=='undefined'){
                        data_root.emt[whole_emt_id].smt[mt_name] = [];
                        data_root.emt[whole_emt_id].smt[mt_name].key =  mt_name;
                        data_root.emt[whole_emt_id].smt[mt_name].values = [];
                    }
                    if(res[i][data_name]!=null) {
                        data_root.emt[whole_emt_id].smt[mt_name].values.push({x:res[i].Time,y:res[i][data_name]});
                    }
                }
            }
            data_root.chart_class='2';
            break;
        case sort_list[3]:
            var whole_emt_id = 'whole';
            data_root.emt = [];
            data_root.emt[whole_emt_id] = [];
            data_root.emt[whole_emt_id].id=whole_emt_id;
            data_root.emt[whole_emt_id].smt=[];
            for (var i = 0 ; i < res.length ; i++){
                for (var selected_data_list_index in selected_data_list) {
                    var data_name = selected_data_list[selected_data_list_index];
                    var node_name = res[i].id;
                    var mt_name = node_name +'_'+ data_name;
                    if(typeof(data_root.emt[whole_emt_id].smt[mt_name])=='undefined'){
                        data_root.emt[whole_emt_id].smt[mt_name] = [];
                        data_root.emt[whole_emt_id].smt[mt_name].key =  mt_name;
                        data_root.emt[whole_emt_id].smt[mt_name].values = [];
                    }
                    if(res[i][data_name]!=null) {
                        data_root.emt[whole_emt_id].smt[mt_name].values.push({x:res[i].Time,y:res[i][data_name]});
                    }
                }
            }
            data_root.chart_class='3';
            break;
        default:
            break;
    }
    return data_root;
};

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
    };
    chart.selection = get_check_data;
    var selected_data_list = [];
    for (var index_dd_list in get_check_data.data) {
        selected_data_list.push(get_check_data.valu[0].substr(19,4).replace('valu','')+get_check_data.data[index_dd_list].slice(19));
    }
    var data_root = {
        chart_id:chart.id
        ,chart_class:''
    };
    chart.data_root = data_root;
    switch (get_check_data.sort[0].slice(19)) {
        case sort_list[0]:
            data_root.emt = [];
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
                    if(typeof(data_root.emt[whole_emt_id].smt[mt_name])=='undefined'){
                        data_root.emt[whole_emt_id].smt[mt_name] = [];
                        data_root.emt[whole_emt_id].smt[mt_name].key = mt_name;
                        data_root.emt[whole_emt_id].smt[mt_name].values = [];
                    }
                    if(res[i][data_name]!=null) {
                        data_root.emt[whole_emt_id].smt[mt_name].values.push({x:res[i].Time,y:res[i][data_name]});
                    }
                }
            }
            data_root.chart_class='0';
            break;
        case sort_list[1]:
            data_root.emt = [];
            for (var i = 0 ; i < res.length ; i++){
                for (var selected_data_list_index in selected_data_list) {
                    var data_name = selected_data_list[selected_data_list_index];
                    var node_name = res[i].id;
                    var mt_name = data_name;
                    var whole_emt_id = node_name;
                    if(typeof(data_root.emt[whole_emt_id])=='undefined'){
                        data_root.emt[whole_emt_id] = [];
                        data_root.emt[whole_emt_id].id=whole_emt_id;
                        data_root.emt[whole_emt_id].smt=[];
                    }
                    if(typeof(data_root.emt[whole_emt_id].smt[mt_name])=='undefined'){
                        data_root.emt[whole_emt_id].smt[mt_name] = [];
                        data_root.emt[whole_emt_id].smt[mt_name].key =  mt_name;
                        data_root.emt[whole_emt_id].smt[mt_name].values = [];
                    }
                    if(res[i][data_name]!=null) {
                        data_root.emt[whole_emt_id].smt[mt_name].values.push({x:res[i].Time,y:res[i][data_name]});
                    }
                }
            }
            data_root.chart_class='1';
            break;
        case sort_list[2]:
            data_root.emt = [];
            for (var i = 0 ; i < res.length ; i++){
                for (var selected_data_list_index in selected_data_list) {
                    var data_name = selected_data_list[selected_data_list_index];
                    var node_name = res[i].id;
                    var mt_name = node_name;
                    var whole_emt_id = data_name;
                    if(typeof(data_root.emt[whole_emt_id])=='undefined'){
                        data_root.emt[whole_emt_id] = [];
                        data_root.emt[whole_emt_id].id=whole_emt_id;
                        data_root.emt[whole_emt_id].smt=[];
                    }
                    if(typeof(data_root.emt[whole_emt_id].smt[mt_name])=='undefined'){
                        data_root.emt[whole_emt_id].smt[mt_name] = [];
                        data_root.emt[whole_emt_id].smt[mt_name].key =  mt_name;
                        data_root.emt[whole_emt_id].smt[mt_name].values = [];
                    }
                    if(res[i][data_name]!=null) {
                        data_root.emt[whole_emt_id].smt[mt_name].values.push({x:res[i].Time,y:res[i][data_name]});
                    }
                }
            }
            data_root.chart_class='2';
            break;
        case sort_list[3]:
            var whole_emt_id = 'whole';
            data_root.emt = [];
            data_root.emt[whole_emt_id] = [];
            data_root.emt[whole_emt_id].id=whole_emt_id;
            data_root.emt[whole_emt_id].smt=[];
            for (var i = 0 ; i < res.length ; i++){
                for (var selected_data_list_index in selected_data_list) {
                    var data_name = selected_data_list[selected_data_list_index];
                    var node_name = res[i].id;
                    var mt_name = node_name +'_'+ data_name;
                    if(typeof(data_root.emt[whole_emt_id].smt[mt_name])=='undefined'){
                        data_root.emt[whole_emt_id].smt[mt_name] = [];
                        data_root.emt[whole_emt_id].smt[mt_name].key =  mt_name;
                        data_root.emt[whole_emt_id].smt[mt_name].values = [];
                    }
                    if(res[i][data_name]!=null) {
                        data_root.emt[whole_emt_id].smt[mt_name].values.push({x:res[i].Time,y:res[i][data_name]});
                    }
                }
            }
            data_root.chart_class='3';
            break;
        default:
            break;
    }
    return data_root;
};

var udf_res_search_data = function (res) {
    if(res.res.length>0){
        return udf_chart_response_attach(res);
    }
    else{
        udf_alert('no result');
        udf_find_chart(res.id).delete_chart();
    }
};

var udf_res_update_data = function (res) {
    if(res.res.length>0){
        return udf_chart_response_update(res);
    }
    else{
    }
};

var udf_chart_response_update = function (res) {
    var chart = udf_find_chart(res.id);
    if (typeof(chart) != word_symbol.undefined) {
        var temp_res = [];
        for(var i = 0 ; i < res.res.length ; i++ ){
            temp_res.push(res.res[i]);
        }
        for(var i = 0 ; i < chart.chart_res.length ; i++){
            temp_res.push(chart.chart_res[i]);
        }
        chart.chart_res=temp_res;
        udf_chart_create_update(chart);
    }
};

var udf_chart_response_attach = function (res) {
    var chart = udf_find_chart(res.id);
    if (typeof(chart) != word_symbol.undefined) {
        chart.chart_res = res.res;
        udf_chart_create(chart);
    }
};

var udf_find_chart = function (id){
    for (var i in charts){
        if(charts[i].id == id){
            return charts[i];
        }
    }
};

var udf_check_value_order = function (chart) {
    return chart.chart_material.menu_valu[0].checked == true && chart.chart_material.menu_valu[0].id == word_symbol.menu_valu_checkbox_value;
};

var udf_generate_sql = function (chart) {
    return udf_generate_sql_other(chart);
};

var udf_generate_sql_other = function (chart) {
    /* global socket */
    var sql = preparedSQL.search_other.replace(
    word_symbol.global_data,udf_get_selected_data_other(chart)).replace(
    word_symbol.global_data2,udf_get_selected_data2_other(chart)).replace(
    word_symbol.global_values,udf_get_selected_valu_other(chart)).replace(
    word_symbol.global_sensors,udf_get_selected_sensors(chart)).replace(
    word_symbol.global_limit_count,udf_get_selected_limit(chart)).replace(
    word_symbol.global_date_format,
    'DATE_FORMAT(time,'+udf_get_date_format_other(chart)+')').replace(
    word_symbol.global_begin_date,udf_get_selected_begin_date(chart)).replace(
    word_symbol.global_end_date,udf_get_selected_end_date(chart))
    .replace(/val_/gi,'').replace(/val\(/gi,'(');
    return sql;
};

var udf_generate_sql_real = function (chart) {
    /* global socket */
    var sql = preparedSQL.search_real.replace(
    word_symbol.global_data,udf_get_selected_data_other(chart)).replace(
    word_symbol.global_data2,udf_get_selected_data2_other(chart)).replace(
    word_symbol.global_values,udf_get_selected_valu_other(chart)).replace(
    word_symbol.global_sensors,udf_get_selected_sensors(chart)).replace(
    word_symbol.global_limit_count,udf_get_selected_limit(chart)).replace(
    word_symbol.global_date_format,
    'DATE_FORMAT(time,'+udf_get_date_format_other(chart)+')').replace(
    word_symbol.global_begin_date,"\""+chart.chart_res[0].Time+"\"").replace( // 
    word_symbol.global_end_date,'')
    .replace(/val_/gi,'').replace(/val\(/gi,'(');
    return sql;
};

var udf_get_selected_limit = function (chart) {
    /* global sensors */
    var selected_values = 200;
    var n = 0;
    for (var i in chart.chart_material.menu_valu){
        var _data = chart.chart_material.menu_valu[i];
        if (_data.checked){
            var time_order = _data.id.slice(23)[0];
            switch (time_order) {
                case 'h': // *24
                    selected_values *= 24;
                    break;
                case 'd': // 24
                    selected_values *= 24*24;
                    break;
                case 'm': // 31
                    selected_values *= 24*24*30;
                    break;
                case 'y': // 12
                    selected_values *= 24*24*30*12;
                    break;
                default:
                    selected_values *= 1;
                    break;
            }
            // switch (time_order) {
            //     case 'y': // 12
            //         selected_values *= 12;
            //     case 'm': // 31
            //         selected_values *= 30;
            //     case 'd': // 24
            //         selected_values *= 24;
            //     case 'h': // 24
            //         selected_values *= 24;
            //     default:
            //         selected_values *= 1;
            //         break;
            // }
        }
    }
    return 200;
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
                    selected_values = '"%Y-%m-%d %H"';
                    break;
                case 'd':
                    selected_values = '"%Y-%m-%d"';
                    break;
                case 'm':
                    selected_values = '"%Y-%m"';
                    break;
                case 'y':
                    selected_values = '"%Y"';
                    break;
                default:
                    selected_values = '"%Y-%m-%d %T.%f"';
            }
        }
    }
    return selected_values;
};

var udf_get_selected_valu_other = function (chart) {
    /* global sensors */
    var selected_values = '';
    for (var i in chart.chart_material.menu_valu){
        var _data = chart.chart_material.menu_valu[i];
        if (_data.checked){
            selected_values += _data.id.slice(19,22);
        }
    }
    return selected_values;
};

var udf_capitalize = function(s) {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

var udf_get_selected_data_other = function (chart) {
    /* global sensors */
    var selected_sensors = word_symbol.empty_string;
    for (var i in chart.chart_material.menu_data){
        var _data = chart.chart_material.menu_data[i];
        if (_data.checked){
            var data_string = udf_capitalize(_data.id.slice(19).toString());
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
            selected_sensors += " ,JSON_EXTRACT(value,'$."+data_string+"') AS "+data_string+"\n";
        }
    }
    return selected_sensors;
};

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

var udf_get_selected_begin_date = function (chart) {
    /* global menu_term_content_time_start */
    return word_symbol.double_quotes+chart.chart_material.menu_term[0].date+'T'+menu_term_content_time_start.value+':00.000000'+word_symbol.double_quotes;
};

var udf_get_selected_end_date = function (chart) {
    /* global menu_term_content_time_end */
    return word_symbol.double_quotes+chart.chart_material.menu_term[1].date+'T'+menu_term_content_time_end.value+':00.000000'+word_symbol.double_quotes;
};

var udf_charts_tab_attach = function (id,name) {
    /* global nav_charts_tab */
    /* global word_symbol */
    nav_charts_tab.insertAdjacentHTML(word_symbol.beforeend, preparedHTML.charts_tab.replace(word_symbol.global_id,id).replace(word_symbol.global_inner_text,name));
    return document.getElementById('charts_tab_'+id);
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
    element.parentNode.removeChild(element);
};

var udf_i18n_menu_navigator_button_create_click = function() {
    /* global menu_button_shrink */
    menu_button_shrink.click();
    udf_chart_add();
};

var udf_chart_add = function() {
    if (!udf_validate_request_condition()) {
        udf_alert(word_current.i18n_alert_select_none);
        return;
    }
    else {
        return new ChartBase(new Date().format('yyyy-MM-dd HH:mm:ss.ms'));
    }
};

Date.prototype.format = function(f) {
    if (!this.valueOf()) return " ";
 
    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;
     
    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|ms|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return udf_zf((d.getFullYear() % 1000),2);
            case "MM": return udf_zf((d.getMonth() + 1),2);
            case "dd": return udf_zf(d.getDate(),2);
            case "E": return weekName[d.getDay()];
            case "HH": return udf_zf(d.getHours(),2);
            case "hh": return udf_zf(((h = d.getHours() % 12) ? h : 12),2);
            case "mm": return udf_zf(d.getMinutes(),2);
            case "ss": return udf_zf(d.getSeconds(),2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            case "ms" : return udf_zf(d.getMilliseconds(),3);
            default: return $1;
        }
    });
};
var udf_string = function(String_,len){var s = '', i = 0; while (i++ < len) { s += String_; } return s;};
var udf_szf = function(String_,len){return udf_string("0",len - String_.length) + String_;};
var udf_zf = function(Number_,len){return udf_szf( Number_.toString(),len);};

var udf_chart_is_unique = function (param_id) {
    return udf_duplication_check_id(param_id)==false;
};

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
};

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
};

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
    udf_init_last_date();
    // udf_init_date(0,0,-1);
    // menu_term_content_time_start.value="00:00"
    // menu_term_content_time_end.value="00:00"
    udf_init_select();
};

var udf_init_last_date = function(res){
    socket.emit('get_last_date');
};

var udf_set_last_date = function(res){
    udf_init_date_search(res);
};

var udf_init_select = function(res){
    menu_sens_content.getElementsByClassName(word_symbol.checkbox)[0].checked=true;
    menu_data_content.getElementsByClassName(word_symbol.checkbox)[0].checked=true;
};

var udf_init_date = function(m,n,o){
    menu_term_content_date_end.value = udf_get_day(new Date);
    menu_term_content_date_start.value = udf_get_day(new Date,m,n,o);
};

var udf_init_date_search = function(date){
    var mnt = date[0].mnt.split(' ');
    var mxt = date[0].mxt.split(' ');
    menu_term_content_date_start.value = mnt[0];
    menu_term_content_time_start.value = mnt[1].slice(0,5);
    menu_term_content_date_end.value = mxt[0];
    menu_term_content_time_end.value = mxt[1].slice(0,5);
    if(test){udf_init_test()}
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
        udf_list_attach_sort(menu_sort_content,sort_list[i]);
    }
};

var udf_list_attach_sort = function(parent_node, id){
    parent_node.insertAdjacentHTML(word_symbol.beforeend, preparedHTML.charts_sort.replace(word_symbol.global_id,id));
};


var udf_data_list_release = function(){
    /* global sensor_name_list */
    /* global menu_data_content */
    for ( var i = 0 ; i < sensor_name_list.length ; i++){
        udf_list_attach_data(menu_data_content,sensor_name_list[i]);
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

var i18n_nav_legend_click = function(){
    udf_nav_legend_toggle();
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

var udf_nav_legend_toggle = function(){
    /* global menu_legend */
    udf_display_toggle(menu_legend);
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
    var script = document.createElement(word_symbol.script);
    script.src = url;
    document.body.appendChild(script);
};