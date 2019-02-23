const {BaseEvent} = require ("./BaseEvent.js");

class SectionEvent extends BaseEvent {

    /*
    sectionValue    (string)    = string of what the section is named
    */

    constructor (tick, sectionValue) {
        super (tick, "section", true);
        this.sectionValue = sectionValue;
    }
}

module.exports = {SectionEvent}
