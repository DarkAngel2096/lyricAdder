// module requires
//const fs = require("fs");

// HTML element variables
let HTMLMidiFile = document.getElementById("midiFilePathInput");

var HTMLLyricInput = document.getElementById("lyricsInputArea");

var HTMLChartInfoDiv = document.getElementById("chartAndPhraseInfo");
var HTMLChartName = document.getElementById("chartName");
var HTMLPhraseCount = document.getElementById("phraseCount");
var HTMLLyricEventCount = document.getElementById("lyricEventCount");
var HTMLSyllableCount = document.getElementById("syllableCount");
var HTMLPhraseDiv = document.getElementById("phraseDiv");

var HTMLNoChartFile = document.getElementById("noChartFile");
var HTMLNoLyricsWritten = document.getElementById("noLyrcisWritten");

var HTMLErrorDiv = document.getElementById("problemCauses");
var HTMLErrorMessage = document.getElementById("cautionMessage");

var HTMLWriteButton = document.getElementById("writeMidiButton");

// global variables
let midiPath;
let midiHex;

// global variable for the split up lyrics array
let globalSeparatedLyrics;


// header chunk prefix
let headerPrefixHex = Buffer.from([0x4d, 0x54, 0x68, 0x64]);
// track chunk prefix
let trackPrefixHex = Buffer.from([0x4d, 0x54, 0x72, 0x6b]);

// global hex header chunk data store
let hexHeaderChunkData;
// global "decoded" header chunk
let headerChunkData = {};


// global track chunk data store array
let hexTrackChunkDataArr = [];

// global track number for the vocal track
let lyricTrackNumber;
// global variable for the decoded lyrics track
let decodedLyricksTrack;

// variable for last modified time
let lastModifiedMIDIFile = 0;


