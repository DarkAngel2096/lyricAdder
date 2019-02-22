const {noteEvent} = require ("./eventClasses/noteEvent.js");

let note = new noteEvent(192, 0, false, false, 0);

console.log(note);
console.log(note instanceof noteEvent);
