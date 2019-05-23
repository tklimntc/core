/* 
// =========================================================
// client event control javascript file
// =========================================================
*/
i18n_menu_navigator_button_create.addEventListener('click',udf_chart_add);
i18n_nav_title_chart.addEventListener('click',udf_i18n_nav_title_chart_click);
menu_button_shrink.addEventListener('click',udf_menu_button_shrink_click);
menu_sens_checkbox_all.addEventListener('change',(event) => {udf_menu_check_all(event)});
menu_data_checkbox_all.addEventListener('change',(event) => {udf_menu_check_all(event)});
