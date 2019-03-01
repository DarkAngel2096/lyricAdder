const electron = require("electron");
const { app, BrowserWindow } = require("electron");
const fs = require("fs");

let win;

var configTemplate = {
	"pathToBackupFolder": "../lyricAdder_backups",
	"mainPageDoNotShow": false,
	"version": app.getVersion(),
	"pathToChartFile": "",
	"lyricsInput": ""
}

function createWindow () {
	win = new BrowserWindow({ width: 1000, height: 900});

	win.loadFile("index.html");

	testPaths();
	testVersion();

	//win.webContents.openDevTools();

	win.on("closed", () => {
		win = null;
	});
}

function testPaths() {
	var needsBackupFolder = !fs.existsSync("../lyricAdder_backups");

	var needsConfigFile = needsBackupFolder || !fs.existsSync("../lyricAdder_backups/config.json");

	createNeededPaths(needsBackupFolder, needsConfigFile);
}

function createNeededPaths(needsBackupFolder, needsConfigFile) {
	if (needsBackupFolder) {
		fs.mkdirSync("../lyricAdder_backups");
	}
	if (needsConfigFile) {
		fs.writeFileSync("../lyricAdder_backups/config.json", JSON.stringify(configTemplate, null, "\t"), "utf8", function (err) {
			if (err) console.log("Problems with creating config: " + err);
		});
	}
}

function testVersion() {
	var config = JSON.parse(fs.readFileSync("../lyricAdder_backups/config.json", "utf8"));

	if (config.version != app.getVersion()) {

		config.version = app.getVersion();

		fs.writeFileSync("../lyricAdder_backups/config.json", JSON.stringify(config, null, "\t"), "utf8", function (err) {
			if (err) console.log("Problems with creating config: " + err);
		});
	} else {

	}
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (win === null) {
		createWindow();
	}
});

app.on("browser-window-created", function(e, window) {
	window.setMenu(null);
});
