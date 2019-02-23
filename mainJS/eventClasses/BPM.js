const {BaseEvent} = require ("./BaseEvent.js");

class BPM extends BaseEvent {

    /*
    bpm             (int)       = bpm count, multiplied by 1000
    */

    constructor (tick, bpm) {
        super (tick, "bpm", true);
        this.bpm = bpm * 1000;
    }
/*
    set bpm (bpm) {
        this.bpm = bpm * 1000;
    }*/
}

module.exports = {BPM}
