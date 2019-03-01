// just a way for me to think of a good file format


/*
tick, int number
type, E, N, S, TS, B....


types:

for N and S
two numbers...
first specifies which note, exception SP events which always has a 2
second is sustain length

TS
two numbers... (sometimes)
first the beat count in a measure
second number possibly if other than 4th's

B
one number
bpm, with added 3 zeroes after the btm if whole numbers, if decimals used then those 3 zeroes are the decimals

E....
global events
a lot of different types of events, lyric, phrase_start, phrase_end.......
each having their own thing going on
*/

var baseEvent = {
	"tick": 192,        // placement tick
	"type": "type"      // type of event
}

// everything below extending baseEvent...?

// 192 = N 0 192
var noteEvents = {
	"tick": 192,        // placement tick
	"note": 0,          // numbers 0 - 7 like in the .chart format, or string variants instead
	"special": false,   // true or false, depending on if it's a force or tap event
	"chord": false,     // true or false, depending on if another note (only notes 0-4 are allowed) are on the same tick
	"sustain": 192      // sustain length in ticks
}

// 192 = S 2 0 (what is the 2 for?)
var starPowerEvent = {
	"tick": 192,        // placement tick
	"sustain": 0        // sustain length in ticks
}

// 0 = TS 4 8
var timeSignatureEvent = {
	"tick": 0,          // placement tick
	"beats": 4,         // upper value (beat count) of the measure
	"bars": 8           // lower value (xth notes), if 4 then it's left out
}

// 0 = B 165000
var bpmEvent = {
	"tick": 0,          // placement tick
	"value": 165000     // bpm value multiplied with 1000
}

// 192 = E "section Intro"
var events = {
	"tick": 192,        // placement tick
	"event": "section", // event type
	"value": "Intro"    // event values
}
