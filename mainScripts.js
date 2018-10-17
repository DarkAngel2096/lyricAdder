// Normal require stuffs
const fs = require("fs");

// File requires to other .js files
var songStuffs = require("./soundStuff.js");

// Other variables needed (or just to make the program run smoother)
var config = JSON.parse(fs.readFileSync("../lyricAdder_backups/config.json", "utf8"));
var lyricsInputFull;
var lyricsInputArray;           // 2D array
var toggleForLyricsAndSyllables = false;

var modifiedOutputFile;

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

var HTMLWriteButton = document.getElementById("writeButton");

// .chart file variables with different info
var fullChart;
var chartInfo;
var chartSync;
var eventsAll;
var eventsPhraseArray;          // 2D array
var difficulties;
var modifiedLyricEventArray;    // single dimension for ease of use

// Custom error messages on the GUI
function customErrorMessage(active, messageType, message) {
    if (active) {
        HTMLErrorDiv.style.display = "block";

        if (messageType == "error") {
            HTMLErrorMessage.style.color = "red";
            HTMLErrorMessage.innerHTML = "Error: " + message;
        } else if (messageType == "notice") {
            HTMLErrorMessage.style.color = "yellow";
            HTMLErrorMessage.innerHTML = "Notice: " + message;
        } else if (messageType == "completed") {
            HTMLErrorMessage.style.color = "green";
            HTMLErrorMessage.innerHTML = "Completed: " + message;
        }
    } else if (!active) {
        HTMLErrorDiv.style.display = "none";
    }
}

// Writes the path selected to the config file
function writePath() {
    if (HTMLChartFilePath.files[0] !== undefined) {
        config.pathToChartFile = HTMLChartFilePath.files[0].path;
        fs.writeFileSync(config.pathToBackupFolder + "/config.json", JSON.stringify(config, null, "\t"), "utf8", function (err) {
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
        fs.writeFileSync(config.pathToBackupFolder + "/config.json", JSON.stringify(config, null, "\t"), "utf8", function (err) {
            console.log(err);
        });
    }
    changeFields();
}

// Button to restore the last lyric input from the config file
function restoreFromConfig() {
    HTMLLyricInput.value = config.lyricsInput;
}

// For audio play testing purposes
function playMusic() {
    songStuffs.music(eventsPhraseArray, chartSync, lyricsInputArray);
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

// Button to read the .chart file for lyrics and output on screen
function getLyricsFromChartButton() {
    if (HTMLLyricInput.value == "") {
        HTMLLyricInput.value = "-";
    }

    changeFields();

    var temp = getLyricsFromChart();

    HTMLLyricInput.value = temp;

    changeFields();
}

// Show chart and lyric input info
function changeFields() {
    customErrorMessage(false);

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
        HTMLWriteButton.style.display = "block";
        HTMLChartName.innerHTML = chartName;
        HTMLPhraseCount.innerHTML = eventsPhraseArray.length + " phrases found";
        HTMLLyricEventCount.innerHTML = lyricEventCount + " lyric events found";
        HTMLSyllableCount.innerHTML = syllableCount + " syllables found";
        HTMLPhrasesAndLyrics.innerHTML = phrasesAmounts;

        console.log("it took: " + (Date.now() - startTime) + "ms to do all the things");
    } else if (HTMLChartInfoDiv.style.display != "none") {
        HTMLChartInfoDiv.style.display = "none";
        HTMLWriteButton.style.display = "none";
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
        indicies.push(idx);
        idx = fullChart.indexOf(element, idx + 1);
    }

    indicies.push(fullChart.length);

    //console.log(indicies);
    //console.log(indicies.length);

    if (indicies.length == 1) {
        customErrorMessage(true, "error", "Nothing useful could be found from the .chart file selected");
    } else {
        for (var i = 0; i < indicies.length - 1; i++) {
            var tempSelection = fullChart[indicies[i] - 1];

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
                    /*
                    if (indicies.length <= 3) {
                        console.log("At most 3 indicies found, nothing more here to do: " + indicies);
                        break;
                    } else {
                        console.log("More than 3 indicies, continue: " + indicies);

                        if (i == indicies.length - 1) {
                            var temp = fullChart.slice(indicies[i] - 1, fullChart.length - 1);
                            difficulties.push(temp);
                            console.log("found something: " + i + ", " + (i + 1));
                            break;
                        } else {
                            var temp = fullChart.slice(indicies[i] - 1, indicies[i + 1] - 1);
                            difficulties.push(temp);
                            console.log("found more difficulties: " + i + ", " + (i + 1));
                            break;
                        }

                        break;
                    }*/
                }
            }
        }
    }
}

