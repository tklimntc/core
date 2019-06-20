/* 
// =========================================================
// client worker javascript file
// =========================================================
*/
function fetchData() {
    postMessage("");
    setTimeout("fetchData()", 1234);
}
fetchData();