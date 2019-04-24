function fetchData() {
    postMessage("");
    setTimeout("fetchData()", 1234);
}
fetchData();