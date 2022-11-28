const { app, BrowserWindow, ipcMain } = require('electron')
const url = require("url");
const path = require("path");
const fs = require('fs');

let mainWindow;

const archiveListFileName = 'archiveList.json';

function createWindow() {
  mainWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/index.html`),
      protocol: "file:",
      slashes: true
    })
  );
  // Open the DevTools.
  //mainWindow.webContents.openDevTools()
  mainWindow.setMenuBarVisibility(false);
  mainWindow.maximize();
  mainWindow.show();

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})

ipcMain.on('saveArchiveList', (event, arg) => {
  let archiveListContent = JSON.stringify(arg.archiveList);
  fs.writeFile(archiveListFileName, archiveListContent, 'utf8', function (err) {
    if (err) throw err;
    // if no error
    console.log("Data is written to file successfully. (Archive List)");
  });
})


ipcMain.on('loadArchiveList', (event, arg) => {
  if (!fs.existsSync(archiveListFileName)) {
    console.log("Archive list file doesn't exists! Returning an empty list.");
    return [];
  }
  const data = fs.readFileSync(archiveListFileName,
    { encoding: 'utf8', flag: 'r' });
  console.log("Archive list file successfully loaded!");
  return JSON.parse(data);
})
