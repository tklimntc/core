/* 
// =========================================================
// client event control javascript file
// =========================================================
*/
/* global menu_button_shrink */
/* menu_term_checkbox_all */
/* menu_sens_checkbox_all */
/* menu_data_checkbox_all */
i18n_add_chart.addEventListener('click',menu_wrapper_toggle);
menu_button_shrink.addEventListener('click',menu_wrapper_close);
// i18n_add_.addEventListener('click',menu_wrapper_open);
menu_term_checkbox_all.addEventListener('change',(event) => {menu_check_all(event)});
menu_sens_checkbox_all.addEventListener('change',(event) => {menu_check_all(event)});
menu_data_checkbox_all.addEventListener('change',(event) => {menu_check_all(event)});
// menu_sort_checkbox_all.addEventListener('change',(event) => {menu_check_all(event)});
// menu_valu_checkbox_all.addEventListener('change',(event) => {menu_check_all(event)});
// menu_char_checkbox_all.addEventListener('change',(event) => {menu_check_all(event)});
// menu_view_checkbox_all.addEventListener('change',(event) => {menu_check_all(event)});