// functions
function midiParse() {
	console.log("midi stuffs called");

	// get the file path
	midiPath = HTMLMidiFile.files[0].path;

	if (lastModifiedMIDIFile != fs.statSync(midiPath).mtimeMs) {
		console.log("Reading the file since modified time isn't the same");
		lastModifiedMIDIFile = fs.statSync(midiPath).mtimeMs;

		// read the file
		midiHex = fs.readFileSync(midiPath);

		//console.log("Whole hex");
		//console.log(midiHex);


		// split the file with leaving the prefix chunks in
		chunkGathering();

		//console.log("header");
		//console.log(hexHeaderChunkData);

		//console.log("tracks");
		//console.log(hexTrackChunkDataArr);


		// deconde the header chunk doesn't matter, no need for it

		// find and decode the vocal track only
		let decodedTrack;

		for (let i = 0; i < hexTrackChunkDataArr.length; i++) {
			//console.log("Starting to work on Track: " + i);
			//console.log(hexTrackChunkDataArr[i]);


			decodedTrack = [];

			let currentTrack = hexTrackChunkDataArr[i];

			// index for counting through the track chunk
			let index = 8;

			// running status variable
			let runningStatus = {};

			// variable for the current event
			let currentEventDecoded;

			let totalTicks = 0;

			while (index < currentTrack.length) {

				// start of a new event
				currentEventDecoded = {};

				// get the variable length delta time but put it in a temp variable because of the byte count
				let tempVariableLength = getVariableLength(currentTrack.slice(index, index + 4));
				// add the used bytes to index and the value to currentEventDecoded
				index += tempVariableLength.count;

				//console.log("moving on: " + tempVariableLength.count);
				currentEventDecoded.deltaTime = tempVariableLength.value;

				totalTicks += tempVariableLength.value;
				currentEventDecoded.totalDeltaTime = totalTicks;


				// figure out the event type and throw that in a switch (different event have different kinds of data and length)
				// temp variable for the object returned, also after getting the tempEvent variable add 1 to index
				let tempEvent = getEvent(currentTrack.slice(index, index + 2), runningStatus);

				if (!tempEvent.running) {
					index++;
				}
				//console.log("moving on one more at event main type, at: " + index);

				switch (tempEvent.type) {
					case "Meta": { // always starting with 0xFF tho the rest can have different lengths
						// set the current event data stuff
						currentEventDecoded.type = tempEvent.type;
						currentEventDecoded.metaType = tempEvent.metaString;
						currentEventDecoded.metaValue = tempEvent.metaValue;

						//console.log(tempEvent.metaString);

						// add another to index because of the meta event check done
						index++;
						//console.log("moving on one more at meta type, at: " + index);

						// then do tests with the meta events to figure out what it is
						// only meta event with variable length is sequencer specific, do differently with that
						if (currentEventDecoded.metaType == "Sequencer specific") {

						} else { // otherwise just get the length of the data for that meta event and slice that out to another function to read
							let length = currentTrack[index];
							let metaEventData = getMetaEventData(currentEventDecoded.metaType, currentEventDecoded.metaValue, currentTrack.slice(index + 1, index + 1 + length));

							//console.log(length);
							//console.log(metaEventData);

							// set the meta data gathered
							currentEventDecoded.metaData = metaEventData;

							// add the length of the stuff to the index
							index += length + 1;
						}

						runningStatus = {};
						break;
					}
					case "Note": { // always 2 bytes afterwards, unless running status which changes things slightly
						// set running status for next parts
						if (tempEvent.running) delete tempEvent.running;
						runningStatus = tempEvent;

						// set the type of the current event
						currentEventDecoded.type = tempEvent.type;
						//console.log(tempEvent.string);

						// get the note event data
						let noteEventData = getNoteEventData(tempEvent.string, currentTrack.slice(index, index + 2));
						//console.log(noteEventData);

						// add the data to the current decoded event and add 2 to the index as there is only two params
						currentEventDecoded.noteData = noteEventData;
						index += 2;
						break;
					}
					case "SysEx": {
						// add the type to the current event
						currentEventDecoded.type = tempEvent.type;
						//console.log(tempEvent.string + ", " + index);

						// length of sysex byte
						let variableLength = getVariableLength(currentTrack.slice(index, index + 4));
						index += variableLength.count;

						// just slice the data now and add that as hex to the curren event
						currentEventDecoded.SysExData = currentTrack.slice(index, index + variableLength.value);
						index += variableLength.value
						//console.log(currentEventDecoded.SysExData);

						if (currentTrack[index - 1] != 0xF7) console.log("not 0xF7 ending to sysex data bytes");

						runningStatus = {};
						break;
					}
					// default just to throw a tantrum if something happens
					default: console.log("Something else: " + tempEvent.string + ", Track: " + currentTrack[index]); break;
				}

				// add the event to an array of this tracks decoded stuff
				decodedTrack.push(currentEventDecoded);
			}

			// add the lyric track number to the global variable, and add the decoded track to the global lyric track
			if (decodedTrack[0].metaData.values.text == "PART VOCALS") {
				console.log("lyrics track found! " + i);

				lyricTrackNumber = i;
				decodedLyricksTrack = decodedTrack;
			}
		}

		// check if any lyrics were found
		if (decodedLyricksTrack == null) {
			console.log("Well, no lyrics in the chart...");
		} else {
			// function call to get syllable and phrase separated lyircs
			globalSeparatedLyrics = separateLyrics();
		}

		console.log(globalSeparatedLyrics);

		// change the HTML stuffs
		HTMLChartName.innerHTML = HTMLMIDIFilePath.files[0].path.split("\\")[HTMLMIDIFilePath.files[0].path.split("\\").length - 2]
		HTMLChartInfoDiv.style.display = "block";
		HTMLPhraseDiv.style.display = "none";
		HTMLWriteButton.style.display = "block";
	} else {
		console.log("Times match, no need to read and parse the file");
	}


	// calculations on the amount of phrases, lyric events and syllables in the input area
	let totalPhrases = 0;
	let totalLyrics = 0;
	let totalInputSyllables = 0;

	totalPhrases = globalSeparatedLyrics.length;

	for (let phrases of globalSeparatedLyrics) {
		totalLyrics += phrases.events.length;
	}

	totalInputSyllables = readLyricInput();


	// then update the UI
	HTMLPhraseCount.innerHTML = totalPhrases + " phrases found";
	HTMLLyricEventCount.innerHTML = totalLyrics + " lyric events found";
	HTMLSyllableCount.innerHTML = totalInputSyllables + " syllables found";

	// and test if the events and syllables match up
	testLyricEventsAndSyllables();

}

// Reading the lyric textarea and creating an array with each row being it's own phrase and splitting syllables after that (2D array)
// Return count of syllables
function readLyricInput() {
	let lyricsInputFull = HTMLLyricInput.value.trim().split("\n");
	lyricsInputArray = [];


	// 	loop through the whole input array
	for (var i = 0; i < lyricsInputFull.length; i++) {
		// if a phrase isn't empty
		if (lyricsInputFull[i] != "") {

			// create a temp array
			var tempArr = [];
			// get a line from the input area, replace - and = to have a space after, then split at spaces for syllables
			var tempPhrase = lyricsInputFull[i].replace(/-/g, "- ").replace(/=/g, "= ").trim().split(" ");

			// loop through the phrase, and if any part of the phrase is empty, only has a syllable separator do nothing
			for (var j = 0; j < tempPhrase.length; j++) {
				if (tempPhrase[j] != "" && tempPhrase[j] != "-" && tempPhrase[j] != "=") {
					tempArr.push(tempPhrase[j]);
				}
			}
			// push things to the lyricsInputArray array
			lyricsInputArray.push(tempArr)
		}
	}

	// quick syllable count
	var syllableCount = 0;

	for (var i = 0; i < lyricsInputArray.length; i++) {
		syllableCount += lyricsInputArray[i].length;
	}

	// which gets returned
	return syllableCount;
}

