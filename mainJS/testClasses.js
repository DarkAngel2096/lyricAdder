const {Note} = require ("./eventClasses/Note.js");
const {StarPower} = require ("./eventClasses/StarPower.js");
const {BPM} = require ("./eventClasses/BPM.js");
const {TimeSignature} = require ("./eventClasses/TimeSignature.js");


let note = new Note (192, 0, false, false, false, 0);

let note2 = new Note (768, 1, false, true, false, 192);

let sp = new StarPower (192, 192);
let bpm = new BPM (0, 165);
let ts = new TimeSignature (0, 4, 4);


console.log(note);

console.log(note2);

console.log(sp);
console.log(bpm);
console.log(ts);
