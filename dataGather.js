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

    console.log(pathToSongsFolder.length);

    cascadingLoop(pathToSongsFolder)

    console.log(chartPathArray);
    console.log(chartPathArray.length);

    var totalLength = 0;

    for (var i = 0; i < chartPathArray.length; i++) {
        var chartInfo = fs.readFileSync(chartPathArray[i], "utf8");

        console.log("chart number: " + i + ", is: " + chartInfo.length + " characters long");
        totalLength += chartInfo.length;

        allChartInfoArray.push(chartInfo);
    }

    console.log("Total length of all charts combined is: " + totalLength);

    //console.log(allChartInfoArray);
    console.log("Total amount of .chart files found: " + allChartInfoArray.length);

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
