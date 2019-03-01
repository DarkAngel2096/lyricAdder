const {BaseEvent} = require ("./BaseEvent.js");

class TimeSignature extends BaseEvent {

	/*
	beats           (int)       = beat count per measure
	bars            (int)       = xth notes per beat
	*/

	constructor (tick, beats, bars) {
		super (tick, "ts", true);
		this.beats = beats;
		this.bars = bars;
	}
}

module.exports = {TimeSignature}
