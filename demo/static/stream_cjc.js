initViewer();

//=== Initiate streaming from server
// Adapted from https://stackoverflow.com/questions/31948285/display-data-streamed-from-a-flask-view-as-it-updates
var xhr = new XMLHttpRequest();
xhr.open("GET", streamUrl);
xhr.send();
var position = 0;


function handleNewData() {
    // the response text include the entire response so far
    // split the messages, then take the messages that haven't been handled yet
    // position tracks how many messages have been handled
    // messages end with a newline, so split will always show one extra empty message at the end
    var messages = xhr.responseText.split('\n');
    messages.slice(position, -1).forEach(function(value) {
        //console.log(value);
        // When a new CityJSONFeature is loaded, add it to the map
        handleNewFeature(value)
    });
    position = messages.length - 1;
}

var timer;
timer = setInterval(function() {
    // check the response for new data
    handleNewData();
    // stop checking once the response has ended
    if (xhr.readyState == XMLHttpRequest.DONE) {
        clearInterval(timer);
    }
}, 10);
