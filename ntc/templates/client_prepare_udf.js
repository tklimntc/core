/* 
// =========================================================
// client dom control javascript file
// =========================================================
*/
/* global menus */
/* global ChartBase */

var udf_chart_add = function() {
    if (!udf_validate_request_condition()) {
        return;
    }
    else {
        let newChart = new ChartBase('chart_name_noname');
        charts.push(newChart);
        console.log(charts);
    }
};

var udf_validate_request_condition = function() {
    return (udf_check_fill(menus.menu_sens) && udf_check_fill(menus.menu_data));
};

var udf_check_fill = function(content) {
    return udf_check_count(content)>0;
};

var udf_check_count = function(content) {
    var contents_checkbox = content;
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
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

var udf_init = function(res){
    udf_words_apply_kr();
    udf_node_list_release(res);
    udf_init_date();
};

var udf_init_date = function(){
    menu_term_content_date_start.value = udf_get_day(new Date);
    menu_term_content_date_end.value = udf_get_day(new Date,0,-1);
};

// var udf_set_date = function(){
//     udf_get_day(new Date,0,0,0)
// };

var udf_get_day = function(inputDate, inputYear, inputMonth, inputDay){
	var now = new Date(inputDate||null);
	if(typeof(inputYear)!="undefined"){ now.setYear(now.getFullYear()+inputYear) }
	if(typeof(inputMonth)!="undefined"){ now.setMonth(now.getMonth()+inputMonth) }
	if(typeof(inputDay)!="undefined"){ now.setDate(now.getDate()+inputDay) }
	var day = ("00" + now.getDate()).slice(-2);
	var month = ("00" + (now.getMonth()+ 1)).slice(-2);
	var today = ("0000" + now.getFullYear()).slice(-4)+"-"+(month)+"-"+(day) ;
	return today;
}

var udf_node_list_release = function(res){
    for ( var i = 0 ; i < res.length ; i++){
        udf_list_attach(menu_sens_content, res[i].serial, res[i].name );
    }
};

var udf_list_attach = function(parent_node, serial, name){
    parent_node.insertAdjacentHTML(word_symbol.beforeend, 
    preparedHTML.node.replace(word_symbol.global_serial,serial).replace(word_symbol.global_name,name));
};

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
    for (var key in obj) {
        var element = document.getElementById(key);
        if(udf_exist_object(element)){
            udf_label_rename(element, obj[key]);
        }
    }
};

var udf_exist_object = function(obj){
    return obj && obj !== 'null' && obj !== 'undefined';
};

var udf_label_rename = function(id, name){
    id.textContent = name;
};

var udf_menu_check_all = function(event){
    var cbx = event.target.parentNode.parentNode.parentNode.getElementsByClassName("menu_content")[0].getElementsByClassName("checkbox");
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
    element.style.display='';
};

var udf_display_none = function(element){
    element.style.display='none';
};

var udf_display_toggle = function(element){
    element.style.display=element.style.display==='none'?'':'none';
};

var import_script = function(url) {
    var script = document.createElement("script");  // create a script DOM node
    script.src = url;  // set its src to the provided URL
    document.body.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
};