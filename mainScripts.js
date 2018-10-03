// Normal require stuffs
const fs = require("fs");

// Other variables needed (or just to make the program run smoother)
var config = JSON.parse(fs.readFileSync("./config.json", "utf8"));
var lyricsInputFull;
var lyricsInputArray;
var toggleForLyricsAndSyllables = false;
var readyToWriteFiles = false;

// Global HTML element variables
document.getElementById("version").innerHTML = config.version;

var HTMLChartFilePath = document.getElementById("chartFilePathInput");
var HTMLLyricInput = document.getElementById("lyricsInputArea");

var HTMLChartInfoDiv = document.getElementById("chartAndPhraseInfo");
var HTMLChartName = document.getElementById("chartName");
var HTMLPhraseCount = document.getElementById("phraseCount");
var HTMLLyricEventCount = document.getElementById("lyricEventCount");
var HTMLSyllableCount = document.getElementById("syllableCount");
var HTMLPhrasesAndLyrics = document.getElementById("phrasesAndLyrics");

var HTMLNoChartFile = document.getElementById("noChartFile");
var HTMLNoLyricsWritten = document.getElementById("noLyrcisWritten");

var HTMLErrorDiv = document.getElementById("problemCauses");
var HTMLErrorMessage = document.getElementById("cautionMessage");

// .chart file variables with different info
var fullChart;
var chartInfo;
var chartSync;
var eventsAll;
var eventsPhraseArray;
var difficulties;

// Custom error messages on the GUI
function customErrorMessage(active, message) {
    if (active) {
        HTMLErrorDiv.style.display = "block";
        HTMLErrorMessage.innerHTML = message;
    } else if (!active) {
        HTMLErrorDiv.style.display = "none";
    }
}

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

// Button to restore the last lyric input from the config file
function restoreFromConfig() {
    HTMLLyricInput.value = config.lyricsInput;
}

// Button to show the {phrase, event count, syllable count} HTML element
function showPhrasesAndLyrics() {
    if (toggleForLyricsAndSyllables) {
        HTMLPhrasesAndLyrics.style.display = "none";
        toggleForLyricsAndSyllables = false;
    } else if (!toggleForLyricsAndSyllables) {
        HTMLPhrasesAndLyrics.style.display = "block";
        toggleForLyricsAndSyllables = true;
    }
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
        var startTime = Date.now();

        readAndSeparateChartFile();

        var chartName = readSongInfo();
        var lyricEventCount = readAndModifyEvents();
        var syllableCount = readLyricInput();
        var phrasesAmounts = testLyricEventsAndSyllables();

        HTMLChartInfoDiv.style.display = "block";
        HTMLChartName.innerHTML = chartName;
        HTMLPhraseCount.innerHTML = eventsPhraseArray.length + " phrases found";
        HTMLLyricEventCount.innerHTML = lyricEventCount + " lyric events found";
        HTMLSyllableCount.innerHTML = syllableCount + " syllables found";
        HTMLPhrasesAndLyrics.innerHTML = phrasesAmounts;

        readyToWriteFiles = true;

        console.log("it took: " + (Date.now() - startTime) + "ms to do all the things");
    } else if (HTMLChartInfoDiv.style.display != "none") {
        HTMLChartInfoDiv.style.display = "none";
        readyToWriteFiles = false;
    }
}

// Read the chart file selected and store things in variables
function readAndSeparateChartFile() {
    difficulties = [];
    fullChart = fs.readFileSync(config.pathToChartFile, "utf8").trim().split("\r\n");

    var indicies = [];
    var element = "{";
    var idx = fullChart.indexOf(element);
    while (idx != -1) {
        //console.log(idx);
        //console.log(fullChart[idx - 1]);
        indicies.push(idx);
        idx = fullChart.indexOf(element, idx + 1);
    }

    //console.log(indicies);

    for (var i = 0; i < indicies.length; i++) {
        switch (fullChart[indicies[i] - 1]) {
            case "[Song]": {
                chartInfo = fullChart.slice(indicies[i] - 1, indicies[i + 1] - 1);
                //console.log("[Song] found and stored: " + i + ", " + (i + 1));
                break;
            }
            case "[SyncTrack]": {
                chartSync = fullChart.slice(indicies[i] - 1, indicies[i + 1] - 1);
                //console.log("[SyncTrack] found and stored: " + i + ", " + (i + 1));
                break;
            }
            case "[Events]": {
                eventsAll = fullChart.slice(indicies[i] - 1, indicies[i + 1] - 1);
                //console.log("[Events] found and stored: " + i + ", " + (i + 1));
                break;
            }
            default: {
                if (i == indicies.length - 1) {
                    var temp = fullChart.slice(indicies[i] - 1, fullChart.length - 1);
                    difficulties.push(temp);
                    //console.log("found something: " + i + ", " + (i + 1));
                    break;
                } else {
                    var temp = fullChart.slice(indicies[i] - 1, indicies[i + 1] - 1);
                    difficulties.push(temp);
                    //console.log("found more difficulties: " + i + ", " + (i + 1));
                    break;
                }
            }
        }
    }
}

