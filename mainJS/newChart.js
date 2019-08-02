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
		console.log("Not a .chart file " + path + ", took to read: " + (Date.now() - startTime) + "ms.");
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
					console.log("Other interesting stuff found");
					console.log(fullChartFile[indices[i]]);
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
	//console.log(chartDiffsInfo);

	console.log("Reading done in: " + (Date.now() - startTime) + "ms.");
}

// function to test which instrument and difficulty we are working with;
function testInstAndDiff(tempInd) {
	let difficulties = ["[Expert", "[Hard", "[Medium", "[Easy"];
	let instruments = ["Single]", "SingleBass]", "DoubleGuitar]", "DoubleRythm]", "DoubleBass]", "Drum]", "Keyboard]", "GHLGuitar]", "GHLBass"];

	var returnObject = {}

	// difficulty check
	for (var i = 0; i < difficulties.length; i++) {
		if (tempInd.startsWith(difficulties[i])) {
			returnObject.Difficulty = difficulties[i].substring(1).trim();
			break;
		}
	}

	// instrument check
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
					console.log("OldNotes is undefined");
					return true;
				}

				if (newArr[instruments[i]][diffs[j]][k] != oldArr[instruments[i]][diffs[j]][k]) {
					console.log("OldNotes and Current does not match");
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

	console.log("done and returning from getSongInfo(): " + (Date.now() - startSongTime) + "ms.");
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

	console.log("done and returning from getSyncInfo(): " + (Date.now() - startSyncTime) + "ms.");
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

	console.log("done and returningfrom getEventInfo(): " + (Date.now() - startEventTime) + "ms.");
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

	console.log("done and returning from getDiffsInfo(): " + (Date.now() - startDiffsTime) + "ms.");
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
	var resolution = 0;
	var otherParts = [];

	for (var i = 2; i < info.length - 1; i++) {
		let tempSplit = info[i].trim().split(" ").map(line => line.trim());

		// temporary stuff
		console.log(tempSplit);


		switch (tempSplit[0]) {
			case "Name": {
				song = tempSplit.slice(2, tempSplit.length).join(" ").slice(1, -1);
				break;
			}
			case "Artist": {
				artist = tempSplit.slice(2, tempSplit.length).join(" ").slice(1, -1);
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
			case "Resolution": {
				resolution = parseInt(tempSplit[2]);
				break;
			}
			default: {
				otherParts.push(tempSplit.join(" "));
				break;
			}
		}
	}

	if (song == "" && artist == "") {
		song = "No song name";
		let tempDate = new Date();

		artist = tempDate.getDate() + "." + (tempDate.getMonth() + 1);
	}

	return new SongInfo(song, artist, album, year, genre, charter, resolution, otherParts);
}

// function to create objects for SyncTrack and Events tags
function createObjects(infoArr) {

	var returnArray = []; 			// the array that gets returned and later on put into the global variable

	var noteObject = {				// object for keeping track of notes
		tick: 0,
		forced: false,
		tapped: false,
		chord: false,
		notes: []
	}


	// will not be needed later on probably
	var toForce = false;			// if the note should be forced
	var toTap = false;				// if the note should be tapped
	var toChord = false;			// if the note should be chord

	var noteCountSingular = 0;		// total amount of singular notes, just temporary probably
	var noteCountStuff = 0;			// amount of notes with chords not being counted as multiples

	// loop through the whole info array and look at each index
	for (var i = 0; i < infoArr.length; i++) {
		var lineInfo = infoArr[i]/*.substring(0, infoArr[i].length)*/.trim().replace(/ =/, "").replace(/ "/, " ").split(" ");

		// check if the line has some useful info to it
		if (lineInfo.length != 1) {
			lineInfo[0] = parseInt(lineInfo[0]);

			switch (lineInfo[1]) {
				case "N": {	// note tag

					// parse numbers to have an easier time later on, just throw them in the same place they were
					lineInfo[2] = parseInt(lineInfo[2]);
					lineInfo[3] = parseInt(lineInfo[3]);

					// check if the tick is the same as the notes before it
					// if it is, then just add the note to the list, unless it's forced or tapped
					if (noteObject.tick == lineInfo[0]) {
						// switch with what we've found
						switch (lineInfo[2]) {
							case 5: noteObject.forced = true; break;
							case 6: noteObject.tapped = true; break;
							default: noteObject.notes.push(lineInfo); break;
						}
					}
					// if it is not the same then create the Note classes, clear the object and add the new tick etc...
					if (noteObject.tick != lineInfo[0] || infoArr.length - 2 == i) {
						// do we have more than one note on a tick for a chord?
						if (noteObject.notes.length > 1) {
							noteObject.chord = true;
						}

						// just a counter to see the amount of singular notes in a song
						noteCountSingular += noteObject.notes.length;
						noteCountStuff++;

						// loop through the notes part of the noteObject
						for (var j = 0; j < noteObject.notes.length; j++) {

							// this will miss the last note of the song no matter what things are, that is why there needs to be a loop at the end as well
							var note = new Note(noteObject.notes[j][0], noteObject.notes[j][2], noteObject.tapped,
								noteObject.forced, noteObject.chord, noteObject.notes[j][3]);

							returnArray.push(note);
						}

						// clear the noteObject forced, tapped and chord variables as well as new tick and clear the notes tho push the new line to it
						noteObject.tick = lineInfo[0];
						noteObject.forced = false;
						noteObject.tapped = false;
						noteObject.chord = false;
						noteObject.notes = [];
						noteObject.notes.push(lineInfo);
					}
					break;
				}
				case "S": { // star power tag
					returnArray.push(new StarPower(lineInfo[0], parseInt(lineInfo[3])));
					break;
				}
				case "TS": { // time signature tag
					if (lineInfo[3]) {
						returnArray.push(new TimeSignature(lineInfo[0], parseInt(lineInfo[2]), parseInt(lineInfo[3])));
					} else {
						returnArray.push(new TimeSignature(lineInfo[0], parseInt(lineInfo[2]), 4));
					}
					break;
				}
				case "B": { // bpm tag
					returnArray.push(new BPM(lineInfo[0], parseInt(lineInfo[2])));
					break;
				}
				case "E": { // event tag
					lineInfo[2] = lineInfo[2].replace(/[^\w\s]/g, "");

					switch (lineInfo[2].toLowerCase()) {
						case "solo": { // solo event tag
							returnArray.push(new SoloEvent(lineInfo[0]));
							break;
						}
						case "soloend": { // solo end event tag
							returnArray.push(new SoloEndEvent(lineInfo[0]));
							break;
						}
						case "section": { // section even tag
							returnArray.push(new SectionEvent(lineInfo[0], lineInfo.slice(3, lineInfo.length).join(" ")));
							break;
						}
						case "lyric": { // lyric event tag
							returnArray.push(new LyricEvent(lineInfo[0], lineInfo.slice(3, lineInfo.length).join(" ")));
							break;
						}
						case "phrase_start": { // phrase start event tag
							returnArray.push(new PhraseStartEvent(lineInfo[0]));
							break;
						}
						case "phrase_end": { // phrase end event tag
							returnArray.push(new PhraseEndEvent(lineInfo[0]));
							break;
						}
						case "default": { // default event tag
							returnArray.push(new BaseEvent(lineInfo[0], "default", false))
							break;
						}
						default: { // log other evnets
							console.log("Some other event: " + lineInfo);
							break;
						}
					}

					break;
				}
				default: { // log other stuff found
					console.log("other stuff: " + lineInfo);
				}
			}
		}
	}

	if (noteCountSingular != 0 && noteCountStuff != 0) {
		console.log("Note Count complete: " + noteCountSingular + ", total: " + noteCountStuff);
	}

	return returnArray;
}

module.exports = {readChart, getSongInfo, getSyncInfo, getEventInfo, getDiffsInfo}
