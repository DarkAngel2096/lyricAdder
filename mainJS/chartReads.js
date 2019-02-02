// normal requires
const fs = require("fs");
var config = JSON.parse(fs.readFileSync("../../lyricAdder_backups/config.json", "utf8"));  // most likely will not be needed in the future

// variable creation
var fullChartFile;
var chartSongInfo;
var chartSyncInfo;
var chartEventInfo;
var chartNotesInfo; // only in this file directly taken from the .chart read
var chartDiffsInfo; // variable to return, array of difficulties and notes for each

// just testing now, will be specified with the readChart function call later
var path = "C:\\Users\\s1800585\\Downloads\\Amaranthe - Army Of The Night (Powerwolf Cover)\\notes.chart";

// HTML element stuffs


// functions

// main function to actually read the chart file and split it up into variables for each main tag
function readChart(/* user inputted path to the chart file with the function call later */) {
    // possibly allow selection of a folder with the .chart, .ini and audio readFileSync
    if (!fs.statSync(path).isFile()) {
        // log not a file error message to UI
        return;
    }

    // possibly changed to also allow .mid files later
    if (!path.endsWith(".chart")) {
        // log not a .chart file error message to UI
        return;
    }

    // read chart file and split it up into an array for each line
    fullChartFile = [];
    fullChartFile = fs.readFileSync(path, "utf8").trim().split("\r\n");

    // check on which lines the element "{" can be found and take the array index of the field before as that is the tag name
    var indices = [];
    var element = "{";
    var idx = fullChart.indexOf(element) - 1;
    while (idx != -2) {
        indices.push(idx);
        idx = fullChart.indexOf(element, idx + 1);
    }

    // add the line count of the full chart file for ease of use in the splitting process
    indices.push(fullChartFile.length);

    // just check if any tag was found (test against 1 because the full length push)
    if (indices.length == 1) {
        // log problems with file not having any tags
        return;
    }

    // slicing out the needed parts for each tag type, except difficulties which just get pushed into one array
    for (var i = 0; i < indices.length - 1; i++) {
        switch (fullChartFile[indices[i]]) {
            case "[Song]": chartSongInfo = fullChartFile.slice(indices[i], indices[i + 1]); break;
            case "[SyncTrack]": chartSyncInfo = fullChartFile.slice(indices[i], indices[i + 1]); break;
            case "[Events]": chartEventInfo = fullChartFile.slice(indices[i], indices[i + 1]); break;
            default: {
                var tempInd = fullChartFile[indices[i]];

                if (testDiff(tempInd)) {
                    chartNotesInfo.push(fullChartFile.slice(indices[i], indices[i + 1]]);
                } else {
                    // log weird stuff found or nothing at all
                }
            }
        }
    }

    splitDifficulties();
}

// temp test difficulty function
function testDiff(tempInd) {
    let values = ["[Expert", "[Hard", "[Medium", "[Easy"];

    for (var i = 0; i < values.length; i++) {
        if (tempInd.startsWith(values[i])) {
            return true;
        }
    }
    return false;
}

// 

// function to split the difficulties and instruments into an easier array to use later
function splitDifficulties() {
    for (var i = 0; i < chartNotesInfo.length; i++) {

    }
}

// Return functions to get the info wanted under each tag

// song metadata
function getSongInfo() {
    return chartSongInfo;
}

// sync data (BPM and TS markers)
function getSyncInfo() {
    return chartSyncInfo;
}

// all global event data
function getEventInfo() {
    return chartEventInfo;
}

// the note and difficulty data
function getDiffsInfo() {
    return chartDiffsInfo;
}

// module expors
module.exports = {readChart, getSongInfo, getSyncInfo, getEventInfo, getDiffsInfo}