// Reading the main song info and updating the HTML elements
function readSongInfo() {
    var tempSongName, tempArtistName;
    for (var i = 0; i < chartInfo.length; i++) {
        if (chartInfo[i].includes("Name =")) {
            tempSongName = chartInfo[i].split("\"")[1];
        }
        if (chartInfo[i].includes("Artist =")) {
            tempArtistName = chartInfo[i].split("\"")[1];
        }
    }
    var chartName = tempSongName + " by " + tempArtistName;

    return chartName;
}

function readAndModifyEvents() {
    var tempEventArray = eventsAll.slice();
    eventsPhraseArray = [];

    for (var i = tempEventArray.length - 1; i >= 0; i--) {
        if (!tempEventArray[i].includes(" = E \"phrase_start\"") && !tempEventArray[i].includes(" = E \"phrase_end\"") && !tempEventArray[i].includes(" = E \"lyric ")) {
            tempEventArray.splice(i, 1);
        }
    }

    var tempPhraseStarts = [];
    var tempPhraseEnds = [];

    for (var i = 0; i < tempEventArray.length; i++) {
        if (tempEventArray[i].includes(" = E \"phrase_start\"")) {
            tempPhraseStarts.push(i);
        } else if (tempEventArray[i].includes(" = E \"phrase_end\"")) {
            tempPhraseEnds.push(i);
        }
    }

    if (tempPhraseStarts.length != tempPhraseEnds.length) {
        if (tempPhraseStarts.length < tempPhraseEnds.length) {
            customErrorMessage(true, "The phrase event counts are different causing the counts above not to be correct (phrase_starts missing)");
        } else if (tempPhraseStarts.length > tempPhraseEnds.length){
            customErrorMessage(true, "The phrase event counts are different causing the counts above not to be correct (phrase_ends missing)");
        }
    } else if (tempPhraseStarts.length == tempPhraseEnds.length) {
        customErrorMessage(false);
        for (var i = 0; i < tempPhraseStarts.length; i++) {
            eventsPhraseArray.push(tempEventArray.slice(tempPhraseStarts[i] + 1, tempPhraseEnds[i]));
        }
    }

    var lyricCount = 0;

    for (var i = 0; i < eventsPhraseArray.length; i++) {
        lyricCount += eventsPhraseArray[i].length;
    }

    return lyricCount;
}

function readLyricInput() {
    lyricsInputFull = HTMLLyricInput.value.trim().split("\n");
    lyricsInputArray = [];

    for (var i = 0; i < lyricsInputFull.length; i++) {
        if (lyricsInputFull[i] != "") {
            lyricsInputArray.push(lyricsInputFull[i].replace(/-/g, "- ").trim().split(" "))
        }
    }

    var syllableCount = 0;

    for (var i = 0; i < lyricsInputArray.length; i++) {
        syllableCount += lyricsInputArray[i].length;
    }

    return syllableCount;
}

function testLyricEventsAndSyllables() {
    var phraseLyricSyllables = [];
    var morePhrases = 0;

    if (lyricsInputArray.length <= eventsPhraseArray.length) {
        morePhrases = eventsPhraseArray.length;
    } else {
        morePhrases = lyricsInputArray.length;
    }

    for (var i = 0; i < morePhrases; i++) {
        var tempString = "";

        if ((i + 1) % 10 == 1 && i != 0) {
            tempString += "<br/>";
        }

        if (i >= lyricsInputArray.length) {
            tempString += "{" + (i + 1) + ", " + eventsPhraseArray[i].length + "-0}";
        } else if (i >= eventsPhraseArray.length) {
            tempString += "{" + (i + 1) + ", 0-" + lyricsInputArray.length + "}";
        } else {
            tempString += "{" + (i + 1) + ", " + eventsPhraseArray[i].length + "-" + lyricsInputArray[i].length + "}";
        }

        phraseLyricSyllables.push(tempString);
    }

    return phraseLyricSyllables.join(", ");
}
