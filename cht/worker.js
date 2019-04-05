function fetchData() {
    postMessage("a");
    // console.log("a");
    setTimeout("fetchData()", 1234);
}
fetchData();