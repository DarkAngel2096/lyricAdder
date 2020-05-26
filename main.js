//const electron = require("electron");
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
	console.log("createWindow() started");

	win = new BrowserWindow({
		width: 1000,
		height: 900,
		menu: null
	});

	//win.loadFile("index.html");	// old html file, v.1.2.2
	win.loadFile("newUI.html");	// new HTML file for the new UI design

	testPaths();
	testVersion();

	win.setMenuBarVisibility(false);
	//console.log(win.isMenuBarVisible());



	//win.webContents.openDevTools();

	win.on("closed", () => {
		win = null;
	});

	console.log("createWindow() ended");
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		console.log("quitting windows");
		app.quit();
	}
});

app.on("activate", () => {
	if (win === null) {
		console.log("creating windows");
		createWindow();
	}
});


app.on("browser-window-created", function (e, window) {
	console.log("window created");

	console.log(e);
	console.log(window);

	window.setMenu(null);
	//window.removeMenu();
	//window.setMenuBarVisibility(false);
	//window.setAutoHideMenuBar(true);

	console.log("menu definitions done");
});


// function to test if the pats to different places work
function testPaths() {
	var needsBackupFolder = !fs.existsSync("../lyricAdder_backups");

	var needsConfigFile = needsBackupFolder || !fs.existsSync("../lyricAdder_backups/config.json");

	createNeededPaths(needsBackupFolder, needsConfigFile);

	console.log("Paths tested.");
}

// create the needed files or folders if missing
function createNeededPaths(needsBackupFolder, needsConfigFile) {

	if (needsBackupFolder) {
		fs.mkdirSync("../lyricAdder_backups");

		console.log("Created backups folder.");
	}

	if (needsConfigFile) {
		fs.writeFileSync("../lyricAdder_backups/config.json", JSON.stringify(configTemplate, null, "\t"), "utf8", function (err) {
			if (err) console.log("Problems with creating config: " + err);
		});

		console.log("Created config file.");
	}
}

// update the config file version if the app version is different
function testVersion() {
	var config = JSON.parse(fs.readFileSync("../lyricAdder_backups/config.json", "utf8"));

	if (config.version != app.getVersion()) {

		config.version = app.getVersion();

		fs.writeFileSync("../lyricAdder_backups/config.json", JSON.stringify(config, null, "\t"), "utf8", function (err) {
			if (err) console.log("Problems with creating config: " + err);
		});
	} else {

	}

	console.log("Version tested.");
}
