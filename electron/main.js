const { app, BrowserWindow } = require('electron')

let win;


function createWindow() {
    // Create the browser window.

  let iconPath = __dirname+'/../src/favicon.png';
  console.log(iconPath);

    win = new BrowserWindow({
        width: 600,
        height: 600,
        backgroundColor: '#aaa',
        icon: __dirname+'/../src/favicon.png',
        title: "SMP3 Player"
    })
    win.loadURL(`file://${__dirname}/../dist/index.html`)
   
    // win.webContents.openDevTools();

    win.on('closed', function () {
        win = null
    })

   // win.setMenu(null);
}
// Create window on electron intialization
app.on('ready', createWindow)
// Quit when all windows are closed.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
app.on('activate', function () {
    if (win === null) {
        createWindow()
    }
})