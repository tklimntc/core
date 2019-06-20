/* 
// =========================================================
// client event control javascript file
// =========================================================
*/
/* global i18n_language_global_korean */
/* global i18n_language_global_english */
/* global i18n_menu_navigator_button_create */
/* global i18n_nav_title_chart */
/* global menu_button_shrink */
/* global menu_sens_checkbox_all */
/* global menu_data_checkbox_all */
/* global i18n_menu_term_content_label_preset_day */
/* global i18n_menu_term_content_label_preset_week */
/* global i18n_menu_term_content_label_preset_month */
/* global i18n_menu_term_content_label_preset_year */
/* global udF_i18n_language_global_korean_click */
/* global udf_i18n_language_global_english_click */
/* global udf_i18n_menu_navigator_button_create_click */
/* global udf_i18n_nav_title_chart_click */
/* global udf_menu_button_shrink_click */
/* global udf_menu_check_all */
/* global udf_menu_check_all */
/* global udf_i18n_menu_term_content_label_preset_day_click */
/* global udf_i18n_menu_term_content_label_preset_week_click */
/* global udf_i18n_menu_term_content_label_preset_month_click */
/* global udf_i18n_menu_term_content_label_preset_year_click */
i18n_language_global_korean.addEventListener('click',udF_i18n_language_global_korean_click);
i18n_language_global_english.addEventListener('click',udf_i18n_language_global_english_click);
i18n_menu_navigator_button_create.addEventListener('click',udf_i18n_menu_navigator_button_create_click);
i18n_nav_title_chart.addEventListener('click',udf_i18n_nav_title_chart_click);
menu_button_shrink.addEventListener('click',udf_menu_button_shrink_click);
menu_sens_checkbox_all.addEventListener('change',(event) => {udf_menu_check_all(event)});
menu_data_checkbox_all.addEventListener('change',(event) => {udf_menu_check_all(event)});
i18n_menu_term_content_label_preset_day.addEventListener('click',udf_i18n_menu_term_content_label_preset_day_click);
i18n_menu_term_content_label_preset_week.addEventListener('click',udf_i18n_menu_term_content_label_preset_week_click);
i18n_menu_term_content_label_preset_month.addEventListener('click',udf_i18n_menu_term_content_label_preset_month_click);
i18n_menu_term_content_label_preset_year.addEventListener('click',udf_i18n_menu_term_content_label_preset_year_click);