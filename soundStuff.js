// Requires
const fs = require("fs");
var config = JSON.parse(fs.readFileSync("../lyricAdder_backups/config.json", "utf8"));

// HTML Element building
var HTMLMusicElem = document.getElementById("testMusic");

var HTMLtime1 = document.getElementById("timings1");

var HTMLMainLyricDiv = document.getElementById("mainLyrics");
var HTMLPhraseDropDown = document.getElementById("phraseDropDown");

// Global variables used
var playing = false;

// For combining arrays and getting conversion from ticks to seconds
var combinedArray;
var lyricTimes2DArray;

// Display stuff
var indexer = 0;
var timing = 0;

var phrases;
var syllables;

// new display variables
var phraseNum;
var syllableNum;

var phraseId;
var syllableId;

// Main method doing all the thigs needed
function music(eventsPhraseArray, chartSync, lyricsInputArray) {
    makeDropDown(eventsPhraseArray);

    if (playing) {
        HTMLMusicElem.pause();
        playing = false;
    } else if (!playing) {

        combineArrays(eventsPhraseArray, chartSync);
        createLyricPreview(eventsPhraseArray);

        HTMLMusicElem.play();

        playing = true;
        updateLyricPreview();

        updateTime();
    }

    HTMLMusicElem.onended = function () {
        playing = false;
    };
    //console.log(HTMLMusicElem.duration);
    //console.log(HTMLMusicElem.currentTime);
}

// reset to start
function resetToStart() {
    HTMLMusicElem.currentTime = 0;
    phraseNum = 0;
    syllableNum = 0;
}

// function to get the path to the song file
function setSongFile() {
    playing = false;
    HTMLMusicElem.pause();

    HTMLMusicElem.currentTime = 0;
    phraseNum = 0;
    syllableNum = 0;

    clearInterval(phraseId);
    clearInterval(syllableId);


    config = JSON.parse(fs.readFileSync("../lyricAdder_backups/config.json", "utf8"));

    var tempPath = config.pathToChartFile;
    var filePath = tempPath.slice(0, tempPath.lastIndexOf("\\"));

    //console.log(tempPath);
    //console.log(filePath);

    /*fs.readdir(filePath, function(err, items) {
        if (err) {
            console.log("problems: " + err);
            return;
        }
    });*/

    var items = fs.readdirSync(filePath);
    //console.log(items);

    for (var i = 0; i < items.length; i++) {
        //console.log(items[i]);

        if (items[i] == "song.ogg") {
            HTMLMusicElem.src = filePath + "\\song.ogg";
            HTMLMusicElem.load();
        } else if (items[i].endsWith(".ogg") || items[i].endsWith(".mp3")) {
            HTMLMusicElem.src = filePath + "\\" + items[i];
            HTMLMusicElem.load();
        }
    }
    //console.log(HTMLMusicElem.src);
}

// Testing methods on how to update things
function updateTime() {
    var intervalID = setInterval(update, 1);
}

function update() {
    HTMLtime1.innerHTML = HTMLMusicElem.currentTime;
}

// methods for seeking through the song
function makeDropDown(eventsPhraseArray) {
    var tempArr = eventsPhraseArray.slice();

    for (var i = 0; i < tempArr.length; i++) {
        var tempPhrase = document.createElement("option");
        tempPhrase.text += (i + 1) + ":\xA0"

        for (var j = 0; j < tempArr[i].length; j++) {
            var syllable = tempArr[i][j].split(" = E \"lyric")[1].trim().slice(0, -1);

            if (syllable.endsWith("-")) {
                syllable = syllable.replace("-" , "");
            } else if (syllable.endsWith("=")) {
                syllable = syllable.replace("=", "-")
            } else if (j != tempArr[i].length - 1){
                syllable += "\xA0";
            }

            tempPhrase.text += syllable;
        }

        if (HTMLPhraseDropDown.options[i] != undefined) {
            if (HTMLPhraseDropDown.options[i].text == tempPhrase.text) { // if the text in both are the same do nothing
                //console.log("equals, do nothing");
            } else { // if the texts are not the same, update:
                HTMLPhraseDropDown.options[i].text = tempPhrase.text;
            }
        } else if (HTMLPhraseDropDown.options[i] == undefined) { //if the option in this index is undefined add a new one
            HTMLPhraseDropDown.add(tempPhrase)
        }
    }
}

//Dropdown onchange
HTMLPhraseDropDown.addEventListener("change", myTempFunction);

