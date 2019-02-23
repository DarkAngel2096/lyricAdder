const {BaseEvent} = require ("./BaseEvent.js");

class LyricEvent extends BaseEvent {

    /*
    lyricString     (string)    = string representation on the value inside the event
    */

    constructor (tick, lyricString) {
        super (tick, "lyric", true);
        this.lyricString = lyricString;
    }
}

module.exports = {LyricEvent}