// Reading the main song info and updating the HTML elements
// Return "songName by artistName"
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

// Reading events list and modifying a copy of it to only have lyric events in an array one phrase in one index (2D array)
// Return count of lyric events
function readAndModifyEvents() {
    var tempEventArray = eventsAll.slice();
    eventsPhraseArray = [];

    var tempPhraseStartTicks = [];
    var tempPhraseEndTicks = [];

    var tempPhraseStartsIndexes = [];
    var tempPhraseEndIndexes = [];

    //console.log(tempEventArray[tempEventArray.length - 1]);

    for (var i = tempEventArray.length - 1; i >= 0; i--) {
        if (!tempEventArray[i].includes(" = E \"phrase_start\"") && !tempEventArray[i].includes(" = E \"phrase_end\"") && !tempEventArray[i].includes(" = E \"lyric ")) {
            //console.log("removing: " + tempEventArray[i]);

            tempEventArray.splice(i, 1);
        } else if (tempEventArray[i].includes(" = E \"phrase_start\"")) {
            //console.log("copying to starts: " + tempEventArray[i]);

            tempPhraseStartTicks.push(tempEventArray[i].split("=")[0].trim());
        } else if (tempEventArray[i].includes(" = E \"phrase_end\"")) {
            //console.log("copying to ends: " + tempEventArray[i]);

            tempPhraseEndTicks.push(tempEventArray[i].split("=")[0].trim());
        }
    }

    tempPhraseStartTicks.reverse();
    tempPhraseEndTicks.reverse();

    var startCount = 0;

    for (var i = 0; i < tempEventArray.length - 1; i++) {
        if (tempPhraseStartTicks[startCount] == tempEventArray[i].split("=")[0].trim() && !tempEventArray[i].includes("phrase_start")) {
            //console.log("Same tick found between: " + tempEventArray[i] + " and " + tempEventArray[i + 1] + " on phrase: " + (startCount + 1));

            var temp = tempEventArray.splice(i + 1, 1);
            tempEventArray.splice(i, 0, temp.toString());

            startCount++;
        }
    }

    for (var i = 0; i < tempEventArray.length; i++) {
        if (tempEventArray[i].includes(" = E \"phrase_start\"")) {
            tempPhraseStartsIndexes.push(i);
        } else if (tempEventArray[i].includes(" = E \"phrase_end\"")) {
            tempPhraseEndIndexes.push(i);
        }
    }

    var endsUsed = 0;

    for (var i = 0; i < tempPhraseStartsIndexes.length; i++) {
        if (tempPhraseStartsIndexes[i + 1] > tempPhraseEndIndexes[endsUsed] || tempPhraseStartsIndexes[i + 1] == undefined) {
            //console.log("from start to end");

            eventsPhraseArray.push(tempEventArray.slice(tempPhraseStartsIndexes[i] + 1, tempPhraseEndIndexes[endsUsed]));
            endsUsed++;
        } else {
            //console.log("from start to start");
            eventsPhraseArray.push(tempEventArray.slice(tempPhraseStartsIndexes[i] + 1, tempPhraseStartsIndexes[i + 1]));
        }
    }

    //console.log(eventsPhraseArray);
/*
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

    console.log(tempPhraseStarts);
    console.log(tempPhraseEnds);

    var endEventsUsed = 0;

    for (var i = 0; i < tempPhraseStarts.length; i++) {

        console.log(tempEventArray[tempPhraseStarts[i] - 1]);
        console.log(tempEventArray[tempPhraseStarts[i]]);

        console.log();

        //console.log(tempEventArray[tempPhraseStarts[i] - 1].split("=")[0].trim());
        //console.log(tempEventArray[tempPhraseStarts[i + 1] - 1].split("=")[0].trim());


        if (tempPhraseStarts[i + 1] > tempPhraseEnds[endEventsUsed] || tempPhraseStarts[i + 1] == undefined) {
            console.log("inside the part to take ends out");


            //if (tempEventArray[tempPhraseStarts[i] - 1])

            endEventsUsed++;
        } else {
            console.log("inside part to take to the next start");


        }





        if (tempPhraseStarts[i + 1] > tempPhraseEnds[endEventsUsed] || tempPhraseStarts[i + 1] == undefined) {
            //console.log("inside the part to take ends out");
            eventsPhraseArray.push(tempEventArray.slice(tempPhraseStarts[i] + 1, tempPhraseEnds[endEventsUsed]));
            endEventsUsed++;
        } else {
            //console.log("inside part to take to the next start");
            eventsPhraseArray.push(tempEventArray.slice(tempPhraseStarts[i] + 1, tempPhraseStarts[i + 1]));
        }
    }

    //console.log(eventsPhraseArray);



    if (tempPhraseStarts.length != tempPhraseEnds.length) {
        if (tempPhraseStarts.length < tempPhraseEnds.length) {
            customErrorMessage(true, "error" ,"The phrase event counts are different causing the counts above not to be correct (phrase_starts missing)");
        } else if (tempPhraseStarts.length > tempPhraseEnds.length){
            customErrorMessage(true, "error" ,"The phrase event counts are different causing the counts above not to be correct (phrase_ends missing)");
        }
    } else if (tempPhraseStarts.length == tempPhraseEnds.length) {
        for (var i = 0; i < tempPhraseStarts.length; i++) {
            eventsPhraseArray.push(tempEventArray.slice(tempPhraseStarts[i] + 1, tempPhraseEnds[i]));
        }
    }*/

    var lyricCount = 0;

    for (var i = 0; i < eventsPhraseArray.length; i++) {
        lyricCount += eventsPhraseArray[i].length;
    }

    return lyricCount;
}

