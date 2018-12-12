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

    var greenCountTotal = 0;
    var redCountTotal = 0;
    var yellowCountTotal = 0;
    var blueCountTotal = 0;
    var orangeCountTotal = 0;
    var forcedCountTotal = 0;
    var tapCountTotal = 0;
    var openCountTotal = 0;
    var otherCountTotal = 0;
    var otherEventCountTotal = 0;
    var soloCountTotal = 0;
    var soloEndCountTotal = 0;
    var chordCountTotal = 0;

    var starPowerCountTotal = 0;

    dataArray = [];

    var counter = 0;

    // song loop
    for (var i = 0; i < songArray.length; i++) {
        //i = 37;
        //console.log(songArray[i]);

        var chartInfoTemp = [];

        // event tag loop
        for (var j = 0; j < songArray[i].length; j++) {
            if (songArray[i][j][0] == "[Song]") {
                var found = false;
                var logString = "Chart info:";

                // chart info gathering
                for (var k = 0; k < songArray[i][j].length; k++) {
                    if (songArray[i][j][k].includes("Name = ")) {
                        //console.log(songArray[i][j][k]);
                        logString += " Song: " + songArray[i][j][k].substring(songArray[i][j][k].indexOf("\"", 1) + 1, songArray[i][j][k].length - 1);
                        found = true;
                    } else if (songArray[i][j][k].includes("Artist = ") && !songArray[i][j][k].includes("OriginalArtist = ")) {
                        logString += ", Artist: " + songArray[i][j][k].substring(songArray[i][j][k].indexOf("\"", 1) + 1, songArray[i][j][k].length - 1);
                        found = true;
                    } else if (songArray[i][j][k].includes("ArtistText = ")) {
                        if (!(songArray[i][j][k].substring(songArray[i][j][k].indexOf("\"", 1) + 1, songArray[i][j][k].length - 1) != "\"by\"")) {
                            logString += ", ArtistText: " + songArray[i][j][k].substring(songArray[i][j][k].indexOf("\"", 1) + 1, songArray[i][j][k].length - 1);
                            found = true;
                        }
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

                // difficulty / instrument loop
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

                    var otherEventCount = 0;
                    var soloCount = 0;
                    var soloEndCount = 0;

                    var chordCount = 0;

                    var starPowerCount = 0;

                    var noteCountArr;
                    var otherThingsArr;


                    counter += songArray[i][j][k].length;

                    // note placement for difficulty / instrument
                    for (var l = 0; l < songArray[i][j][k].length; l++) {

                        var currentNote = songArray[i][j][k][l].trim().split(" ");

                        if (!(currentNote[0].startsWith("{") || currentNote[0].startsWith("}") || currentNote[0].startsWith("["))) {
                            switch (currentNote[2]) {
                                case "N":{
                                    switch (currentNote[3]) {
                                        case "0": greenCount++; break;
                                        case "1": redCount++; break;
                                        case "2": yellowCount++; break;
                                        case "3": blueCount++; break;
                                        case "4": orangeCount++; break;
                                        case "5": forcedCount++; break;
                                        case "6": tapCount++; break;
                                        case "7": openCount++; break;
                                        default: console.log("Other stuff going on in N: " + currentNote); otherCount++; break;
                                    }
                                    break;
                                }
                                case "S": starPowerCount++; break;
                                case "E": {
                                    switch (currentNote[3]) {
                                        case "solo": soloCount++; break;
                                        case "soloend": soloEndCount++; break;
                                        case "*":
                                        case "!":
                                        case "T": break;
                                        default: console.log(currentNote); otherEventCount++; break;
                                    }
                                    break;
                                }
                                default: console.log("Other stuff going on with tag: " + currentNote); otherCount++; break;
                            }
                        } else {
                            //console.log("found tag: " + currentNote);
                        }
                    }

                    noteCountArr = {
                        "1. Taps": tapCount,
                        "2. Forced": forcedCount,
                        "3. Chords": chordCount
                    };

                    otherThingsArr = {
                        "SP": starPowerCount,
                        "0. other events": otherEventCount,
                        "1. solo": soloCount,
                        "2. soloend": soloEndCount,
                        "other stuff": otherCount
                    };

                    chartInfoTemp.push({
                        "Difficulty": songArray[i][j][k][0].substring(1, songArray[i][j][k][0].length - 1),
                        "0. Greens": greenCount,
                        "1. Reds": redCount,
                        "2. Yellows": yellowCount,
                        "3. Blues": blueCount,
                        "4. Oranges": orangeCount,
                        "5. Opens": openCount,
                        "6. Total Notes": (greenCount + redCount + yellowCount + blueCount + orangeCount + openCount),
                        "Other note info":  noteCountArr,
                        "Other stuff": otherThingsArr
                    });

                    greenCountTotal += greenCount;
                    redCountTotal += redCount;
                    yellowCountTotal += yellowCount;
                    blueCountTotal += blueCount;
                    orangeCountTotal += orangeCount;
                    forcedCountTotal += forcedCount;
                    tapCountTotal += tapCount;
                    openCountTotal += openCount;
                    otherCountTotal += otherCount;
                    otherEventCountTotal += otherEventCount;
                    soloCountTotal += soloCount;
                    soloEndCountTotal += soloEndCount;

                    chordCountTotal += chordCount;

                    starPowerCountTotal += starPowerCount;
                }
            }
        }

        var chartInfoPerDiff = [];

        var single = [];
        var singleBass = [];
        var doubleGuitar = [];
        var doubleBass = [];
        var doubleRythm = [];
        var drums = [];
        var keyboards = [];
        var gHLGuitar = [];
        var gHLBass = [];

        for (var j = 0; j < chartInfoTemp.length; j++) {
            console.log(chartInfoTemp[j]);

            if (chartInfoTemp[j]["Difficulty"].includes("Single")) {
                if (single.length == 0 || single[0]["Difficulty"].includes("Expert")) {
                    single.push(chartInfoTemp[j]);
                } else {
                    single.unshift(chartInfoTemp[j]);
                }
            } else if (chartInfoTemp[j]["Difficulty"].includes("SingleBass")) {
                if (singleBass.length == 0 || singleBass[0]["Difficulty"].includes("Expert")) {
                    singleBass.push(chartInfoTemp[j]);
                } else {
                    singleBass.unshift(chartInfoTemp[j]);
                }
            } else if (chartInfoTemp[j]["Difficulty"].includes("DoubleGuitar")) {
                if (doubleGuitar.length == 0 || doubleGuitar[0]["Difficulty"].includes("Expert")) {
                    doubleGuitar.push(chartInfoTemp[j]);
                } else {
                    doubleGuitar.unshift(chartInfoTemp[j]);
                }
            } else if (chartInfoTemp[j]["Difficulty"].includes("DoubleBass")) {
                if (doubleBass.length == 0 || doubleBass[0]["Difficulty"].includes("Expert")) {
                    doubleBass.push(chartInfoTemp[j]);
                } else {
                    doubleBass.unshift(chartInfoTemp[j]);
                }
            } else if (chartInfoTemp[j]["Difficulty"].includes("DoubleRythm")) {
                if (doubleRythm.length == 0 || doubleRythm[0]["Difficulty"].includes("Expert")) {
                    doubleRythm.push(chartInfoTemp[j]);
                } else {
                    doubleRythm.unshift(chartInfoTemp[j]);
                }
            } else if (chartInfoTemp[j]["Difficulty"].includes("Drum")) {
                if (drums.length == 0 || drums[0]["Difficulty"].includes("Expert")) {
                    drums.push(chartInfoTemp[j]);
                } else {
                    drums.unshift(chartInfoTemp[j]);
                }
            } else if (chartInfoTemp[j]["Difficulty"].includes("Keyboard")) {
                if (keyboards.length == 0 || keyboards[0]["Difficulty"].includes("Expert")) {
                    keyboards.push(chartInfoTemp[j]);
                } else {
                    keyboards.unshift(chartInfoTemp[j]);
                }
            } else if (chartInfoTemp[j]["Difficulty"].includes("GHLGuitar")) {
                if (gHLGuitar.length == 0 ||gHLGuitar[0]["Difficulty"].includes("Expert")) {
                    gHLGuitar.push(chartInfoTemp[j]);
                } else {
                    gHLGuitar.unshift(chartInfoTemp[j]);
                }
            } else if (chartInfoTemp[j]["Difficulty"].includes("GHLBass")) {
                if (gHLBass.length == 0 || gHLBass[0]["Difficulty"].includes("Expert")) {
                    gHLBass.push(chartInfoTemp[j]);
                } else {
                    gHLBass.unshift(chartInfoTemp[j]);
                }
            }
        }

        if (single.length != 0) {chartInfoPerDiff.push(countNotes("Single", single));}
        if (singleBass.length != 0) {chartInfoPerDiff.push(countNotes("SingleBass", singleBass));}
        if (doubleGuitar.length != 0) {chartInfoPerDiff.push(countNotes("DoubleGuitar", doubleGuitar));}
        if (doubleBass.length != 0) {chartInfoPerDiff.push(countNotes("DoubleBass", doubleBass));}
        if (doubleRythm.length != 0) {chartInfoPerDiff.push(countNotes("DoubleRythm", doubleRythm));}
        if (drums.length != 0) {chartInfoPerDiff.push(countNotes("Drums", drums));}
        if (keyboards.length != 0) {chartInfoPerDiff.push(countNotes("Keyboards", keyboards));}
        if (gHLGuitar.length != 0) {chartInfoPerDiff.push(countNotes("GHLGuitar", gHLGuitar));}
        if (gHLBass.length != 0) {chartInfoPerDiff.push(countNotes("GHLBass", gHLBass));}

        dataArray.push({
            "1. Song Info": logString.substring(11, logString.length),
            "2. Difficulty info": chartInfoPerDiff
        });
    }
    console.log(dataArray);

    console.log("All following next once are total numbers");

    console.log("Greens: " + greenCountTotal);
    console.log("Reds: " + redCountTotal);
    console.log("Yellows: " + yellowCountTotal);
    console.log("Blues: " + blueCountTotal);
    console.log("Oranges: " + orangeCountTotal);
    console.log("Opens: " + openCountTotal);
    console.log("Taps: " + tapCountTotal);
    console.log("Forced: " + forcedCountTotal);
    console.log("Chords: " + chordCountTotal);
    console.log("SP: " + starPowerCountTotal);
    console.log("other events: " + otherEventCountTotal);
    console.log("solo: " + soloCountTotal);
    console.log("soloend: " + soloEndCountTotal);
    console.log("others: " + otherCountTotal);


    console.log("Rows of note placements for difficulties: " + counter);

    try {
        fs.writeFileSync("../lyricAdder_backups" + "\\dataSifted.json", JSON.stringify(dataArray, null, "\t"), "utf8");
        console.log("Overwrite done without problems!");
    } catch (err) {
        console.log("Problems writing the chart file: " + err);
    }
}

