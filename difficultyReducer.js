// Normal Requires
const fs = require("fs");

// variable creation
var nameInstruments = [
    "Single",               // Lead guitar
    "SingleBass",           // Lead bass?
    "DoubleGuitar",         // Second lead guitar?
    "DoubleBass",           // Bass
    "DoubleRythm",          // Rythm
    "Drums",                // Drums
    "Keyboard",             // Keys
    "GHLGuitar",            // GHL Guitar, 6 fret
    "GHLBass"               // GHL Bass, 6 fret?
]
var nameDifficulties = [  // used like "DifficultyInstrument" in .chart file
    "Expert",
    "Hard",
    "Medium",
    "Easy"
]
var difficulties;
var needToGenerate;

// function to send over the difficulty info from mainScripts.js
function giveDifficulties(difficulty) {
    difficulties = difficulty;
}

// function to find instruments used and create checkbox for those difficulties
function findInstruments() {
    var chartDiffs = [];
    var difficultyInstruments = [];

    for (var i = 0; i < difficulties.length; i++) {
        chartDiffs.push(difficulties[i][0].slice().substring(1, difficulties[i][0].length - 1));
    }
    console.log(chartDiffs);

    for (var i = 0; i < nameInstruments.length; i++) {
        var tempArr = [];

        for (var j = 0; j < nameDifficulties.length; j++) {
            tempArr.push(nameDifficulties[j] + nameInstruments[i]);
        }

        difficultyInstruments.push(tempArr);
    }
    console.log(difficultyInstruments);

    for (var i = 0; i < chartDiffs.length; i++) {

        for (var j = 0; j < difficultyInstruments.length; j++) {

            if (difficultyInstruments[j].includes(chartDiffs[i])) {
                console.log("found: " + chartDiffs[i]);
                console.log("removing: " + chartDiffs[i]);
                difficultyInstruments[j].splice(difficultyInstruments[j].indexOf(chartDiffs[i]), 1);
            }
        }
    }
    console.log(difficultyInstruments);

    for (var i = difficultyInstruments.length - 1; i >= 0; i--) {
        if (difficultyInstruments[i] == undefined || difficultyInstruments[i].length == 4) {
            console.log("removing: " + difficultyInstruments[i]);
            difficultyInstruments.splice(i, 1);
        }
    }
    console.log(difficultyInstruments);

    createCheckboxes(difficultyInstruments)
}
/*
// function to create the checkboxes to read which difficulties to possibly generate
function createCheckboxes(difficultyInstruments) {
    var HTMLCheckboxDiv = document.getElementById("difficultyCheckbox");

    for (var i = 0; i < difficultyInstruments.length; i++) {

        for (var j = 0; j < difficultyInstruments[i].length; j++) {

            switch (difficultyInstruments[i][0]) {
                case .includes(nameInstruments[0]): {
                    console.log("lead found");
                    break;
                }
                case .includes(nameInstruments[1])
            }
        }
    }
}*/

module.exports = {giveDifficulties, findInstruments}
