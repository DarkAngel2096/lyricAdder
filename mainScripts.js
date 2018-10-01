// Normal require stuffs
const fs = require("fs");
var config = JSON.parse(fs.readFileSync("./config.json", "utf8"));

// Other variables needed (or just to make the program run smoother)
var chartRead = false;

// .chart file variables with different info
var fullChart;
var songInfo;
var chartSync;
var events;
var difficulties = [];

// Writes the path selected to the config file
function writePath() {
    config.pathToChartFile = document.getElementById("chartFilePathInput").files[0].path;
    fs.writeFileSync("./config.json", JSON.stringify(config, null, "\t"), "utf8", function (err) {
        console.log(err);
    });
    changeFields();
}

// Writes the lyric input from the text field once the field is not empty and is unfocused
function writeLyrics() {
    var tempValue = document.getElementById("lyricsInputArea").value;
    if (tempValue !== "") {
        config.lyricsInput = tempValue;
        fs.writeFileSync("./config.json", JSON.stringify(config, null, "\t"), "utf8", function (err) {
            console.log(err);
        });
    }
    changeFields();
}

// for testing purposes only
function resetConfig() {
    config.pathToChartFile = "";
    config.lyricsInput = "";
    fs.writeFileSync("./config.json", JSON.stringify(config, null, "\t"), "utf8", function (err) {
        console.log(err);
    });
    changeFields();
}

// Button to restore the last lyric input from the config file
function restoreFromConfig() {
    document.getElementById("lyricsInputArea").value = config.lyricsInput;
}

// Show chart and lyric input info
function changeFields() {
    if (config.pathToChartFile === "") {
        document.getElementById("noChartFile").style.display = "block";
        document.getElementById("noLyrcisWritten").style.display = "none";
    } else if (document.getElementById("lyricsInputArea").value === "") {
        document.getElementById("noChartFile").style.display = "none";
        document.getElementById("noLyrcisWritten").style.display = "block";
    } else {
        if (!chartRead) {
            readChartFile();
        }

        document.getElementById("noChartFile").style.display = "none";
        document.getElementById("noLyrcisWritten").style.display = "none";
        document.getElementById("chartAndPhraseInfo").style.display = "block";
        document.getElementById("chartName").innerHTML = "name of the chart";
        document.getElementById("phraseCount").innerHTML = "phrase counts";
        document.getElementById("lyricEventCount").innerHTML = "some lyric event counts";
        document.getElementById("phrasesAndLyrics").innerHTML = "{1, 6-5}, {4, 6-6}";
    }
}

// Read the chart file selected and store things in variables
function readChartFile() {
    fullChart = fs.readFileSync(config.pathToChartFile, "utf8").trim().split("\r\n");

    console.log(fullChart);

    var indicies = [];
    var element = "{";
    var idx = fullChart.indexOf(element);
    while (idx != -1) {
        console.log(idx);
        console.log(fullChart[idx + 1]);
        indicies.push(idx);
        idx = fullChart.indexOf(element, idx + 1);
    }

    console.log(indicies);
/*
    for (var i = 0; i < indicies.length; i++) {
        switch (fullChart[indicies[i]] - 1) {
            case "[Song]": {

                console.log("[Song] found and stored");
                break;
            }
            case "[SyncTrack]": {

                console.log("[SyncTrack] found and stored");
                break;
            }
            case "[Events]": {

                console.log("[Events] found and stored");
                break;
            }
            default: {
                if (i < indicies.length) {

                }

                break;
            }
        }
    }*/
}
