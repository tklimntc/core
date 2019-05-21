/* 
// =========================================================
// cleint preparedHTML javascript file
// =========================================================
*/
var preparedHTML = {
    nothing:''
    ,node:'<label class="label wrap_checkbox" for="menu_sens_checkbox_serial_"><div class="menu_content_column"><input id="menu_sens_checkbox_serial_" type="checkbox" class="checkbox"></input> <input class="writable_label" placeholder="serial_" id="menu_sens_serial_" value="name_"></input></div></label>'
};
/* global symbol */
/* global menu_sens_content */

var node_list_release = function(res){
    for ( var i = 0 ; i < res.length ; i++){
        list_attach(menu_sens_content, res[i].serial, res[i].name );
    }
};

var list_attach = function(parent_node, serial, name){
    parent_node.insertAdjacentHTML(symbol.beforeend, 
    preparedHTML.node.replace(symbol.global_serial,serial).replace(symbol.global_name,name));
};
