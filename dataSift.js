//normal requires
const fs = require("fs");

// global variable creation
var pathToInput = "../lyricAdder_backups/allChartInfo.json";

var inputSongsArray;

var songArray;
var dataArray;


// method calls
function methodCalls() {
    var startTime = Date.now();

    readInputFile();

    gatherData();

    understandData();

    console.log("Data sifting done in: " + (Date.now() - startTime) + "ms.");
}

// read Inputi
function readInputFile() {
    inputSongsArray = [];

    var fullInput = fs.readFileSync(pathToInput, "utf8");

    var indicies = [];
    var element = "[Song]"
    var idx = fullInput.indexOf(element);

    while (idx != -1) {
        indicies.push(idx);
        idx = fullInput.indexOf(element, idx + 1);
    }

    indicies.push(fullInput.length - 1);

    //console.log(indicies);

    for (var i = 0; i < indicies.length - 1; i++) {
        inputSongsArray.push(fullInput.slice(indicies[i], indicies[i + 1] - 1));
    }


}

// get data split up
function gatherData() {

    console.log("Songs found: " + inputSongsArray.length);
    songArray = [];

    for (var i = 0; i < inputSongsArray.length; i++) {
        var tempSongData = inputSongsArray[i].slice().trim().split("\r\n");
        var tempSongArray = [];

        var indicies = [];
        var element = "{";
        var idx = tempSongData.indexOf(element);

        while (idx != -1) {
            indicies.push(idx);
            idx = tempSongData.indexOf(element, idx + 1);
        }
        indicies.push(tempSongData.length);

        //console.log("Song number: " + i + " found indicies at: " + indicies);

        var single = [];
        var singleBass = [];
        var doubleGuitar = [];
        var doubleBass = [];
        var doubleRythm = [];
        var drums = [];
        var keyboards = [];
        var gHLGuitar = [];
        var gHLBass = [];

        for (var j = 0; j < indicies.length - 1; j++) {
            //console.log(tempSongData[indicies[j] - 1]);
            if (tempSongData[indicies[j] - 1].includes("Song") || tempSongData[indicies[j] - 1].includes("SyncTrack") || tempSongData[indicies[j] - 1].includes("Events")) {
                tempSongArray.push(tempSongData.slice(indicies[j] - 1, indicies[j + 1] - 1));

            } else if (tempSongData[indicies[j] - 1].includes("SingleBass")) {
                singleBass.push(tempSongData.slice(indicies[j] - 1, indicies[j + 1] - 1));

            } else if (tempSongData[indicies[j] - 1].includes("Single")) {
                single.push(tempSongData.slice(indicies[j] - 1, indicies[j + 1] - 1));

            } else if (tempSongData[indicies[j] - 1].includes("DoubleGuitar")) {
                doubleGuitar.push(tempSongData.slice(indicies[j] - 1, indicies[j + 1] - 1));

            } else if (tempSongData[indicies[j] - 1].includes("DoubleBass")) {
                doubleBass.push(tempSongData.slice(indicies[j] - 1, indicies[j + 1] - 1));

            } else if (tempSongData[indicies[j] - 1].includes("DoubleRythm")) {
                doubleRythm.push(tempSongData.slice(indicies[j] - 1, indicies[j + 1] - 1));

            } else if (tempSongData[indicies[j] - 1].includes("Drums")) {
                drums.push(tempSongData.slice(indicies[j] - 1, indicies[j + 1] - 1));

            } else if (tempSongData[indicies[j] - 1].includes("Keyboard")) {
                keyboards.push(tempSongData.slice(indicies[j] - 1, indicies[j + 1] - 1));

            } else if (tempSongData[indicies[j] - 1].includes("GHLGuitar")) {
                gHLGuitar.push(tempSongData.slice(indicies[j] - 1, indicies[j + 1] - 1));

            } else if (tempSongData[indicies[j] - 1].includes("GHLBass")) {
                gHLBass.push(tempSongData.slice(indicies[j] - 1, indicies[j + 1] - 1));

            }

        }

        if (single.length > 1) {
            tempSongArray.push(single);
        }
        if (singleBass.length > 1) {
            tempSongArray.push(singleBass);
        }
        if (doubleGuitar.length > 1) {
            tempSongArray.push(doubleGuitar);
        }
        if (doubleBass.length > 1) {
            tempSongArray.push(doubleBass);
        }
        if (doubleRythm.length > 1) {
            tempSongArray.push(doubleRythm);
        }
        if (drums.length > 1) {
            tempSongArray.push(drums);
        }
        if (keyboards.length > 1) {
            tempSongArray.push(keyboards);
        }
        if (gHLGuitar.length > 1) {
            tempSongArray.push(gHLGuitar);
        }
        if (gHLBass.length > 1) {
            tempSongArray.push(gHLBass);
        }

        songArray.push(tempSongArray)
        //console.log(tempSongArray);
    }
}