function myTempFunction() {
    var dropdownSelect = HTMLPhraseDropDown.selectedIndex;
    //console.log(dropdownSelect);

    if (!playing) {
        phraseNum = dropdownSelect;
        syllableNum = 0;

        if ((lyricTimes2DArray[phraseNum][0] - 1) >= 0) {
            HTMLMusicElem.currentTime = lyricTimes2DArray[phraseNum][0] -  1;
        } else {
            HTMLMusicElem.currentTime = 0;
        }

        //console.log("changing phrase to: " + phraseNum + ", and time to: " + HTMLMusicElem.currentTime);
    }
}

// Update lyric preview
function updateLyricPreview() {
    phrases = HTMLMainLyricDiv.children;
    //console.log(phrases[0]);
    //console.log(HTMLMainLyricDiv.childElementCount);

    if (phraseNum == undefined) {
        phraseNum = 0;
    }

    phraseId = setInterval(updatePreview, 1);
}

function updatePreview() {
    if (playing) {
        if (phraseNum === phrases.length) {
            clearInterval(phraseId);
            //console.log("cleared phrase intervall");
            return;
        }

        var elemTime = HTMLMusicElem.currentTime.toFixed(2);
        var lyricTime = lyricTimes2DArray[phraseNum][0].toFixed(2);

        if (elemTime === lyricTime) {
            if (phraseNum > 1) {
                phrases[phraseNum - 2].style.display = "none";
            }

            if (phraseNum > 0) {
                phrases[phraseNum - 1].style.fontSize = "medium";
            }

            phrases[phraseNum].style.display = "block";
            phrases[phraseNum].style.color = "red";
            phrases[phraseNum].style.fontSize = "x-large";
            phrases[phraseNum].children[0].style.color = "blue";

            if (phraseNum < HTMLMainLyricDiv.childElementCount - 1) {
                phrases[phraseNum + 1].style.display = "block";
            }
            if (phraseNum < HTMLMainLyricDiv.childElementCount - 2) {
                phrases[phraseNum + 2].style.display = "block";
            }
            if (phraseNum < HTMLMainLyricDiv.childElementCount - 3) {
                phrases[phraseNum + 3].style.display = "block";
            }
            syllables = [];
            syllables = phrases[phraseNum].children;

            syllableNum = 1;

            //console.log(syllables);

            syllableId = setInterval(updateSyllables, 1);

            //console.log("Phrase Start: " + phraseNum + ". Current time: "+ elemTime + ", time at phrase start; " + lyricTime);
            phraseNum++;
        }
    }
}

function updateSyllables() {
    if (playing) {
        if (syllableNum === syllables.length) {
            clearInterval(syllableId);
            //console.log("cleared syllable interval");
            return;
        }

        var elemTime = HTMLMusicElem.currentTime.toFixed(2);
        var syllableTime = lyricTimes2DArray[phraseNum - 1][syllableNum].toFixed(2);

        if (elemTime === syllableTime) {
            syllables[syllableNum].style.color = "blue";

            //console.log("Syllable: " + syllableNum + ". currentTime: " + elemTime + ", time at syllable: " + syllableTime);
            syllableNum++;
        }
    }
}

// Create all HTML elements for the song
function createLyricPreview(eventsPhraseArray) {
    var tempEventArray = eventsPhraseArray.slice();

    while (HTMLMainLyricDiv.firstChild) {
        HTMLMainLyricDiv.removeChild(HTMLMainLyricDiv.firstChild);
    }

    for (var i = 0; i < tempEventArray.length; i++) {

        window["lyricDiv" + i] = document.createElement("div");
        window["lyricDiv" + i].style.display = "none";

        for (var j = 0; j < tempEventArray[i].length; j++) {
            window["spanElem" + j] = document.createElement("span");

            var syllable = tempEventArray[i][j].split(" \"lyric ")[1].slice(0, -1);

            if (syllable.endsWith("-")) {
                syllable = syllable.slice(0, -1);
            } else if (syllable.endsWith("=")) {
                syllable = syllable.replace("=", "-");
            } else {
                syllable += " ";
            }

            var syllableIn = document.createTextNode(syllable);

            window["spanElem" + j].appendChild(syllableIn);

            window["lyricDiv" + i].appendChild(window["spanElem" + j]);
        }

        HTMLMainLyricDiv.appendChild(window["lyricDiv" + i]);
    }
}

