// Normal require stuffs
const fs = require("fs");

// File requires to other .js files
var songStuffs = require("./soundStuff.js");
var difficultyReducer = require("./difficultyReducer.js");

var chartReader = require("./mainJS/chartReads.js");

// Make $ available to the Electron context
const $ = require("jquery");

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
var HTMLPhraseDiv = document.getElementById("phraseDiv");

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

var newFullReducedDifficulties;

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
    setTimeout(function () {
        songStuffs.setSongFile();
    }, 0);
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
$("#lyricsInputArea").on("input propertychange", writeLyrics);

// Button to restore the last lyric input from the config file
function restoreFromConfig() {
    HTMLLyricInput.value = config.lyricsInput;
}

// For audio play testing purposes
function playMusic() {
    songStuffs.music(eventsPhraseArray, chartSync, lyricsInputArray);
}

function resetSong() {
    songStuffs.resetToStart();
}

// Difficulty Reducer stuff
//Difficulties get automatically sent over, these are just for buttons and the checkbox area
function findInstrumentsInUse() {
    difficultyReducer.findInstruments();
}


// Button to show the {phrase, event count, syllable count} HTML element
function showPhrasesAndLyrics() {
    if (toggleForLyricsAndSyllables) {
        HTMLPhraseDiv.style.display = "none";
        toggleForLyricsAndSyllables = false;
    } else if (!toggleForLyricsAndSyllables) {
        HTMLPhraseDiv.style.display = "block";
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

        testLyricEventsAndSyllables();

        difficultyReducer.giveDifficulties(difficulties);

        HTMLChartInfoDiv.style.display = "block";
        HTMLWriteButton.style.display = "block";
        HTMLChartName.innerHTML = chartName;
        HTMLPhraseCount.innerHTML = eventsPhraseArray.length + " phrases found";
        HTMLLyricEventCount.innerHTML = lyricEventCount + " lyric events found";
        HTMLSyllableCount.innerHTML = syllableCount + " syllables found";

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
                    var tempString = fullChart[indicies[i] - 1];
                    //console.log(tempString);

                    if (tempString.startsWith("[Expert") || tempString.startsWith("[Hard") || tempString.startsWith("[Medium") || tempString.startsWith("[Easy")) {
                        //console.log("Playable difficulty found: " + tempString + ", add to the end of the difficulty var.");
                        if (indicies[i + 1] == fullChart.length) {
                            difficulties.push(fullChart.slice(indicies[i] - 1, indicies[i + 1]));
                        } else {
                            difficulties.push(fullChart.slice(indicies[i] - 1, indicies[i + 1] - 1));
                        }
                    } else {
                        console.log("Something odd found: " + tempString);
                    }
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

    for (var i = 0; i < tempEventArray.length; i++) {

        var tempStartTick = Number(tempPhraseStartTicks[startCount]);
        var tempEventTick = Number(tempEventArray[i].split("=")[0].trim());

        //console.log("temp tick: iterator: " + startCount+ ", " + tempStartTick + ", temp array: iterator: " + i + ", " + tempEventTick);

        if (tempStartTick == tempEventTick && !tempEventArray[i].includes("phrase_start") && tempEventArray[i + 1].includes("phrase_start")) {
            //console.log("Same tick found between: " + tempEventArray[i] + " and " + tempEventArray[i + 1] + " on phrase: " + (startCount + 1));

            var temp = tempEventArray.splice(i + 1, 1);
            tempEventArray.splice(i, 0, temp.toString());

            startCount++;
        } else if (tempStartTick < tempEventTick && !tempEventArray[i].includes("phrase_start") && !tempEventArray[i].includes("phrase_end")) {
            //console.log(tempStartTick + ", " + tempEventTick);
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
            var tempArr = [];
            var tempPhrase = lyricsInputFull[i].replace(/-/g, "- ").replace(/=/g, "= ").trim().split(" ");

            for (var j = 0; j < tempPhrase.length; j++) {
                if (tempPhrase[j] != "" && tempPhrase[j] != "-" && tempPhrase[j] != "=") {
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
    while (HTMLPhraseDiv.firstChild) {
        HTMLPhraseDiv.removeChild(HTMLPhraseDiv.firstChild);
    }

    var morePhrases = 0;

    if (lyricsInputArray.length <= eventsPhraseArray.length) {
        morePhrases = eventsPhraseArray.length;
    } else {
        morePhrases = lyricsInputArray.length;
    }

    const lines = new Array(morePhrases).fill(0).map((_, i) => ({
        index: i+1,
        nbWordsChart: (eventsPhraseArray[i] || []).length,
        nbWordsLyrics: (lyricsInputArray[i] || []).length
    }));
    global.updateLinedTextArea({
        selectedLines: lines
            .filter(({
                nbWordsLyrics, nbWordsChart
            }) => nbWordsLyrics != nbWordsChart)
            .map(({ index }) => index)
    });

    for (var i = 0; i < morePhrases; i++) {
        var newSpan = document.createElement("span");

        if (i >= lyricsInputArray.length) {
            newSpan.innerHTML += "{" + (i + 1) + ", " + eventsPhraseArray[i].length + "-0}";
            newSpan.style.color = "red";
        } else if (i >= eventsPhraseArray.length) {
            newSpan.innerHTML += "{" + (i + 1) + ", 0-" + lyricsInputArray.length + "}";
            newSpan.style.color = "red";
        } else {
            newSpan.innerHTML += "{" + (i + 1) + ", " + eventsPhraseArray[i].length + "-" + lyricsInputArray[i].length + "}";

            if (eventsPhraseArray[i].length == lyricsInputArray[i].length) {
                newSpan.style.color = "green";
            } else {
                newSpan.style.color = "red";
            }
        }

        if (i % 10 == 9 && i != 0) {
            newSpan.innerHTML += "<br/>"
        } else {
            newSpan.innerHTML += ", "
        }

        HTMLPhraseDiv.appendChild(newSpan);
    }
}

// Get the lyric events that are filled in from the .chart file
function getLyricsFromChart() {
    var lyricsPerPhrase = [];

    //console.log(eventsPhraseArray);

    if (eventsPhraseArray.length == 0) {
        customErrorMessage(true, "notice", "No lyric events found form the chart");
    } else if (eventsPhraseArray.length != 0) {
        for (var i = 0; i < eventsPhraseArray.length; i++) {
            var tempString = "";

            for (var j = 0; j < eventsPhraseArray[i].length; j++) {
                var temp = eventsPhraseArray[i][j].split("lyric ")[1];

                temp = temp.substring(0, temp.length - 1);

                if (temp.endsWith("-") ||temp.endsWith("=")) {
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
            customErrorMessage(true, "error" ,"Problems writing the backup of the original chart, stopping the process (check console) and let DarkAngel2096 know!");
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



// temporary function for data gathering
function gatherChartData() {
    var folderPathInput = document.getElementById("folderSelect").files[0].path;

    var gatherer = require("./dataGather.js");

    gatherer.mainGather(folderPathInput, config.pathToBackupFolder);


}

// Temporary function for data sifting
function dataSifter() {
    var sifter = require("./dataSift.js");

    sifter.methodCalls();
}



// function to test chartReads.js
function fileReader() {
    //console.log(document.getElementById("chartReaderInput"));

    let path = document.getElementById("chartReaderInput").files[0].path;

    try {
        chartReader.readChart(path);

        console.log("Song info:");
        console.log(chartReader.getSongInfo());

        console.log("Sync Info:");
        console.log(chartReader.getSyncInfo());

        console.log("Event Info:");
        console.log(chartReader.getEventInfo());

        console.log("Diffs info:");
        console.log(chartReader.getDiffsInfo());
    } catch (err) {
        console.log(err.stack);
    }
}



/*

//Other random stuff

var HTMLVideoLink = document.getElementById("linkArea");
var HTMLVideoElem = document.getElementById("testVideos");

//testing stuffs
function testPlayVideo(value) {
    var linkID = value.substring(value.lastIndexOf("watch?") + 8, value.length);

    console.log(value);
    console.log(linkID);

    HTMLVideoElem.src = "https://www.youtube.com/embed/" + linkID + "?rel=0";

    console.log(HTMLVideoElem.src);
}


//School Stuff!!!!
var schoolHTMLFirstNum = document.getElementById("num1");
var schoolHTMLSecondNum = document.getElementById("num2");

var schoolHTMLSpan = document.getElementById("schoolTextOutput");

function doSchoolMath() {
    var firstNum = Number(schoolHTMLFirstNum.value);
    var secondNum = Number(schoolHTMLSecondNum.value);

    if (firstNum == undefined && firstNum.typeOf != Number) {
        console.log("first number is undefined or isn't number: " + firstNum);
    } else if (secondNum == undefined && secondNum.typeOf != Number) {
        console.log("second number is underfined or isn't number: " + secondNum);
    } else {
        var text = "";

        text += "numbers used: " + firstNum + " " + secondNum + "<br>";

        text += "Sum is: " + (firstNum + secondNum) + "<br>";

        var difference = 0;
        if (firstNum <= secondNum) {
            difference = secondNum - firstNum;
        } else {
            difference = firstNum - secondNum;
        }
        text += "Difference is: " + difference + "<br>";

        text += "Multiplication: " + (firstNum * secondNum) + "<br>";

        text += "Division: " + (firstNum / secondNum) + "<br>";

        for (var i = secondNum; i <= firstNum; i++) {
            text += i + " ";
        }

        schoolHTMLSpan.innerHTML = text;
    }
}
*/
