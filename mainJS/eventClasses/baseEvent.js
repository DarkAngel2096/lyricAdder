class BaseEvent {

	/*
	tick            (int)       = placement tick for the evnet
	type            (string)    = type of extended classes
	isGlobal        (bool)      = is the event global or not, true = global, false = local
	*/

	constructor (tick, type, isGlobal) {
		this.tick = tick;
		this.type = type;
		this.isGlobal = isGlobal;
	}
}

module.exports = {BaseEvent}
