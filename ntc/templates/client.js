/* 
// =========================================================
// client javascript file
// =========================================================
*/
function import_script(url) {
    var script = document.createElement("script");  // create a script DOM node
    script.src = url;  // set its src to the provided URL
    document.body.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
}

import_script('socket.io.js');
import_script('d3.min.js');
import_script('nv.d3.min.js');

import_script('client_dictionary_symbol.js');
import_script('client_dictionary.js');
import_script('client_dictionary_kr.js');
import_script('client_dictionary_en.js');

import_script('client_prepare_html.js');
import_script('client_prepare_udf.js');
import_script('client_prepare_event.js');
import_script('client_prepare_api.js');
import_script('client_prepare_global_value.js');

import_script('client_prepare_sql.js');
import_script('client_prepare_run.js');