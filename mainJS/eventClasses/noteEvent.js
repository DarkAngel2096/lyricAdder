const {baseEvent} = require ("./baseEvent.js");

class noteEvent extends baseEvent {

    /*
    tick is palcement tick
    note is for the note type
        5 fret guitars
            0 = green, 1 = red, 2 = yellow, 3 = blue, 4 = orange, 5 = forced, 6 = tap, 7 = open
        6 fret guitars
            0 = green, 1 = red, 2 = yellow, 3 = blue, 4 = orange, 5 = forced, 6 = tap, 7 = open, 8 =
    */

    constructor (tick, note, special, chord, sustain) {
        super(tick, "note");
        this.note = note;
        this.special = special;
        this.chord = chord;
        this.sustain = sustain;
    }
}

module.exports = {noteEvent}
