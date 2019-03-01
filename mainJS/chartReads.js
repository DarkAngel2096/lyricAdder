// module requires
const fs = require("fs");

// variable creation
var fullChartFile;
var chartSongInfo;
var chartSyncInfo;
var chartEventInfo;

// variable to return, array of difficulties and notes for each
var chartDiffsInfo = {
	"Single": {},
	"SingleBass": {},
	"DoubleGuitar": {},
	"DoubleRythm": {},
	"DoubleBass": {},
	"Drum": {},
	"Keyboard": {},
	"GHLGuitar": {},
	"GHLBass": {}
}

// functions

// main function to actually read the chart file and split it up into variables for each main tag
function readChart(path) {
	// possibly allow selection of a folder with the .chart, .ini and audio readFileSync
	if (!fs.statSync(path).isFile()) {
		// log not a file error message to UI
		console.log("problems with the path not being to a file");
		throw new Error ("No file selected");
		return;
	}

	// possibly changed to also allow .mid files later
	if (!path.endsWith(".chart")) {
		// log not a .chart file error message to UI
		console.log("not a .chart file selected");
		throw new Error ("Selected file is NOT .chart");
		return;
	}

	// read chart file and split it up into an array for each line
	try {
		fullChartFile = [];
		fullChartFile = fs.readFileSync(path, "utf8").split("\r\n").map(line => line.trimRight());

		// search for lines only containing "" and remove them from the array;
		for (var i = fullChartFile.length; i >= 0; i--) {
			if (fullChartFile[i] == "") {
				console.log("removing: " + fullChartFile[i] + " at index: " + i);
				fullChartFile.splice(i, 1);
			}
		}
	} catch (err) {
		console.log("Problems reading file: " + err);
		console.log(err.stack);
		return;
	}

	// check on which lines the element "{" can be found and take the array index of the field before as that is the tag name
	var indices = [];
	var element = "{";
	var idx = fullChartFile.indexOf(element) - 1;
	while (idx != -2) {
		indices.push(idx);
		idx = fullChartFile.indexOf(element, idx + 2) - 1;
	}

	// add the line count of the full chart file for ease of use in the splitting process
	indices.push(fullChartFile.length);

	// just check if any tag was found (test against 1 because the full length push)
	if (indices.length == 1) {
		// log problems with file not having any tags
		console.log(indices);
		console.log("nothing useful found from the chart");
		throw new Error ("Nothing useful found from the .chart");
		return;
	}

	// slicing out the needed parts for each tag type, except difficulties which just get pushed into one array
	for (var i = 0; i < indices.length - 1; i++) {
		switch (fullChartFile[indices[i]]) {
			case "[Song]": chartSongInfo = fullChartFile.slice(indices[i], indices[i + 1]); break;
			case "[SyncTrack]": chartSyncInfo = fullChartFile.slice(indices[i], indices[i + 1]); break;
			case "[Events]": chartEventInfo = fullChartFile.slice(indices[i], indices[i + 1]); break;
			default: {
				var tempReturn = testInstAndDiff(fullChartFile[indices[i]]);

				if (tempReturn.Difficulty && tempReturn.Instrument) {
					chartDiffsInfo[tempReturn.Instrument][tempReturn.Difficulty] = fullChartFile.slice(indices[i], indices[i + 1]);
				} else if (!tempReturn.Difficulty && tempReturn.Instrument) {
					// log difficulty not found, problems with chart file syntax?
					console.log(fullChartFile[indices[i]]);
				} else if (tempReturn.Difficulty && !tempReturn.Instrument) {
					// log instrument not found, problemws with chart file syntax?
					console.log(fullChartFile[indices[i]]);
				} else {
					// log other problems
				}
			}
		}
	}
}

// function to test which instrument and difficulty we are working with;
function testInstAndDiff(tempInd) {
	let difficulties = ["[Expert", "[Hard", "[Medium", "[Easy"];
	let instruments = ["Single]", "SingleBass]", "DoubleGuitar]", "DoubleRythm]", "DoubleBass]", "Drum]", "Keyboard]", "GHLGuitar]", "GHLBass"];

	var returnObject = {}

	for (var i = 0; i < difficulties.length; i++) {
		if (tempInd.startsWith(difficulties[i])) {
			returnObject.Difficulty = difficulties[i].substring(1).trim();
			break;
		}
	}

	for (var i = 0; i < instruments.length; i++) {
		if (tempInd.endsWith(instruments[i])) {
			returnObject.Instrument = instruments[i].substring(0, instruments[i].length - 1).trim();
			break;
		}
	}

	return returnObject;
}

// Return functions to get the info wanted under each tag

// song metadata
function getSongInfo() {
	if (chartSongInfo.length < 4) {
		// log broken (?) [Song] tag, no info found
	} else {
		return chartSongInfo;
	}
}

// sync data (BPM and TS markers)
function getSyncInfo() {
	if (chartSyncInfo.length < 4) {
		// log broken (?) [SyncTrack] tag, no info found
	} else {
		return chartSyncInfo;
	}
}

// all global event data
function getEventInfo() {
	if (chartEventInfo.length < 4) {
		// log broken (?) [Event] tag, no info found
	} else {
		return chartEventInfo;
	}
}

// the note and difficulty data
function getDiffsInfo() {
	return chartDiffsInfo;
}

// module expors
module.exports = {readChart, getSongInfo, getSyncInfo, getEventInfo, getDiffsInfo}
