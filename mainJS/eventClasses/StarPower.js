const {BaseEvent} = require ("./BaseEvent.js");

class StarPower extends BaseEvent {

    /*
    sustainLength   (int)       = time in seconds the event is sustained for
    */

    constructor (tick, sustainLength) {
        super (tick, "sp", false);
        this.sustainLength = sustainLength;
    }
}

module.exports = {StarPower}
