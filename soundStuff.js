// Requires
const fs = require("fs");
var config = JSON.parse(fs.readFileSync("../lyricAdder_backups/config.json", "utf8"));

// HTML Element building
var HTMLMusicElem = document.getElementById("testMusic");
console.log(config.pathToChartFile.replace("notes.chart", "song.ogg"));
HTMLMusicElem.src = config.pathToChartFile.replace("notes.chart", "song.ogg");

var HTMLtime1 = document.getElementById("timings1");
var HTMLtime2 = document.getElementById("timings2");

var HTMLMainLyricDiv = document.getElementById("mainLyrics");

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

// Main method doing all the thigs needed
function music(eventsPhraseArray, chartSync, lyricsInputArray) {
    if (playing) {
        HTMLMusicElem.pause();
        playing = false;
    } else if (!playing) {

        combineArrays(eventsPhraseArray, chartSync);
        createLyricPreview(eventsPhraseArray);

        HTMLMusicElem.play();
        updateLyricPreview();

        updateTime();

        playing = true;
    }

    HTMLMusicElem.onended = function () {
        playing = false;
    };
    console.log(HTMLMusicElem.duration);
    console.log(HTMLMusicElem.currentTime);
}

// Testing methods on how to update things
function updateTime() {
    var intervalID = setInterval(update, 1);
}

function update() {
    HTMLtime1.innerHTML = HTMLMusicElem.currentTime;
}

// Update lyric preview
function updateLyricPreview() {
    phrases = HTMLMainLyricDiv.children;
    console.log(phrases[0]);
    console.log(HTMLMainLyricDiv.childElementCount);

    timing = Math.round(lyricTimes2DArray[0][0] * 1000);

    phraseTiming();
}

function phraseTiming() {
    var randomId = setTimeout(function () {
        if (indexer <= lyricTimes2DArray.length) {
            if (playing) {
                timing = Math.round(lyricTimes2DArray[indexer + 1][0] * 1000 );
                console.log(indexer);
                console.log(timing);
                console.log(lyricTimes2DArray[indexer + 1][0] * 1000);
                if (indexer > 0) {
                    phrases[indexer - 1].style.display = "none";
                }

                phrases[indexer].style.display = "block";
                phrases[indexer].style.color = "red";
                phrases[indexer].style.fontSize = "x-large";

                syllables = [];
                syllables = phrases[indexer].children;

                console.log(syllables);

                //syllableTiming(syllables.length, 0, 0);

                if (indexer < HTMLMainLyricDiv.childElementCount - 2) {
                    phrases[indexer + 1].style.display = "block";
                }
                if (indexer < HTMLMainLyricDiv.childElementCount - 3) {
                    phrases[indexer + 2].style.display = "block";
                }

                indexer++;
                phraseTiming();
            }
        }
    }, timing);
}


function syllableTiming(index, counter, time) {

    var indexNum = index;
    var syllableTime = time;
    var syllableCount = counter;

    console.log("(indexer: " + indexer + ", syllable count: " + syllableCount + ") index: " + index + ", counter: " + counter + ", timing: " + syllableTime + ", syllable: " + syllables[syllableCount].innerHTML);

    if (syllableCount < indexNum) {
        var randomId = setTimeout( function () {
            if (playing) {
                syllables[syllableCount].style.color = "blue";

                //if (syllableCount != 0) {
                    syllableTime = Math.round(lyricTimes2DArray[indexer][syllableCount] * 1000);
                //}
                syllableCount++;
                syllableTiming(indexNum, syllableCount, syllableTime);
            }
        }, syllableTime);
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

    console.log(tempSyncArray.length);
    console.log(tempLyricsArray.length);

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

    console.log(combinedArray);

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

            console.log("BPM event: " + combinedArray[i] + ", time: " + currentBPMTime);

        } else if (combinedArray[i].includes(" = E ")) { // lyric event found

            var lyricEvent = combinedArray[i];

            var lyricTick = combinedArray[i].split(" = E ")[0].trim();

            var timeSeconds = currentBPMTime + ((lyricTick - currentBPMTick) / currentTPS);

            tempLyricTimes.push({
                time: timeSeconds,
                lyricEv: lyricEvent
            });

            console.log("Lyric event: " + combinedArray[i] + ", time: " + timeSeconds);
        }
    }

    var tempBefore = 0;
    var tempFirstEventInPhrase = 0;

    for (var i = 0; i < eventsPhraseArray.length; i++) {
        var tempArr = [];

        for (var j = 0; j < eventsPhraseArray[i].length; j++) {

            var current = tempLyricTimes.splice(0, 1);
            var difference;

            if (j == 0) {
                difference = current[0].time - tempFirstEventInPhrase;
                tempFirstEventInPhrase = current[0].time;
                tempBefore = current[0].time;
            } else {
                difference = current[0].time - tempBefore;
                tempBefore = current[0].time;
            }

            tempArr[j] = difference;
            //tempArr[j] = tempLyrcTimes.splice(0, 1);
        }

        lyricTimes2DArray.push(tempArr);
    }

    console.log(lyricTimes2DArray);
}

// Export main module from here
module.exports = {music}


/*
lyricTimes2DArray = [];

var tempLyrcTimes = [];

var oldBPMTick = 0;

var currentBPM;
var currentBPMTick;
var currentBPMTime = 0;
var currentTPS;

for (var i = 0; i < combinedArray.length; i++) {
    //console.log(combinedArray[i]);
    if (combinedArray[i].includes(" = B ")) {
        // TPS calc = ((192 / BPM) / 60)

        currentBPM = combinedArray[i].slice();
        currentBPMTick = currentBPM.split(" = B ")[0].trim()

        currentTPS = ((192 * (currentBPM.split(" = B ")[1].trim() / Math.pow(10, 3))) / 60);

        if (oldBPMTick != undefined) {
            currentBPMTime = currentBPMTime + (currentBPMTick - oldBPMTick) / currentTPS;
        }

        oldBPMTick = currentBPMTick;

        console.log("BPM Marker: " + currentBPM + ", current TPS: " + currentTPS + ", current time: " + currentBPMTime + ", current tick: " + currentBPMTick + ", old tick: " + oldBPMTick);
    } else if (combinedArray[i].includes(" = E ")) {
        var timeSec;

        var tempLyricSplit = combinedArray[i].slice().split(" = E \"lyric ");

        var lyricTick = tempLyricSplit[0].trim();
        var syllable = tempLyricSplit[1].trim();

        timeSec = currentBPMTime + (lyricTick - currentBPMTick) / currentTPS;

        console.log("Adding to array: " + timeSec + ", " + syllable);

        tempLyrcTimes.push({
            time: timeSec,
            show: combinedArray[i].toString()
        });
    }
}

var tempBefore = 0;
var tempFirstEventInPhrase = 0;

for (var i = 0; i < eventsPhraseArray.length; i++) {
    var tempArr = [];

    for (var j = 0; j < eventsPhraseArray[i].length; j++) {

        var current = tempLyrcTimes.splice(0, 1);
        var difference;

        if (j == 0) {
            difference = current[0].time - tempFirstEventInPhrase;
            tempFirstEventInPhrase = current[0].time;
            tempBefore = current[0].time;
        } else {
            difference = current[0].time - tempBefore;
            tempBefore = current[0].time;
        }

        tempArr[j] = difference;
        //tempArr[j] = tempLyrcTimes.splice(0, 1);
    }

    lyricTimes2DArray.push(tempArr);
}

console.log(lyricTimes2DArray);
*/
