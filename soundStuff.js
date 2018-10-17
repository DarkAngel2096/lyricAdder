// Requires

//const play = require('audio-play');
//const load = require('audio-loader');
const fs = require("fs");

var HTMLMusicElem = document.getElementById("testMusic");
var HTMLtime1 = document.getElementById("timings1");
var HTMLtime2 = document.getElementById("timings2");

var HTMLMainLyricDiv = document.getElementById("mainLyrics");

var playing = false;

var combinedArray;
var lyricTimes;

function music(eventsPhraseArray, chartSync, lyricsInputArray) {

    //console.log(eventsPhraseArray);
    //console.log(chartSync);
    //console.log(lyricsInputArray);

    //var tickChanges = changeTicks(eventsPhraseArray, chartSync);



    if (playing) {
        HTMLMusicElem.pause();
        playing = false;
    } else if (!playing) {

        combineArrays(eventsPhraseArray, chartSync);

        HTMLMusicElem.play();
        createAndUpdateLyricPreview(eventsPhraseArray);

        updateTime();

        playing = true;
    }

    console.log(HTMLMusicElem.duration);
    console.log(HTMLMusicElem.currentTime);

}

function updateTime() {
    var intervalID = setInterval(update, 1);
}

function update() {
    HTMLtime1.innerHTML = HTMLMusicElem.currentTime;
}

function createAndUpdateLyricPreview(eventsPhraseArray) {
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
    console.log(tempSyncArray.length);
    console.log(tempLyricsArray.length);

    console.log(combinedArray);

    lyricTimes = [];

    var oldBPMTick;

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

            //console.log("BPM Marker: " + currentBPM + ", current TPS: " + currentTPS + ", current time: " + currentBPMTime);
        } else if (combinedArray[i].includes(" = E ")) {
            var timeSec;

            var tempLyricSplit = combinedArray[i].slice().split(" = E \"lyric ");

            var lyricTick = tempLyricSplit[0].trim();
            var syllable = tempLyricSplit[1].trim();

            timeSec = currentBPMTime + (lyricTick - currentBPMTick) / currentTPS;

            //console.log("Adding to array: " + timeSec + ", " + syllable);

            lyricTimes.push({
                time: timeSec,
                show: combinedArray[i].toString()
            });
        }
    }

    console.log(lyricTimes);
}

module.exports = {music}
