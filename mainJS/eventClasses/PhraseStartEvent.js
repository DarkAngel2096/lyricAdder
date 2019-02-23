const {BaseEvent} = require ("./BaseEvent.js");

class PhraseStartEvent extends BaseEvent {

    constructor (tick) {
        super (tick, "phraseStart", true);
    }
}

module.exports = {PhraseStartEvent}