function countNotes(inst, instrument) {
    var expertTotalCount = 0;
    var hardTotalCount = 0;
    var mediumTotalCount = 0;
    var easyTotalCount = 0;

    var totalCount = 0;

    for (var i = 0; i < instrument.length; i++) {
        switch (instrument[i]["Difficulty"].substring(0, 4)) {
            case "Expe": expertTotalCount += instrument[i]["6. Total Notes"]; totalCount += instrument[i]["6. Total Notes"]; break;
            case "Hard": hardTotalCount += instrument[i]["6. Total Notes"]; totalCount += instrument[i]["6. Total Notes"]; break;
            case "Medi": mediumTotalCount += instrument[i]["6. Total Notes"]; totalCount += instrument[i]["6. Total Notes"]; break;
            case "Easy": easyTotalCount += instrument[i]["6. Total Notes"]; totalCount += instrument[i]["6. Total Notes"]; break;
        }
    }

    var obj = {
        "Instrument": instrument,
        "Total Notes": totalCount,
        "Note count / percentages": {
            "Expert": expertTotalCount + ", " + (expertTotalCount / expertTotalCount * 100).toFixed(3),
            "Hard": hardTotalCount + ", " +  (hardTotalCount / expertTotalCount * 100).toFixed(3),
            "Medium": mediumTotalCount + ", " +  (mediumTotalCount / expertTotalCount * 100).toFixed(3),
            "Easy": easyTotalCount + ", " +  (easyTotalCount / expertTotalCount * 100).toFixed(3)
        }
    }

    return obj;
}

module.exports = {methodCalls}
