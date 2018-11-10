//normal require stuffs
const fs = require("fs");

// variable initialization
var pathToSongsFolder;
var pathToBackupFolder;

var chartPathArray;
var allChartInfoArray;


// main functuion
function mainGather(pathToSongs, pathToBackup) {
    pathToSongsFolder = pathToSongs;
    pathToBackupFolder = pathToBackup;

    gatherChartPaths();
}

// function to gather paths to all chart files
function gatherChartPaths() {
    chartPathArray = [];
    allChartInfoArray = [];
    allChartArray = [];

    console.log(pathToSongsFolder.length);

    cascadingLoop(pathToSongsFolder)

    console.log(chartPathArray);
    console.log(chartPathArray.length);

    var totalLength = 0;

    for (var i = 0; i < chartPathArray.length; i++) {
        var chartInfo = fs.readFileSync(chartPathArray[i], "utf8");

        var chartSplit = chartInfo.trim().split("\r\n");

        var indicies = [];
        var element = "{";
        var idx = chartSplit.indexOf(element);

        while (idx != -1) {
            indicies.push(idx);
            idx = chartSplit.indexOf(element, idx + 1);
        }

        var countSingle = 0;
        var countDoubleGuitar = 0;
        var countDoubleBass = 0;
        var countDoubleRythm = 0;
        var countDrums = 0;
        var countKeyboards = 0;
        var countGHLGuitar = 0;
        var countGHLBass = 0;

        for (var j = 0; j < indicies.length; j++) {
            var currentTag = chartSplit[indicies[j] - 1];

            if (currentTag != "[Song]" && currentTag != "[SyncTrack]" && currentTag != "[Events]") {
                //console.log("found: " + currentTag);

                var tempTag = currentTag.substring(1, currentTag.length -1);

                if (tempTag.endsWith("Single")) {
                    countSingle++;
                } else if (tempTag.endsWith("DoubleGuitar")) {
                    countDoubleGuitar++;
                } else if (tempTag.endsWith("DoubleBass")) {
                    countDoubleBass++;
                } else if (tempTag.endsWith("DoubleRythm")) {
                    countDoubleRythm++;
                } else if (tempTag.endsWith("Drums")) {
                    countDrums++;
                } else if (tempTag.endsWith("Keyboard")) {
                    countKeyboards++;
                } else if (tempTag.endsWith("GHLGuitar")) {
                    countGHLGuitar++;
                } else if (tempTag.endsWith("GHLBass")) {
                    countGHLBass++;
                }

                //console.log(countSingle + ", " + countDoubleGuitar + ", " + countDoubleBass + ", " + countDoubleRythm + ", " + countDrums + ", " + countKeyboards + ", " + countGHLGuitar + ", " + countGHLBass);
            }
        }

        if (countSingle > 1 || countDoubleGuitar > 1 || countDoubleBass > 1 || countDoubleRythm > 1 || countDrums > 1 || countKeyboards > 1 || countGHLGuitar > 1 || countGHLBass > 1) {
            console.log("Chart number: " + i + " is put into the output");

            allChartInfoArray.push(chartInfo);
        } else {
            console.log("Chart number: " + i + " is removed");
        }

        console.log("chart number: " + i + ", is: " + chartInfo.length + " characters long");
        totalLength += chartInfo.length;

        allChartArray.push(chartInfo);
    }

    console.log("Total amount of .chart files found: " + allChartArray.length + " and the total length is: " + totalLength);

    var outputLength = 0;

    for (var i = 0; i < allChartInfoArray.length; i++) {
        outputLength += allChartInfoArray[i].length;
    }

    //console.log(allChartInfoArray);
    console.log("Total amount of .chart files in the output: " + allChartInfoArray.length + " and their length is: " + outputLength);

    try {
        fs.writeFileSync(pathToBackupFolder + "\\allChartInfo.json", allChartInfoArray.join("\r\n"), "utf8");
        console.log("Overwrite done without problems!");
    } catch (err) {
        console.log("Problems writing the chart file: " + err);
    }
}

function cascadingLoop(path) {
    var stuffFound = fs.readdirSync(path);

    for (var i = 0; i < stuffFound.length; i++) {
        var currentPath = path + "\\" + stuffFound[i];

        if (fs.statSync(currentPath).isDirectory()) {
            cascadingLoop(currentPath);
        } else if (fs.statSync(currentPath).isFile()) {
            if (currentPath.endsWith(".chart")) {
                chartPathArray.push(currentPath);
            }
        }
    }
}

module.exports = {mainGather}
