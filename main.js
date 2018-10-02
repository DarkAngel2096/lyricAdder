const electron = require("electron");
const { app, BrowserWindow } = require("electron");
const fs = require("fs");

let win;

var configTemplate = {
    "pathToChartFile": "",
    "lyricsInput": "",
    "mainPageDoNotShow": false
}

function createWindow () {
    win = new BrowserWindow({ width: 1400, height: 900});

    win.loadFile("index.html");

    var configExists = !fs.existsSync("./config.json", "utf8");

    if (configExists) {
        fs.writeFileSync("./config.json", JSON.stringify(configTemplate, null, "\t"), "utf8", function (err) {
            console.log(err);
        });
    }

    win.webContents.openDevTools();

    win.on("closed", () => {
        win = null;
    });
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
