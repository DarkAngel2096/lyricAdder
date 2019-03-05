// module requires
const fs = require ("fs");

// class requires
const {SongInfo} = require ("./eventClasses/SongInfo.js");
const {Note} = require ("./eventClasses/Note.js");
const {StarPower} = require ("./eventClasses/StarPower.js");
const {BPM} = require ("./eventClasses/BPM.js");
const {TimeSignature} = require ("./eventClasses/TimeSignature.js");
// events
const {BaseEvent} = require ("./eventClasses/BaseEvent.js");
const {LyricEvent} = require ("./eventClasses/LyricEvent.js");
const {PhraseStartEvent} = require ("./eventClasses/PhraseStartEvent.js");
const {PhraseEndEvent} = require ("./eventClasses/PhraseEndEvent.js");
const {SectionEvent} = require ("./eventClasses/SectionEvent.js");
const {SoloEvent} = require ("./eventClasses/SoloEvent.js");
const {SoloEndEvent} = require ("./eventClasses/SoloEndEvent.js");

// variable creation
var fullChartFile;              // just holds the raw file in a big array

var chartLastModified = 0;      // global variable to create at the start of the program to hold the time when the chart was last modified

// boolean variables for each part to see if they are changed or not
var songInfoIsChanged;
var syncIsChanged;
var eventsIsChanged;
var notesIsChanged;

// variables for the object arrays that get returned
var objectSongInfo;
var objectSyncInfo;
var objectEventInfo;
var objectNotesInfo = {};

// variables to store the arrays of the last time the chart was read
var oldSong;
var oldSync;
var oldEvents;
var oldNotes;

// variables to store the current info
var chartSongInfo;
var chartSyncInfo;
var chartEventInfo;
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


// temp path variable
//var path = "C:\\Users\\s1800585\\Downloads\\Amaranthe - Army Of The Night (Powerwolf Cover)\\notes.chart";

//readChart(path)
//readChart(path)

