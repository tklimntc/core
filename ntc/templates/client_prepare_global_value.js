/* 
// =========================================================
// cleint prepared global value javascript file
// =========================================================
*/
/* global menu_term_content */
/* global menu_sens_content */
/* global menu_data_content */
/* global menu_sort_content */
/* global menu_valu_content */
/* global menu_char_content */
/* global menu_view_content */
var menus = {
    menu_term:menu_term_content.getElementsByClassName("checkbox"),
    menu_sens:menu_sens_content.getElementsByClassName("checkbox"),
    menu_data:menu_data_content.getElementsByClassName("checkbox"),
    menu_sort:menu_sort_content.getElementsByClassName("checkbox"),
    menu_valu:menu_valu_content.getElementsByClassName("checkbox"),
    menu_char:menu_char_content.getElementsByClassName("checkbox"),
    menu_view:menu_view_content.getElementsByClassName("checkbox"),
};
var charts = [];
class ChartBase {
    /* global udf_generate_id */
    constructor(name) {
        this.id=udf_generate_id();
        this.name=name;
        this.chart_material = {
            menu_term:[], // what term to 
            menu_sens:[], // what sensor to wahch?
            menu_data:[], // what data to watch?
            menu_sort:[], // what order to follow?
            menu_valu:[], // value or avg, etc?
            menu_char:[], // what chart to use?
            menu_view:[], // partition or ?
        };
        this.fetch_request_condition();
        this.chart_base=[]; // html push at
        this.chart_s=[]; // many chart to compare
    }
    fetch_request_condition() {
        for (var key in menus) {
            // console.log(this.chart_material)
            // console.log(menus[key]);
            for ( var i = 0 ; i < menus[key].length ; i++ ) {
                this.chart_material[key].push({id:menus[key][i].id,checked:menus[key][i].checked});
            }
        }
    }
}   