// Reading the lyric textarea and creating an array with each row being it's own phrase and splitting syllables after that (2D array)
// Return count of syllables
function readLyricInput() {
    lyricsInputFull = HTMLLyricInput.value.trim().split("\n");
    lyricsInputArray = [];

    for (var i = 0; i < lyricsInputFull.length; i++) {
        if (lyricsInputFull[i] != "") {
            var tempPhrase = lyricsInputFull[i].replace(/-/g, "- ").trim().split(" ");
            var tempArr = [];

            for (var j = 0; j < tempPhrase.length; j++) {
                if (tempPhrase[j] != "" && tempPhrase[j] != "-") {
                    tempArr.push(tempPhrase[j]);
                }
            }
            lyricsInputArray.push(tempArr)
        }
    }

    var syllableCount = 0;

    for (var i = 0; i < lyricsInputArray.length; i++) {
        syllableCount += lyricsInputArray[i].length;
    }

    return syllableCount;
}

// Test if the syllable array length and lyric event array lengths are the same
// Return a string of each phrase and it's event / syllable count
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

// Get the lyric events that are filled in from the .chart file
function getLyricsFromChart() {
    var lyricsPerPhrase = [];

    if (eventsPhraseArray.length == 0) {
        customErrorMessage(true, "notice", "No lyric events found form the chart");
    } else if (eventsPhraseArray.length != 0) {
        for (var i = 0; i < eventsPhraseArray.length; i++) {
            var tempString = "";

            for (var j = 0; j < eventsPhraseArray[i].length; j++) {
                var temp = eventsPhraseArray[i][j].split("lyric ")[1];

                temp = temp.substring(0, temp.length - 1);

                if (temp.endsWith("-")) {
                    tempString += temp;
                } else {
                    tempString += temp + " ";
                }
            }

            lyricsPerPhrase.push(tempString.trim());
        }
    }

    return lyricsPerPhrase.join("\n");
}