// Combine the arrays and output a global 2D array with all times when things should be shown
function combineArrays(eventsPhraseArray, chartSync) {
    combinedArray = [];

    var tempSyncArray = chartSync.slice();
    var tempLyricsArray = [];

    for (var i = 0; i < eventsPhraseArray.length; i++) {
        for (var j = 0; j < eventsPhraseArray[i].length; j++) {
            tempLyricsArray.push(eventsPhraseArray[i][j].slice());
        }
    }

    for (var i = tempSyncArray.length - 1; i >= 0; i--) {
        if (!tempSyncArray[i].includes(" = B ")) {
            tempSyncArray.splice(i, 1);
        }
    }

    //console.log(tempSyncArray.length);
    //console.log(tempLyricsArray.length);

    while (tempSyncArray.length != 0 && tempLyricsArray.length != 0) {
        var tempLyrics = Number(tempLyricsArray[0].split(" = E \"lyric ")[0].trim());
        var tempSync = Number(tempSyncArray[0].split(" = B ")[0].trim());

        if (tempSync <= tempLyrics) {
            //console.log(tempSyncArray[0] + " is earlier than or equal to " + tempLyricsArray[0]);
            combinedArray.push(tempSyncArray.splice(0, 1).toString());
        } else if (tempLyrics < tempSync) {
            //console.log(tempLyricsArray[0] + " is earlier than " + tempSyncArray[0]);
            combinedArray.push(tempLyricsArray.splice(0, 1).toString());
        }
    }

    if (tempSyncArray.length != 0) {
        while (tempSyncArray.length != 0) {
            combinedArray.push(tempSyncArray.splice(0, 1).toString());
        }
    }

    if (tempLyricsArray.length != 0) {
        while (tempLyricsArray.length != 0) {
            combinedArray.push(tempLyricsArray.splice(0, 1).toString());
        }
    }

    //console.log(combinedArray);

    lyricTimes2DArray = [];

    var tempLyricTimes = [];

    var oldBPMTick;
    var oldBPM;
    var oldTPS;

    var currentBPM;
    var currentBPMTick;
    var currentBPMTime = 0;
    var currentTPS;

    for (var i = 0; i < combinedArray.length; i++) {
        if (combinedArray[i].includes(" = B ")) { // BPM marker found, calculation done: ((192 * BPM) / 60)
            var BPMMarker = combinedArray[i].split(" = B ");

            currentBPM = BPMMarker[1].trim() / Math.pow(10, 3);
            currentBPMTick = BPMMarker[0].trim();
            currentTPS = ((192 * currentBPM) / 60);

            if (oldBPMTick != undefined && oldBPM != undefined && oldTPS != undefined) {
                currentBPMTime = currentBPMTime + ((currentBPMTick - oldBPMTick) / oldTPS);
            }

            oldBPM = currentBPM;
            oldBPMTick = currentBPMTick;
            oldTPS = currentTPS;

    //        console.log("BPM event: " + combinedArray[i] + ", time: " + currentBPMTime);

        } else if (combinedArray[i].includes(" = E ")) { // lyric event found

            var lyricEvent = combinedArray[i];

            var lyricTick = combinedArray[i].split(" = E ")[0].trim();

            var timeSeconds = currentBPMTime + ((lyricTick - currentBPMTick) / currentTPS);

            tempLyricTimes.push({
                time: timeSeconds,
                lyricEv: lyricEvent
            });

    //        console.log("Lyric event: " + combinedArray[i] + ", time: " + timeSeconds);
        }

        oldBPMTick = currentBPMTick;
    }
/*
    for (var i = 0; i < tempLyricTimes.length; i++) {
        console.log(tempLyricTimes[i].time);
    }
*/
    var tempBefore = 0;
    var tempFirstEventInPhrase = 0;

    for (var i = 0; i < eventsPhraseArray.length; i++) {
        var tempArr = [];

        for (var j = 0; j < eventsPhraseArray[i].length; j++) {

            var current = tempLyricTimes.splice(0, 1);
/*            var difference;

            if (j == 0) {
                difference = current[0].time - tempFirstEventInPhrase;
                tempFirstEventInPhrase = current[0].time;
                tempBefore = current[0].time;
            } else {
                difference = current[0].time - tempBefore;
                tempBefore = current[0].time;
            }

            tempArr[j] = difference;*/

            tempArr[j] = current[0].time;
        }

        lyricTimes2DArray.push(tempArr);
    }

//    console.log(lyricTimes2DArray);
}

// Export main module from here
module.exports = {music, setSongFile, resetToStart}
