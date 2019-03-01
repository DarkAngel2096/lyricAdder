var startComplete = Date.now();

var times = 0;

for (var i = 0; i < 100; i++) {
    var loopTime = Date.now();

    for (var j = 0; j < 1e9; j++) {

    }

    times += (Date.now() - loopTime);
    console.log("run done: " + i);
}

console.log(times);
console.log(times/100);
console.log("took: " + (Date.now() - startComplete) + "ms to complete 100 runs of counting to 1 bil");