// Write new chart Button pressed
function testAndWriteChart() {
    var startTime = Date.now();

    var tests = testReadChartAndLrics();

    if (tests) {
        var backup = writeBackupOfOriginalChart();

        if (backup) {
            modifyEventsAndOriginalChart();

            overwriteOriginalFile();
        }
    }

    console.log("it took: " + (Date.now() - startTime) + "ms to do tests and write files");
}

// Complete tests between the syllable array and lyric event array
// Return either true if all good or false if problems occured
function testReadChartAndLrics() {
    if (eventsPhraseArray.length != lyricsInputArray.length) {
        customErrorMessage(true, "error" ,"Not the same amount of phrases");
        return false;
    } else if (eventsPhraseArray.length == lyricsInputArray.length) {
        customErrorMessage(false);
        var tempMessage = "";

        for (var i = 0; i < eventsPhraseArray.length; i++) {
            if (eventsPhraseArray[i].length != lyricsInputArray[i].length) {
                tempMessage += "(phrase: " + (i + 1) + ", lyric events: " + eventsPhraseArray[i].length + ", syllables: " + lyricsInputArray[i].length + ")";
            }
        }

        if (tempMessage != "") {
            customErrorMessage(true, "error" ,tempMessage);
            return false;
        } else if (tempMessage == "") {
            customErrorMessage(false);
            return true;
        }
    }
}

// Write a backup file of the selected .chart file in a folder/file
function writeBackupOfOriginalChart() {
    var chartName, artistName;
    for (var i = 0; i < chartInfo.length; i++) {
        if (chartInfo[i].includes("Name =")) {
            tempSongName = chartInfo[i].split("\"")[1];
        }
        if (chartInfo[i].includes("Artist =")) {
            tempArtistName = chartInfo[i].split("\"")[1];
        }
    }

    var backupFileName = tempSongName.replace(/ /g, "") + "_" + tempArtistName.replace(/ /g, "") + "_backup.chart";

    fs.writeFileSync(config.pathToBackupFolder + "/" + backupFileName, fullChart.join("\r\n"), "utf8", function (err) {
        if (err) {
            console.log("Problems with writing the chart backup: " + err);
            customErrorMessage(true, "error" ,"Problems writing the backup of the original chart, stopping the process (check console)");
            return false;
        }
    });
    console.log("Backup file written");
    customErrorMessage(false);
    return true;
}

// Modify the events and update the variable with all chart info in it
function modifyEventsAndOriginalChart() {
    modifiedOutputFile = fullChart.slice();
    modifiedLyricEventArray = [];

    for (var i = 0; i < eventsPhraseArray.length; i++) {
        for (var j = 0; j < eventsPhraseArray[i].length; j++) {
            //console.log(eventsPhraseArray[i][j].substring(0, (eventsPhraseArray[i][j].indexOf("E \"lyric") + 9)) + lyricsInputArray[i][j].toString() + "\"");
            modifiedLyricEventArray.push(eventsPhraseArray[i][j].substring(0, (eventsPhraseArray[i][j].indexOf("E \"lyric") + 9)) + lyricsInputArray[i][j].toString() + "\"");
        }
    }

    var found = 0;
    var extra = 0;

    for (var i = 0; i < eventsAll.length; i++) {
        if (modifiedLyricEventArray.length > 0) {
            if (eventsAll[i].includes(modifiedLyricEventArray[0].substring(0, (modifiedLyricEventArray[0].indexOf("E \"lyric") + 9)))) {
                found++;
                eventsAll[i] = modifiedLyricEventArray.shift();
            } else {
                extra++;
            }
        }
    }

    modifiedOutputFile.splice(modifiedOutputFile.indexOf(eventsAll[0]), eventsAll.length, eventsAll.join("\r\n"));
}

// Overwrite the original file with the modified one with lyrics in it
function overwriteOriginalFile() {
    try {
        fs.writeFileSync(config.pathToChartFile, modifiedOutputFile.join("\r\n"), "utf8");
        console.log("Overwrite done without problems!");
        HTMLChartInfoDiv.style.display = "none";
        customErrorMessage(true, "completed", "The original chart has been modified, playtest to make sure everything works!");
    } catch (err) {
        console.log("Problems writing the chart file: " + err);
        customErrorMessage(true, "error", "Problems occured while writing the chart file, check the console for more info.");
    }
}