// understand the data that was found
function understandData() {

    dataArray = [];

    var counter = 0;

    for (var i = 0; i < songArray.length; i++) {
        for (var j = 0; j < songArray[i].length; j++) {
            if (songArray[i][j][0] == "[Song]") {
                var found = false;
                var logString = "Chart info:";

                for (var k = 0; k < songArray[i][j].length; k++) {
                    if (songArray[i][j][k].includes("Name = ")) {
                        console.log(songArray[i][j][k]);
                        logString += " Song: " + songArray[i][j][k].substring(songArray[i][j][k].indexOf("\"", 1) + 1, songArray[i][j][k].length - 1);
                        found = true;
                    } else if (songArray[i][j][k].includes("Artist = ")) {
                        logString += ", Artist: " + songArray[i][j][k].substring(songArray[i][j][k].indexOf("\"", 1) + 1, songArray[i][j][k].length - 1);
                        found = true;
                    } else if (songArray[i][j][k].includes("Charter = ")) {
                        logString += ", Charter: " + songArray[i][j][k].substring(songArray[i][j][k].indexOf("\"", 1) + 1, songArray[i][j][k].length - 1);
                        found = true;
                    } else if (k == songArray[i][j].length - 1) {
                        if (found) {
                            console.log(logString);
                        } else {
                            console.log("No info found");
                        }
                    }
                }
            }

            if (songArray[i][j][0] != "[Song]" && songArray[i][j][0] != "[SyncTrack]" && songArray[i][j][0] != "[Events]") {
                for (var k = 0; k < songArray[i][j].length; k++) {
                    console.log("Song number: " + i + ", found: " + songArray[i][j][k][0]);

                    var greenCount = 0;
                    var redCount = 0;
                    var yellowCount = 0;
                    var blueCount = 0;
                    var orangeCount = 0;
                    var forcedCount = 0;
                    var tapCount = 0;
                    var openCount = 0;
                    var otherCount = 0;
                    var chordCount = 0;

                    var starPowerCount = 0;

                    for (var l = 0; l < songArray[i][j][k].length; l++) {

                        var currentNote = songArray[i][j][k][l].trim().split(" ");
                        var nextNote = songArray[i][j][k][l + 1].trim().split(" ");

                        while (currentNote[0] == nextNote[0]) {
                            

                            l++;
                            nextNote = songArray[i][j][k][l + 1].trim().split(" ");
                        }

                        var noteInfo = songArray[i][j][k][l].trim().split(" ");

                        if (noteInfo[2] == "N") {
                        /*    var tempWhile = 0;

                            while (noteInfo[0] == songArray[i][j][k][l + tempWhile].trim().split(" ")[0] && songArray[i][j][k][l + tempWhile].trim().split(" ")[2] == "N") {
                                l++;
                                tempWhile++;
                                chordCount++;
                            }*/

                            switch (noteInfo[3]) {
                                case "0": greenCount++; break;
                                case "1": redCount++; break;
                                case "2": yellowCount++; break;
                                case "3": blueCount++; break;
                                case "4": orangeCount++; break;
                                case "5": forcedCount++; break;
                                case "6": tapCount++; break;
                                case "7": openCount++; break;
                                default: otherCount++; break;
                            }
                        } else if (noteInfo[2] == "S") {
                            starPowerCount++;
                        } else {
                            // do notthing
                        }

                        counter++;
                    }

                    dataArray.push({
                        "Song Info": logString.substring(11, logString.length),
                        "Difficulty": songArray[i][j][k][0].substring(1, songArray[i][j][k][0].length - 1),
                        "0. Greens": greenCount,
                        "1. Reds": redCount,
                        "2. Yellows": yellowCount,
                        "3. Blues": blueCount,
                        "4. Oranges": orangeCount,
                        "5. Opens": openCount,
                        "6. Taps": tapCount,
                        "7. Forced": forcedCount,
                        "8. Chords": chordCount,
                        "SP": starPowerCount,
                        "others": otherCount
                    });
                }
            }
        }
    }
    console.log(dataArray);
    console.log("Rows of note placements for difficulties: " + counter);
}



module.exports = {methodCalls}
