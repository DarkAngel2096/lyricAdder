const {BaseEvent} = require ("./BaseEvent.js");

class SoloEndEvent extends BaseEvent {

	constructor (tick) {
		super (tick, "soloEnd", false);
	}
}

module.exports = {SoloEndEvent}
