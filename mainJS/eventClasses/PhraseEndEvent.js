const {BaseEvent} = require ("./BaseEvent.js");

class PhraseEndEvent extends BaseEvent {

	constructor (tick) {
		super (tick, "phraseEnd", true);
	}
}

module.exports = {PhraseEndEvent}
