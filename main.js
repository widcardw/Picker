const { app, BrowserWindow, ipcMain } = require("electron");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 900,
    height: 700,
    frame: false,
    // transparent: true,
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
      enableRemoteModule: true,
    },
  });

  win.loadFile("index.html");
  // win.webContents.openDevTools();
  ipcMain.on("mini", (e) => {
    win.minimize();
  });
  ipcMain.on("zoom", (e) => {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  });
  ipcMain.on("close", (e) => {
    win.close();
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