// Test if the syllable array length and lyric event array lengths are the same
// Return a string of each phrase and it's event / syllable count
function testLyricEventsAndSyllables() {

	// remove all elements if there are any in the phrase div
	while (HTMLPhraseDiv.firstChild) {
		HTMLPhraseDiv.removeChild(HTMLPhraseDiv.firstChild);
	}

	// variable for the next part
	var morePhrases = 0;

	// define which has more phrases, either one with more takes the lead
	if (lyricsInputArray.length <= globalSeparatedLyrics.length) {
		morePhrases = globalSeparatedLyrics.length;
	} else {
		morePhrases = lyricsInputArray.length;
	}

	// line numbering with syllable and event count
	const lines = new Array(morePhrases).fill(0).map((_, i) => ({
		index: i+1,
		nbWordsChart: (((globalSeparatedLyrics[i] == undefined) ? false : globalSeparatedLyrics[i].events )  || []).length,
		nbWordsLyrics: (lyricsInputArray[i] || []).length
	}));

	// Update the textarea line highlight indicator
	global.updateLinedTextArea({
		selectedLines: lines
			.filter(({
				nbWordsLyrics, nbWordsChart
			}) => nbWordsLyrics != nbWordsChart)
			.map(({ index }) => index)
	});

	// Update the textarea status side container
	const textAreaLines = document.getElementById("lyricsInputArea").value.trim().split("\n");
	let lyricStatus = "";
	let lyricStatusIndex = 0;
	for (line of textAreaLines) {
		if (line) {
			const { nbWordsLyrics, nbWordsChart } = lines[lyricStatusIndex];
			lyricStatus += `${nbWordsLyrics}/${nbWordsChart}`;
			lyricStatusIndex++;
		}
		lyricStatus += "\n";
	}
	for (let i = lyricStatusIndex; i < lines.length; i++) {
		const { nbWordsChart } = lines[i];
		lyricStatus += `-/${nbWordsChart}\n`;
	}
	document.getElementById("lyrics-status").innerHTML = lyricStatus;
	document.getElementById("lyrics-status").scrollTop = document.getElementById("lyricsInputArea").scrollTop;

	// the show phrase button
	for (var i = 0; i < morePhrases; i++) {
		var newSpan = document.createElement("span");

		if (i >= lyricsInputArray.length) {
			newSpan.innerHTML += "{" + (i + 1) + ", " + globalSeparatedLyrics[i].events.length + "-0}";

			newSpan.setAttribute("class", "incorrect");
			//newSpan.style.color = "red";
		} else if (i >= globalSeparatedLyrics.length) {
			newSpan.innerHTML += "{" + (i + 1) + ", 0-" + lyricsInputArray.length + "}";

			newSpan.setAttribute("class", "incorrect");
			//newSpan.style.color = "red";
		} else {
			newSpan.innerHTML += "{" + (i + 1) + ", " + globalSeparatedLyrics[i].events.length + "-" + lyricsInputArray[i].length + "}";

			if (globalSeparatedLyrics[i].events.length == lyricsInputArray[i].length) {
				newSpan.setAttribute("class", "correct");
				//newSpan.style.color = "green";
			} else {
				newSpan.setAttribute("class", "incorrect");
				//newSpan.style.color = "red";
			}
		}

		// split the span elements more cleanly
		if (i % 10 == 9 && i != 0) {
			newSpan.innerHTML += "<br/>"
		} else {
			newSpan.innerHTML += ", "
		}

		HTMLPhraseDiv.appendChild(newSpan);
	}
}

// function to write the new midi file
function writeMidiFile() {

	// start the writing process with writing the backup file, if this fails, then don't go forward
	console.log("Starting to write the new file");
	if (!writeBackupFile()) {
		console.log("Backup file writing failed, not overwriting original");
		return;
	}
	console.log("Backup written successfully");

	// test if the lyric buffer writing wokrs out to be good, if not, don't move forwards
	let lyricsBuffer = writeLyricsBuffer();

	if (lyricsBuffer == null) {
		console.log("File Writing failed.");
		return;
	}
	console.log("Input field put in events ");

	// add the newly change lyric buffer to overwrite the old one that was read from the file
	hexTrackChunkDataArr[lyricTrackNumber] = lyricsBuffer;

	let outputBuffer = Buffer.concat([hexHeaderChunkData, Buffer.concat(hexTrackChunkDataArr)]);

	let path = midiPath.split("\\").slice(0, midiPath.split("\\").length -1).join("\\");

	fs.writeFileSync(path + "\\lyricAdderOutput.mid", outputBuffer,  null, function (err) {
		if (err) {
			console.log("Problems with writing the modified file: " + err);
			customErrorMessage(true, "error" ,"Problems writing the updated midi file, (check console) and let DarkAngel2096 know!");
			return false;
		}
	});
	console.log("Output file written.");
}

