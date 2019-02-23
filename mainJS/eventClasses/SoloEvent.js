const {BaseEvent} = require ("./BaseEvent.js");

class SoloEvent extends BaseEvent {

    constructor (tick) {
        super (tick, "solo", false);
    }
}

module.exports = {SoloEvent}
