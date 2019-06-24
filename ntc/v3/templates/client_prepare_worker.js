/* 
// =========================================================
// client worker javascript file
// =========================================================
*/
function fetchData() {
    postMessage("");
    setTimeout("fetchData()", 4321);
}
fetchData();