// write the backup file, if it fails, return false and cascade that back
function writeBackupFile() {

	// get the file parth from the folder name, removing special characters
	let backupFileName = HTMLMIDIFilePath.files[0].path.split("\\")[HTMLMIDIFilePath.files[0].path.split("\\").length - 2].replace(/ /g, "").replace(/[^\w\s]/g, "") + "_backup.mid"

	// write the file
	fs.writeFileSync(config.pathToBackupFolder + "/" + backupFileName, fs.readFileSync(midiPath), null, function (err) {
		if (err) {
			console.log("Problems with writing the chart backup: " + err);
			customErrorMessage(true, "error" ,"Problems writing the backup of the original chart, stopping the process (check console) and let DarkAngel2096 know!");
			return false;
		}
	});

	// if everthing works, return true
	return true;
}


// function to write the global lyrics events into a buffer
function writeLyricsBuffer() {
	// will overwrite the internal variable of parsed lyrics stuff
	if (writeInputToLyrics()) {
		console.log("return null");
		return null;
	}

	console.log("Writing lyrics buffer");
	console.log(globalSeparatedLyrics);

	let returnBuffer;

	// prefix for tracks is always MTrk + 4 bytes for the total length of the track (not including the 8 prefix bytes)
	let prefixBuffer = trackPrefixHex;
	let prefixTrackLength = Buffer.from([0x00, 0x00, 0x00, 0x00]); // will change this one later

	// first thing in the track is the name for the track with a meta track name event at delta time of 0
	// byte 0 = delta time, byte 1 = meta trigger, byte 2 = meta type, byte 4 = length of data, byte 5-> data (in this case PART VOCALS)
	let trackNameBuffer = Buffer.from([0x00, 0xFF, 0x03, 0x0B, 0x50, 0x41, 0x52, 0x54, 0x20, 0x56, 0x4F, 0x43, 0x41, 0x4c, 0x53]);

	// variable for the events
	let trackBuffer = trackNameBuffer;

	// variable to have the current tick stored to be able to get the delta time easily
	let currentTick = 0;

	// variable to keep track of running status
	let lastEvent = "";

	// loop through all the events
	for (let phrase of globalSeparatedLyrics) {
		// a variable for all the buffers in this phrase
		let phraseBuffer;

		// phrase start event comes first in each phrase
		let phraseStart = createNoteBytes(phrase.start - currentTick, 105, "On", lastEvent);

		// update the currentTick and lastEvent variables
		currentTick += phraseStart.ticks;
		lastEvent = phraseStart.event;
		// and start the phraseBuffer variable all later iterations will concat to this buffer
		phraseBuffer = phraseStart.buffer;

		// now to loop through the events in the phrase itself
		for (let phraseLyric of phrase.events) {
			// create a buffer for the lyric event
			let lyricEvent = createLyricBytes(phraseLyric.tick - currentTick, phraseLyric.text);

			// these also update the currentTick and lastEvent values
			currentTick += lyricEvent.ticks;
			lastEvent = lyricEvent.event;

			// get the possible pitch note events for the lyric event and create buffers for those
			for (let pitchEvent of phraseLyric.pitches) {

				// start event
				let pitchStartNote = createNoteBytes(pitchNote.startTick - currentTick, pitchNote.pitch, "On", lastEvent);

				// these also update the currentTick and lastEvent values
				currentTick += pitchStartNote.ticks;
				lastEvent = pitchStartNote.event;

				// end event
				let pitchEndNote = createNoteBytes(pitchNote.endtick - currentTick, pitchNote.pitch, "On", lastEvent);

				// these also update the currentTick and lastEvent values
				currentTick += pitchEndNote.ticks;
				lastEvent = pitchEndNote.event;

				// add these to the lyricEvent.buffer value which gets updated soon to the phrase buffer
				lyricEvent.buffer = Buffer.concat([lyricEvent.buffer, pitchStartNote, pitchEndNote]);
			}

			// add the lyricEvent buffer now to the phrase buffer
			phraseBuffer = Buffer.concat([phraseBuffer, lyricEvent.buffer]);
		}

		// phrase end comes last in each phrase
		let phraseEnd = createNoteBytes(phrase.end - currentTick, 105, "Off", lastEvent);

		// again update the variable
		currentTick += phraseEnd.ticks;
		lastEvent = phraseEnd.event;
		// the phrase end buffer gets concatted onto the complete buffer
		phraseBuffer = Buffer.concat([phraseBuffer, phraseEnd.buffer]);

		// and as this is the last event in a phrase, add this to the complete track buffer with a concat
		trackBuffer = Buffer.concat([trackBuffer, phraseBuffer]);

		//console.log(phraseBuffer);
	}
	// after everything is done, then throw in an End Of File event as the last one, 0 delta time away
	trackBuffer = Buffer.concat([trackBuffer, Buffer.from([0x00, 0xFF, 0x2F, 0x00])]);


	//console.log(trackBuffer);

	// the last thing to do is to add the prefix bytes to the track, and then building the track will be done
	let prefixBytes = Buffer.concat([trackPrefixHex, Buffer.from(trackBuffer.length.toString(16).padStart(8, "0"), "hex")])
	returnBuffer = Buffer.concat([prefixBytes, trackBuffer]);

	return returnBuffer;
}

