// Normal require stuffs
const fs = require("fs");

// Other variables needed (or just to make the program run smoother)
var chartRead = false;
var config = JSON.parse(fs.readFileSync("./config.json", "utf8"));

// Global HTML element variables
document.getElementById("version").innerHTML = config.version;

var HTMLChartFilePath = document.getElementById("chartFilePathInput");
var HTMLLyricInput = document.getElementById("lyricsInputArea");

var HTMLChartInfoDiv = document.getElementById("chartAndPhraseInfo");
var HTMLChartName = document.getElementById("chartName");
var HTMLPhraseCount = document.getElementById("phraseCount");
var HTMLLyricEventCount = document.getElementById("lyricEventCount");
var HTMLPhrasesAndLyrics = document.getElementById("phrasesAndLyrics");

var HTMLNoChartFile = document.getElementById("noChartFile");
var HTMLNoLyricsWritten = document.getElementById("noLyrcisWritten");

// .chart file variables with different info
var fullChart;
var songInfo;
var chartSync;
var events;
var difficulties = [];

// Writes the path selected to the config file
function writePath() {
    if (HTMLChartFilePath.files[0] !== undefined) {
        config.pathToChartFile = HTMLChartFilePath.files[0].path;
        fs.writeFileSync("./config.json", JSON.stringify(config, null, "\t"), "utf8", function (err) {
            console.log(err);
        });
    }
    changeFields();
}

// Writes the lyric input from the text field once the field is not empty and is unfocused
function writeLyrics() {
    var tempValue = HTMLLyricInput.value;
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
    HTMLLyricInput.value = config.lyricsInput;
}

// Show chart and lyric input info
function changeFields() {
    if (HTMLChartFilePath.files[0] === undefined) {
        HTMLNoChartFile.style.display = "block";
    } else if (HTMLNoChartFile.style.display != "none") {
        HTMLNoChartFile.style.display = "none";
    }

    if (HTMLLyricInput.value === "") {
        HTMLNoLyricsWritten.style.display = "block";
    } else if (HTMLNoLyricsWritten.style.display != "none") {
        HTMLNoLyricsWritten.style.display = "none";
    }

    if (HTMLLyricInput.value !== "" && HTMLChartFilePath.files[0] !== undefined) {
        if (!chartRead) {
            readChartFile();
            chartRead = true;
        }

        HTMLChartInfoDiv.style.display = "block";
        HTMLChartName.innerHTML = "A new name";
        HTMLPhraseCount.innerHTML = "123" + "phrases found";
        HTMLLyricEventCount.innerHTML = "No chart file read";
        HTMLPhrasesAndLyrics.innerHTML = "{1, 5-0}, {2, 2-0}"

    /*  document.getElementById("lyricsInputArea").value !== "" && document.getElementById("chartFilePathInput").path.length != 0
        document.getElementById("chartAndPhraseInfo").style.display = "block";
        document.getElementById("chartName").innerHTML = "name of the chart";
        document.getElementById("phraseCount").innerHTML = "phrase counts";
        document.getElementById("lyricEventCount").innerHTML = "some lyric event counts";
        document.getElementById("phrasesAndLyrics").innerHTML = "{1, 6-5}, {4, 6-6}";*/
    } else if (HTMLChartInfoDiv.style.display != "none") {
        HTMLChartInfoDiv.style.display = "none";
    }
}

// Read the chart file selected and store things in variables
function readChartFile() {
    fullChart = fs.readFileSync(config.pathToChartFile, "utf8").trim().split("\r\n");

    var indicies = [];
    var element = "{";
    var idx = fullChart.indexOf(element);
    while (idx != -1) {
        console.log(idx);
        console.log(fullChart[idx - 1]);
        indicies.push(idx);
        idx = fullChart.indexOf(element, idx + 1);
    }

    console.log(indicies);

    for (var i = 0; i < indicies.length; i++) {
        switch (fullChart[indicies[i] - 1]) {
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
                if (i = indicies.length) {

                    console.log("found something");
                    break;
                } else {

                    console.log("found more difficulties");
                    break;
                }
            }
        }
    }
}
