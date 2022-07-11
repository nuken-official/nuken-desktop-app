const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require("fs");
const addon_index = [];
const theme_index = [];
const template_index = [];

require('@electron/remote/main').initialize()
let win;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const ipc = {
    'render': {
        // From render to main.
        'send': [],
        // From main to render.
        'receive': [],
        // From render to main and back again.
        'sendReceive': [
            'dialog:openDirectorySelect' // Channel name
        ]
    }
};

//require('child_process').spawn('control', ['ncpa.cpl']);

const createWindow = () => {
  // Create the browser window.
 
  
  const mainWindow = new BrowserWindow({
	  autoHideMenuBar: true,
	  minWidth:800,
	  minHeight:640,
	  titleBarStyle: 'hidden',
	  titleBarOverlay: {
              color: '#000000',
              symbolColor: '#ffffff'
          },
		  webPreferences: {
			nodeIntegration: true, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: true, // turn off remote
      preload: path.join(__dirname, "preload.js") // use a preload script

        },
	  icon: path.join(__dirname, 'icons/favi.ico'),
	  
  });
  

const dir = 'src/addons/';
const files = fs.readdirSync(dir);

const pdir = 'src/templates/';
const pfiles = fs.readdirSync(pdir);

const tdir = 'src/themes/';
const tfiles = fs.readdirSync(tdir);

for (const file of files) {

if (file.toString().toLowerCase().includes('.js')){
	
addon_index.push(file);
		
		

}
}

for (const file of tfiles) {

if (file.toString().toLowerCase().includes('.css')){
	
console.log(file);	
theme_index.push(file);
		
		

}

		

}

for (const file of pfiles) {

if (file.toString().toLowerCase().includes('.js')){
	
console.log(file);	
template_index.push(file);
		

}

		

}
  
 
  

ipcMain.on("toMain", (event, args) => {
	
	
if (args == "NOTHING"){
	 mainWindow.webContents.send("fromMain", 'NOTHING');
} else {
	
  fs.readFile(args, 'utf-8', (error, data) => {
    // Do something with file contents
    // Send result back to renderer process
    mainWindow.webContents.send("fromMain", data);
  });
}
});

ipcMain.handle('addons', async (event, someArgument) => {
  return addon_index;
})

ipcMain.handle('templates', async (event, someArgument) => {
  return template_index;
})

ipcMain.handle('themes', async (event, someArgument) => {
  return theme_index;
})

  ipcMain.handle('dialog:openFile', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
		
      properties: ['openFile'],
	  filters: [
              { name: 'HTML files', extensions: ['html', 'htm', 'shtml'] }
            ],
    })
    if (canceled) {
      return 'NOTHING';
    } else {
      return filePaths[0]
    }
  })


  // and load the index.html of the app.
mainWindow.loadFile(path.join(__dirname, 'index.html'));
mainWindow.maximize();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


//Comment out the code below if you want to enable DevTools in nuken.

/*

app.on("browser-window-created", (e, win) => {
   win.removeMenu();
});

*/










app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});









// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