// function to write phrase start and end bytes
function createNoteBytes(deltaTimeTick, noteValue, OnOff, lastEvent) {

	// get the variable length value
	let deltaTimeBuffer = createVariableLengthHex(deltaTimeTick);

	// array with event bytes to make a buffer from later
	let createBuffer = [];

	// check for running status and add the noteOn byte only if needed
	if (lastEvent != "note on") {
		console.log("note on byte added: " + lastEvent);
		createBuffer.push(144);
	}

	// noteValue is given on the function call
	createBuffer.push(noteValue);

	// depending on the OnOff value either 100 or 0
	switch (OnOff) {
		case "On": createBuffer.push(100); break;
		case "Off": createBuffer.push(0); break;
	}

	// return an object with the data
	return {
		ticks: deltaTimeTick,
		event: "note on",
		buffer: Buffer.concat([deltaTimeBuffer, Buffer.from(createBuffer)])
	};
}

// function to build lyricEvents (going to change this to build any type of meta event probably later on)
function createLyricBytes(deltaTimeTick, text) {

	// get the variable length value
	let deltaTimeBuffer = createVariableLengthHex(deltaTimeTick);

	// array with event bytes to make a buffer from later
	let createBuffer = [];

	// lyric events are meta events, meta event trigger is 0xFF or 255 (decimal)
	createBuffer.push(255);

	// lyric events again have the trigger byte 0x05 or 5(decimal)
	createBuffer.push(5);

	// after this comes the length of the string
	createBuffer.push(text.length);

	// and last but not least is the text string itself
	let textBuffer = Buffer.from(text, "utf8");

	// concat all this and throw the return value back
	return {
		ticks: deltaTimeTick,
		event: "lyric",
		buffer: Buffer.concat([deltaTimeBuffer, Buffer.from(createBuffer), textBuffer])
	};
}

// function to create variable length hex bytes from a decimal number input
function createVariableLengthHex(inputNum) {
	//console.log(inputNum);

	// quick check if the input was actually a number, if not
	if (isNaN(inputNum)) {
		console.log("Input number invalid, can't create events");
		return null;
	} else {

		// variable for the binary number
		let binaryNum = inputNum.toString(2);
		//console.log(binaryNum);
		//console.log(binaryNum.length);

		// iterator to know how many bits has been looked at
		let iterator = 0;

		// variable for a array of bytes
		let binaryBytes = []

		// loop through splitting the binary number into parts as long as it's longer than 7 bits
		do {
			//console.log("splitting");
			// split out 7 bytes from the binary number
			binaryBytes.unshift(binaryNum.slice(-iterator - 7, binaryNum.length - iterator).padStart(7, "0"));

			// add 7 for the bits to the iterator
			iterator += 7;
		} while (binaryNum.length > iterator);

		//console.log(binaryBytes);

		// loop through what we have split up, only the last value gets a 0 to it, the rest get a 1, then build a buffer of it to return
		for (let i = 0; i < binaryBytes.length; i++) {

			// test if we are working on the last byte
			if (i == binaryBytes.length - 1) {

				// if so, add a 0 to it, map the array to have hex values with 2 hex bits each and join that to a single string that gets used by Buffer.from()
				binaryBytes[i] = "0" + binaryBytes[i];
				//console.log(binaryBytes.join(" "));

				let tempArr = binaryBytes.map(value => parseInt(value, 2).toString(16).padStart(2, "0")).join("");
				//console.log(tempArr);

				return Buffer.from(tempArr, "hex");
			} else {

				// not the last byte so just add a 1 to the start since the next byte is part of the value
				binaryBytes[i] = "1" + binaryBytes[i];
			}
		}
	}
}

