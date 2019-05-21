/* 
// =========================================================
// client dom control javascript file
// =========================================================
*/





var menu_check_all = function(event){
    console.log(this)
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

var chart_add_click = function(){
    menu_wrapper_open();
};

var menu_wrapper_open = function(){
    /* global menu_wrapper */
    udf_display_true(menu_wrapper);
};

var menu_wrapper_close = function(){
    /* global menu_wrapper */
    udf_display_none(menu_wrapper);
};

var menu_wrapper_toggle = function(){
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

function import_script(url) {
    var script = document.createElement("script");  // create a script DOM node
    script.src = url;  // set its src to the provided URL
    document.body.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
}