// functions
function readChart(path) {

	// just to get to know how long reading the file takes
	console.log("Starting to read file");
	var startTime = Date.now();

	// check if it's even a file
	if (!fs.statSync(path).isFile()) {
		// log not a file
		console.log("Not a file, took to read: " + (Date.now() - startTime) + "ms.");
		return;
	}

	// check if it's a .chart file
	if (!path.endsWith(".chart")) {
		// log incorrect file type
		console.log("Not a .chart file, took to read: " + (Date.now() - startTime) + "ms.");
		return;
	}

	// check if the modified time is changed
	if (fs.statSync(path).mtimeMs == chartLastModified) {
		console.log("same times: " + fs.statSync(path).mtimeMs + " and " + chartLastModified);

		songInfoIsChanged = false;
		syncIsChanged = false;
		eventsIsChanged = false;
		notesIsChanged = false;

		console.log("Took to read: " + (Date.now() - startTime) + "ms");
		return;
	}

	// read chart file and split it up into an array for each line
	try {
		fullChartFile = [];
		fullChartFile = fs.readFileSync(path, "utf8").split("\r\n").map(line => line.trimRight());

		// search for lines only containing "" and remove them from the array;
		for (var i = fullChartFile.length; i >= 0; i--) {
			if (fullChartFile[i] == "") {
				console.log("removing: \*" + fullChartFile[i] + "\* at index: " + i);
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
	console.log(indices);

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
		switch (fullChartFile[indices[i]].trim()) {
			case "[Song]": chartSongInfo = fullChartFile.slice(indices[i], indices[i + 1]); console.log("[Song] found"); break;
			case "[SyncTrack]": chartSyncInfo = fullChartFile.slice(indices[i], indices[i + 1]); console.log("[SyncTrack] found"); break;
			case "[Events]": chartEventInfo = fullChartFile.slice(indices[i], indices[i + 1]); console.log("[Events] found"); break;
			default: {

				console.log("Diff found: " + fullChartFile[indices[i]]);

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

	testTagsChanged();

	console.log("new run throught the file:");
	console.log("Song: " + songInfoIsChanged);
	console.log("Sync: " + syncIsChanged);
	console.log("Events: " + eventsIsChanged);
	console.log("Notes: " + notesIsChanged);

	chartLastModified = fs.statSync(path).mtimeMs;
	console.log(chartDiffsInfo);

	console.log("Reading done in: " + (Date.now() - startTime) + "ms.");
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

// function to test all the tags if they were changed or not
function testTagsChanged() {

	// test [Song] tag
	if (testFunc(chartSongInfo, oldSong)) {
		songInfoIsChanged = true;
		oldSong = chartSongInfo;
	} else {
		songInfoIsChanged = false;
	}

	// test [SyncTrack] tag
	if (testFunc(chartSyncInfo, oldSync)) {
		syncIsChanged = true;
		oldSync = chartSyncInfo;
	} else {
		syncIsChanged = false;
	}

	// test [Event] tag
	if (testFunc(chartEventInfo, oldEvents)) {
		eventsIsChanged = true;
		oldEvents = chartEventInfo;
	} else {
		eventsIsChanged = false;
	}

	// test all instruments and difficulties (if one is changed, rebuild all)
	if (testDiffs(chartDiffsInfo, oldNotes)) {
		notesIsChanged = true;
		oldNotes = JSON.parse(JSON.stringify(chartDiffsInfo));
	} else {
		notesIsChanged = false;
	}
}

// test function for song, synctrack and events tags as they are only single dimension arrays this will work
function testFunc(newArr, oldArr) {
	if (!newArr) {
		// log problems with the new array
		console.log(newArr);
		throw new Error("Something odd going on");
		return;
	}

	for (var i = 0; i < newArr.length; i++) {
		if (oldArr == undefined) {
			return true;
		}

		if (newArr[i] != oldArr[i]) {
			return true;
		}
	}
	return false;
}

// test function for difficulties, has to be done this way because ob the structure of the object it is
function testDiffs(newArr, oldArr) {
	var instruments = Object.keys(newArr);

	for (var i = 0; i < instruments.length; i++) {
		var diffs = Object.keys(newArr[instruments[i]]);

		for (var j = 0; j < diffs.length; j++) {
			for (var k = 0; k < newArr[instruments[i]][diffs[j]].length; k++) {
				if (oldNotes == undefined) {
					console.log("undefined found");
					return true;
				}

				if (newArr[instruments[i]][diffs[j]][k] != oldArr[instruments[i]][diffs[j]][k]) {
					console.log("odds found");
					return true;
				}
			}
		}
	}

	return false;
}


// get functions for different parts
// inside if statement new objects get created, then returned
// if the if statement gets triggered then it is because the data inside that tag was changed since last time

// song data
function getSongInfo() {
	// start time for when called
	console.log("getSongInfo() called.");
	var startSongTime = Date.now();

	if (chartSongInfo.length < 4) {
		// log no info found
		console.log("Song tag empty: " + chartSongInfo);
		throw new Error ("Nothing found in the [Song] tag");
	}

	if (songInfoIsChanged) {
		console.log("Song info was changed");
		objectSongInfo = gatherSongInfo(chartSongInfo);
	}

	console.log("done and returning: " + (Date.now() - startSongTime) + "ms.");
	return objectSongInfo;
}

// sync data
function getSyncInfo() {

	console.log("getSyncInfo() called.");
	var startSyncTime = Date.now();

	if (chartSyncInfo.length < 4) {
		// log no info found
		console.log("Sync tag empty: " + chartSyncInfo);
		throw new Error ("Nothing found in the [SyncTrack] tag");
	}

	if (syncIsChanged) {
		console.log("Sync info was changed");
		objectSyncInfo = createObjects(chartSyncInfo);
	}

	console.log("done and returning: " + (Date.now() - startSyncTime) + "ms.");
	return objectSyncInfo;
}

// events data
function getEventInfo() {

	console.log("getEventInfo() called.");
	var startEventTime = Date.now();

	if (chartEventInfo.length < 4) {
		// log no info found
		console.log("Event tag empty: " + chartEventInfo);
		throw new Error ("Nothing found in the [Event] tag");
	}

	if (eventsIsChanged) {
		console.log("Events info was changed");
		objectEventInfo = createObjects(chartEventInfo);
	}

	console.log("done and returning: " + (Date.now() - startEventTime) + "ms.");
	return objectEventInfo;
}

function getDiffsInfo() {

	console.log("getDiffsInfo() called.");
	var startDiffsTime = Date.now();

	var tempInst = Object.keys(chartDiffsInfo);
	var tempDiffsCount = 0;

	for (let i = 0; i < tempInst.length; i++) {
		let tempDiffs = Object.keys(chartDiffsInfo[tempInst[i]]);

		if (tempDiffs.length > 0) {
			tempDiffsCount += tempDiffs.length;
		}
	}

	if (tempDiffsCount == 0) {
		// log nothing found
		console.log("No notes placed down");
		throw new Error ("No notes placed down");
	}

	if (notesIsChanged) {
		console.log("Notes info was changed");
		objectNotesInfo = {};

		for (let i = 0; i < tempInst.length; i++) {
			let tempDiffs = Object.keys(chartDiffsInfo[tempInst[i]]);

			objectNotesInfo[tempInst[i]] = {};

			for (let j = 0; j < tempDiffs.length; j++) {
				objectNotesInfo[tempInst[i]][tempDiffs[j]] = createObjects(chartDiffsInfo[tempInst[i]][tempDiffs[j]]);
			}
		}
	}

	console.log("done and returning: " + (Date.now() - startDiffsTime) + "ms.");
	return objectNotesInfo;
}

// function to gather data from the Song tag
function gatherSongInfo(info) {
	var song = "";
	var artist = "";
	var album = "";
	var year = 0;
	var genre = "";
	var charter = "";

	for (var i = 2; i < info.length - 1; i++) {
		let tempSplit = info[i].trim().split(" ").map(line => line.trim());

		switch (tempSplit[0]) {
			case "Name": {
				song = tempSplit.slice(2, tempSplit.length).join(" ").replace(/[^\w\s]/g, "");
				break;
			}
			case "Artist": {
				artist = tempSplit.slice(2, tempSplit.length).join(" ").replace(/[^\w\s]/g, "");
				break;
			}
			case "Album": {
				album = tempSplit.slice(2, tempSplit.length).join(" ").slice(1, -1);
				break;
			}
			case "Year": {
			 	year = parseInt(tempSplit[3]);
			   	break;
			}
			case "Genre": {
				genre = tempSplit.slice(2, tempSplit.length).join(" ").slice(1, -1);
				break;
			}
			case "Charter": {
				charter = tempSplit.slice(2, tempSplit.length).join(" ").slice(1, -1);
				break;
			}
		}
	}

	if (song == "" && artist == "") {
		song = "No song name";
		let tempDate = new Date();

		artist = tempDate.getDate() + "-" + (tempDate.getMonth() + 1);
	}

	return new SongInfo(song, artist, album, year, genre, charter);
}

// function to create objects for SyncTrack and Events tags
function createObjects(infoArr) {

	var returnArray = [];

	var chordArray = [];
	var numberOfNotes = 0;

	var toForce = false;
	var toTap = false;
	var chordTick = 0;

	for (var i = 0; i < infoArr.length; i++) {
		var lineInfo = infoArr[i].substring(0, infoArr[i].length).trim().replace(/ =/, "").replace(/ "/, " ").split(" ");

		if (lineInfo.length != 1) {
			lineInfo[0] = parseInt(lineInfo[0]);

			switch (lineInfo[1]) {
				case "N": {
					lineInfo[2] = parseInt(lineInfo[2]);

					console.log(lineInfo);


					/*
					lineInfo[2] = parseInt(lineInfo[2]);

					// check if it's part of a bunch of events with the same tick (also taking taps and forces)
					if (lineInfo[2] == chordTick) {
						//console.log("pushed: " + lineInfo + " to chord array");
						chordArray.push(lineInfo);
					} else if (lineInfo[2] != chordTick) {
						if (chordArray.length > 1) {
							for (var j = 0; j < 2; j++) {
								for (var k = 0; k < chordArray.length; k++) {
									switch (j) {
										case 0: {
											switch (chordArray[k][2]) {
												case "5": {
													toForce = true;
													break;
												}
												case "6": {
													toTap = true;
													break;
												}
												case "0":
												case "1":
												case "2":
												case "3":
												case "4":
												case "7":
												case "8": {
													numberOfNotes++;
													break;
												}
											}
											break;
										}
										case 1: {
											switch (chordArray[k][2]) {
												case "0":
												case "1":
												case "2":
												case "3":
												case "4":
												case "7":
												case "8": {
													if (numberOfNotes > 1) {
														returnArray.push(new Note(chordArray[k][0], chordArray[k][2], toForce, toTap, true, parseInt(chordArray[k][3])));
													} else {
														returnArray.push(new Note(chordArray[k][0], chordArray[k][2], toForce, toTap, false, parseInt(chordArray[k][3])));
													}
													break;
												}
											}
											break;
										}
									}
								}
							}

							toForce = false;
							toTap = false;
							numberOfNotes = 0;

							chordArray = [];
						} else {
							returnArray.push(new Note(lineInfo[0], lineInfo[2], false, false, false, parseInt(lineInfo[3])));
						}

						chordArray.push(lineInfo);
						chordTick = lineInfo[0];
					}

					break;*/

					/*				// IS NOT WORKING PROPERLY
					lineInfo[2] = parseInt(lineInfo[2]);

					switch (lineInfo[2]) {
						case 0:			// green		// white 1
						case 1:			// red			// white 2
						case 2:			// yellow		// white 3
						case 3:			// blue			// black 1
						case 4:			// orange		// black 2
						case 7:			// open			// open
						case 8: {		// not used		// black 3
							if (chordTick == lineInfo[0]) {
								returnArray.push(new Note(lineInfo[0], lineInfo[2], toForce, toTap, true, parseInt(lineInfo[3])));
							} else {
								returnArray.push(new Note(lineInfo[0], lineInfo[2], toForce, toTap, false, parseInt(lineInfo[3])));
							}
							chordTick = lineInfo[0];

							toForce = false;
							toTap = false;

							break;
						}
						case 5: {		// force		// force
							toForce = true;

							break;
						}
						case 6: {		// tap			// tap
							toTap = true;

							break;
						}
					}
					*/
				}
				case "S": {
					returnArray.push(new StarPower(lineInfo[0], parseInt(lineInfo[3])));
					break;
				}
				case "TS": {
					if (lineInfo[3]) {
						returnArray.push(new TimeSignature(lineInfo[0], parseInt(lineInfo[2]), parseInt(lineInfo[3])));
					} else {
						returnArray.push(new TimeSignature(lineInfo[0], parseInt(lineInfo[2]), 4));
					}
					break;
				}
				case "B": {
					returnArray.push(new BPM(lineInfo[0], parseInt(lineInfo[2])));
					break;
				}
				case "E": {
					lineInfo[2] = lineInfo[2].replace(/[^\w\s]/g, "");

					switch (lineInfo[2]) {
						case "solo": {
							returnArray.push(new SoloEvent(lineInfo[0]));
							break;
						}
						case "soloend": {
							returnArray.push(new SoloEndEvent(lineInfo[0]));
							break;
						}
						case "section": {
							returnArray.push(new SectionEvent(lineInfo[0], lineInfo.slice(3, lineInfo.length).join(" ")));
							break;
						}
						case "lyric": {
							returnArray.push(new LyricEvent(lineInfo[0], lineInfo.slice(3, lineInfo.length).join(" ")));
							break;
						}
						case "phrase_start": {
							returnArray.push(new PhraseStartEvent(lineInfo[0]));
							break;
						}
						case "phrase_end": {
							returnArray.push(new PhraseEndEvent(lineInfo[0]));
							break;
						}
						case "default": {
							returnArray.push(new BaseEvent(lineInfo[0], "default", false))
							break;
						}
						default: {
							console.log("Some other event: " + lineInfo);
							break;
						}
					}

					break;
				}
				default: {
					console.log("other stuff: " + lineInfo);
				}
			}
		}
	}

	return returnArray;
}
/*
192 = E solo
192 = E soloend
192 = E "section Verse 1"
192 = E "lyric some interesting lyrics"
192 = E "phrase_start"
192 = E "phrase_end"
192 = E "default"

192 = N 0 192
192 = S 2 192
192 = TS 4 8
192 = TS 4
192 = B 165000


[tick, type, firstThing, theRest]

[192, "E", "solo"]
[192, "E", "soloend"]
[192, "E", "section", "Verse 1"]
[192, "E", "lyric", "some interesting lyrics"]
[192, "E", "phrase_start"]
[192, "E", "phrase_end"]

[192, "N", 0, 192]
[192, "S", 2, 192]
[192, "TS", 4, 8]
[192, "TS", 4]
[192, "B", 165000]
*/


		/*if (lineInfo.length != 1) {
			if (["N", "TS", "B", "S"].includes(lineInfo[2])) {
				switch (lineInfo[2]) {
					case "N": {
						console.log("Note");
						break;
					}
					case "S": {
						console.log("SP");
						break;
					}
					case "TS": {
						console.log("TS");
						break;
					}
					case "B": {
						console.log("BPM");
						break;
					}
					default: {
						console.log("Other");
						break;
					}
				}
			} else if (lineInfo[2].includes("E")) {
				switch (lineInfo[3]) {
					case "solo": {
						console.log("Solo start at: " + lineInfo[0]);
						break;
					}
					case "soloend": {
						console.log("Soloend at: " + lineInfo[0]);
						break;
					}
					case "phrase_start": {
						console.log("Phrase start");
						break;
					}
					case "phrase_end": {
						console.log("Phrase end");
						break;
					}
					case "lyric": {
						console.log("Lyric: " + lineInfo[4]);
						break;
					}
					case "section": {
						console.log("Section");
						break;
					}
				}
			}
		}*/

module.exports = {readChart, getSongInfo, getSyncInfo, getEventInfo, getDiffsInfo}