// function that takes the data from the input field and places it in the syllables
function writeInputToLyrics() {

	// read from the input to make sure everything is up to date
	readLyricInput();

	// only write things down if the lyric events match up
	let shouldFail = false;

	// check if there is phrases in the chart and in the lyrics area
	if (globalSeparatedLyrics.length == 0 || lyricsInputArray.length == 0) {
		console.log("No lyrics in the chart or text area");
		shouldFail = true;
	} else {
		// test for phrase count
		if (globalSeparatedLyrics.length != lyricsInputArray.length) {
			console.log("Different amount of phrases");
			shouldFail = true;
		}

		// test for lyric - syllable count
		for (let i = 0; i < globalSeparatedLyrics.length; i++) {
			if (globalSeparatedLyrics[i].events.length != lyricsInputArray[i].length) {
				console.log("Different amount of syllables to lyric events in phrase: " + i);
				shouldFail = true;
			}
		}
	}

	// just return if anything problematic was found, and throw a message
	if (shouldFail) {
		console.log("File writing failed.");
		return true;
	}

	// look through the lyrics events and place things in their correct places
	for (let i = 0; i < globalSeparatedLyrics.length; i++) {
		for (let j = 0; j < globalSeparatedLyrics[i].events.length; j++) {

			// if the syllable should be pitchless add a # to it
			if (globalSeparatedLyrics[i].events[j].pitchless) {
				globalSeparatedLyrics[i].events[j].text = lyricsInputArray[i][j] + "#";
			} else {
				globalSeparatedLyrics[i].events[j].text = lyricsInputArray[i][j];
			}
		}
	}

	return false;
}

// function to put the lyrics into the text box from a midi file
function getLyricsFromMIDIButton() {

	let lyrics = "";

/*	for (let i = 0; i < globalSeparatedLyrics.length; i++) {
		for (let j = 0; j < globalSeparatedLyrics[i].events.length; j++) {
			if (globalSeparatedLyrics[i].events[j].text.includes("-") || globalSeparatedLyrics[i].events[j].text.includes("=")) {
				lyrics += globalSeparatedLyrics[i].events[j].text
			} else {
				if ()
			}
		}
	}*/

	for (let phrase of globalSeparatedLyrics) {
		for (let syllable of phrase.events) {
			if (syllable.text.includes("-") || syllable.text.includes("=")) {
				lyrics += syllable.text;
			} else {
				lyrics += syllable.text + " ";
			}
		}
		lyrics = lyrics.trim();
		lyrics += "\n"
	}

	HTMLLyricInput.value = lyrics;
}

