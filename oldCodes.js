





// not working
/*
lineInfo[2] = parseInt(lineInfo[2]);

console.log("Note Found: " + lineInfo);
noteCount++;

if (lineInfo[0] == chordTick) {
	// if the line has the same tick as the one before
	//console.log("chord found: " + lineInfo + ", tick: " + chordTick);

	chordArray.push(lineInfo);
} else {
	// if not, go through what's found and make objects, also add the first one to the list
	for (let j = 0; j < 2; j++) {
		for (let k = 0; k < chordArray.length; k++) {
			switch (j) {
				case 1: {
					switch (chordArray[k][2]) {
						case 5: toForce = true; break;
						case 6: toTap = true; break;
						case 0:
						case 1:
						case 2:
						case 3:
						case 4:
						case 7:
						case 8: {
							numberOfNotes++;
						}
					}
					break;
				}
				case 2: {
					switch (chordArray[k][2]) {
						case 0:
						case 1:
						case 2:
						case 3:
						case 4:
						case 7:
						case 8: {
							if (numberOfNotes > 1) {
								returnArray.push(new Note(lineInfo[0], lineInfo[2], toForce, toTap, true, parseInt(lineInfo[3])))
							} else {
								returnArray.push(new Note(lineInfo[0], lineInfo[2], toForce, toTap, false, parseInt(lineInfo[3])))
							}
							break;
						}
					}
					break;
				}
			}
		}
	}

	chordArray = [];
	chordArray.push(lineInfo);
	chordTick = lineInfo[0];
	numberOfNotes = 0;
}*/


		// not working either...
/*					lineInfo[2] = parseInt(lineInfo[2]);

// check if it's part of a bunch of events with the same tick (also taking taps and forces)
if (lineInfo[0] == chordTick) {
	//console.log("pushed: " + lineInfo + " to chord array");
	chordArray.push(lineInfo);
	numberOfNotes++;
} else if (lineInfo[0] != chordTick) {
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
		numberOfNotes++;
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
