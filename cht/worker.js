function fetchData() {
    postMessage("a");
    setTimeout("fetchData()", 1234);
}
fetchData();