// function to split up the lyrics from the parsed data into a two dimensional array
function separateLyrics() {

	// complete lyrics Array
	let completeLyrics = [];

	// current phrase array
	let currentPhrase;

	// pitch object
	let pitchNote;

	// loop through the whole lyrics track
	for (let currentEvent of decodedLyricksTrack) {
		//console.log(currentEvent);

		// look at which type of event we have
		switch (currentEvent.type) {
			// note events are 105 for phrase (start or end), anything between 34 and 84 is pitches, tho usually there is no pitch
			case "Note": {
				if (currentEvent.noteData.values.param1 == 105) { 		// phrase event
					if (currentEvent.noteData.values.param2 == 0) {		// end
						//console.log("Phrase end event found at: " + currentEvent.totalDeltaTime);
						//console.log(currentPhrase);
						currentPhrase.end = currentEvent.totalDeltaTime;

						completeLyrics.push(currentPhrase);
					} else {	// anything else that velocity 0 on a 105 event is an on event
						//console.log("Phrase start event found at: " + currentEvent.totalDeltaTime);
						currentPhrase = {
							start: currentEvent.totalDeltaTime,
							events: [],
							end: 0
						};
					}
				} else if (currentEvent.noteData.values.param1 >= 34 && currentEvent.noteData.values.param1 <= 84) {	// pitch event
					if (currentEvent.noteData.values.param2 == 0) {		// end event
						//console.log("pitch end event");
						// if the pitch event matches then end the event and add it to an array for the lyric object
						if (pitchNote.pitch == currentEvent.noteData.values.param1) {
							pitchNote.endTick = currentEvent.totalDeltaTime;

							//console.log(currentPhrase);
							//console.log(currentPhrase.events);

							currentPhrase.events[currentPhrase.events.length - 1].pitches.push(pitchNote);	// add this to the last lyric event in the current phrase
						}
					} else {	// on event
						//console.log("pitch start event");
						pitchNote = {
							pitch: currentEvent.noteData.values.param1,
							startTick: currentEvent.totalDeltaTime,
							endTick: 0
						};
					}
				}
				// just break at the end
				break;
			}
			case "Meta": {
				if (currentEvent.metaType == "Lyrics") {		// lyrics meta event found
					//console.log("lyric event found at " + currentEvent.totalDeltaTime);

					let lyricsObject = {
						text: "",
						tick: 0,
						pitchless: false,
						pitches: []
					}

					// the event is a non pitched lyric event
					if (currentEvent.metaData.values.text.includes("#") || currentEvent.metaData.values.text.includes("^")) {
						lyricsObject.pitchless = true;
					} else {		// otherwise it has a pitch, hence change pitchless to false
						lyricsObject.pitchless = false;
					}

					lyricsObject.text = currentEvent.metaData.values.text.replace(/#/g, "").replace(/^/g, "");
					lyricsObject.tick = currentEvent.totalDeltaTime;

					currentPhrase.events.push(lyricsObject);
				} else {
					//console.log("other meta event:");
					//console.log(currentEvent);
				}
			}
		}
	}

	return completeLyrics;
}

// function to parse out note data
function getNoteEventData(type, inputHexArr) {
	let values = {
		param1: inputHexArr[0],
		param2: inputHexArr[1]
	}

	return {
		type: type,
		values: values
	}
}

// function to figure out meta events
function getMetaEventData(eventType, eventMetaValue, inputHexArr) {
	//console.log(eventType);
	//console.log(eventMetaValue);
	//console.log(inputHexArr);

	// an object for all values any given event type has
	let values = {};

	switch (eventMetaValue) {
		case 0x00: {
			values.num1 = inputHexArr[0];
			values.num2 = inputHexArr[1];
			break;
		}
		case 0x01:
		case 0x02:
		case 0x03:
		case 0x04:
		case 0x05:
		case 0x06:
		case 0x07: { // all are text events so the parsing is the same for all of them
			let tempString = "";
			inputHexArr.map(value => tempString += String.fromCharCode(value));
			values.text = tempString;
			break;
		}
		case 0x20: {
			values.channel = inputHexArr[0];
			break;
		}
		case 0x2F: break; // the end of track event doesn't have data, nothing to do then
		case 0x51: {
			let microsecondsPerMinute = 60000000;
			values.mpqn = parseInt(inputHexArr.toString("hex"), 16);
			values.bpm = microsecondsPerMinute / values.mpqn;
			break;
		}
		case 0x54: break; // going to work on this later on... SMPTE offset which probably never is used for CH stuff
		case 0x58: {
			values.numerator = inputHexArr[0];
			values.denominator = Math.pow(2, inputHexArr[1]);
			values.mertoPulse = inputHexArr[2];
			values.nds = inputHexArr[3];
			break;
		}
		case 0x59: {
			values.key = inputHexArr[0];
			values.scale = inputHexArr[1];
			break;
		}
		case 0x7F: {
			inputHexArr.map(value => values.text += String.fromCharCode(value));
			values.hex = inputHexArr;
			values.number = parseInt(inputHexArr.toString("hex"), 16);
			break;
		}
		default: console.log("odd stuffs");
	}

	return {
		type: eventType,
		values: values
	}
}

// function to figure out what event we have
function getEvent(inputHexArr, running) {
	// variable for note events
	let eventPrefix = [
		{ value: 0xFF, type: "Meta" , string: "Meta" },
		{ value: 0xF7, type: "SysEx" , string: "SysEx" }, // this
		{ value: 0xF0, type: "SysEx" , string: "SysEx" }, // and this is slightly different, but SysEx events in CH? not too likely
		{ value: 0xE0, type: "Note" , string: "Pitch Bend" },
		{ value: 0xD0, type: "Note" , string: "Channel Aftertouch" },
		{ value: 0xC0, type: "Note" , string: "Program Change" },
		{ value: 0xB0, type: "Note" , string: "Controller" },
		{ value: 0xA0, type: "Note" , string: "Note Aftertouch" },
		{ value: 0x90, type: "Note" , string: "Note On" },
		{ value: 0x80, type: "Note" , string: "Note Off" }
	];

	// meta events
	let metaEvents = [
		{ metaValue: 0x00, metaString: "Sequence Number" },
		{ metaValue: 0x01, metaString: "Text Event" },
		{ metaValue: 0x02, metaString: "Copyright Notice" },
		{ metaValue: 0x03, metaString: "Sequence / Track Name" },
		{ metaValue: 0x04, metaString: "Instrument Name" },
		{ metaValue: 0x05, metaString: "Lyrics" },
		{ metaValue: 0x06, metaString: "Marker" },
		{ metaValue: 0x07, metaString: "Cue Point" },
		{ metaValue: 0x20, metaString: "MIDI Channel Prefix" },
		{ metaValue: 0x2F, metaString: "End Of Track" },
		{ metaValue: 0x51, metaString: "Set Tempo" },
		{ metaValue: 0x54, metaString: "SMPTE Offset" },
		{ metaValue: 0x58, metaString: "Time Signature" },
		{ metaValue: 0x59, metaString: "Key Signature" },
		{ metaValue: 0x7F, metaString: "Sequencer specific" }
	];

	//console.log("event check:");
	//console.log(inputHexArr);

	// loop through the eventPrefix variable trying to find a match for the input byte, if found return prefix
	for (let prefix of eventPrefix) {
		// main event type
		if (inputHexArr[0] >= prefix.value) {
			// if it's a meta event check which kind of meta event it is
			if (inputHexArr[0] == 0xFF) {
				for (let metaPrefix of metaEvents) {
					if (inputHexArr[1] == metaPrefix.metaValue) {
						prefix.metaString = metaPrefix.metaString;
						prefix.metaValue = metaPrefix.metaValue;
					}
				}
			}

			// note events have to have the byte after the main byte below 0x80 (NOT equal to)
			if (inputHexArr[1] < 0x80) {
				return prefix;
			}
		}
	}

	// check if the input hex could be fitting to be a running status
	if (inputHexArr[0] < 0x80 && running != {}) {
		//console.log("running status found: ");
		//console.log(running);
		running.running = true;
		return running;
	}

	// otherwise return an object which says nothing found basically
	return {type: "Nothing", string: "Running Status?", input: inputHexArr};
}

// function to read and return the variable length value from the max 4 hex bytes to base10
function getVariableLength(inputHexArr) {
	let completeBinary = "";	// used to get the complete binary value to be parsed at the return
	let byteCount = 0;			// how many bytes was the variable-length value consisting of

	// loop through the whole inputHexArr
	for (let i = 0; i < inputHexArr.length; i++) {
		let currentBinary = inputHexArr[i].toString(2).padStart(8, 0);
		byteCount++;

		completeBinary += currentBinary.slice(1);	// always add the 7 bits to the complete binary

		if (currentBinary.slice(0, 1) == 0) {	// if the first bit of the byte is a 0 then we are on the last byte for the length value, return
			return {
				count: byteCount,
				value: parseInt(completeBinary, 2)
			}
		}
	}
}

// function for chunk data gathering
function chunkGathering () {
	// index is just the position we are in the file
	let index = 0;
	while (index < midiHex.length) {
		// read through the prefix and get the type of chunk and the size of it
		let chunkPrefixData = checkChunk(midiHex.slice(index, index + 8));

		// add 8 to the index as the prefix is not counted in the size of the chunk
		index += 8;

		// switch statement for the different chunk types
		switch (chunkPrefixData.type) {
			case "header": {
				console.log("Header chunk prefix starting at: " + (index - 8) + ", and chunk itself at: " + index + ", with a length of: " + chunkPrefixData.size);
				hexHeaderChunkData = midiHex.slice(index - 8, index + chunkPrefixData.size);
				break;
			}
			case "track": {
				console.log("Track chunk prefix starting at: " + (index - 8) + ", and chunk itself at: " + index + ", with a length of: " + chunkPrefixData.size);
				hexTrackChunkDataArr.push(midiHex.slice(index - 8, index + chunkPrefixData.size));
				break;
			}
			default: {
				console.log("Other chunk prefix starting at: " + (index - 8) + ", and chunk itself at: " + index + ", with a length of: " + chunkPrefixData.size);
				hexOtherChunkDataArr.push(midiHex.slice(index - 8, index + chunkPrefixData.size));
				break;
			}
		}

		// add the chunk size to the index for the next loop
		index += chunkPrefixData.size;
	}
}

// function to check which kind and how long the chunk is that was found
function checkChunk (chunkPrefix) {
	let returnChunkData = {
		type: "",
		size: 0
	}

	// the first 4 bytes are the ID of the chunk
	// header chunk prefix found
	if (chunkPrefix.slice(0, 4).toString() == headerPrefixHex.toString()) {
		returnChunkData.type = "header";
	}

	// track chunk prefix found
	if (chunkPrefix.slice(0, 4).toString() == trackPrefixHex.toString()) {
		returnChunkData.type = "track";
	}

	// the last 4 bytes are for the size of the chunk coming up
	// get the size of the chunk
	returnChunkData.size = parseInt(chunkPrefix.slice(4, 8).toString("hex"), 16);

	return returnChunkData;
}
