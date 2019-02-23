const {BaseEvent} = require ("./BaseEvent.js");

class Note extends BaseEvent {

    /*
    note            (int)       = fret number
    string          (int)       = string number FUTURE STUFF!!
    isTap           (bool)      = is a tap event
    isForced        (bool)      = is a force event
    isChord         (bool)      = multiple notes in the same ticks make a chord, does not look at force or tap events
    sustainLength   (int)       = length in ticks for how long the note is sustained for
    */

    constructor (tick, note, isTap, isForced, isChord, sustainLength) {
        super (tick, "note", false);
        this.note = note;
        this.isTap = isTap;
        this.isForced = isForced;
        this.isChord = isChord;
        this.sustainLength = sustainLength;
    }
}

module.exports = {Note}
