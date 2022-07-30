const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require("fs");
const DecompressZip = require('decompress-zip');
const addon_index = [];
const theme_index = [];
const template_index = [];

/* PRODUCTION DIRECTORIES
const addon_directory = "../../../addons/";
const theme_directory = "../../../themes/";
const template_directory = "../../../templates/";
*/


const addon_directory = "addons/";
const theme_directory = "themes/";
const template_directory = "templates/";


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
              symbolColor: '#ffffff',
			  backgroundColor:'#000000',
          },
		  webPreferences: {
	  nodeIntegration: true, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: true, // turn off remote
      preload: path.join(__dirname, "preload.js"),	// use a preload script
        },
	  icon: path.join(__dirname, 'icons/favi.ico'),
	  
  });
  
// remove so we can register each time as we run the app. 
app.removeAsDefaultProtocolClient('nuken');



app.setAsDefaultProtocolClient('nuken', process.execPath);        

  


const dir = path.join(__dirname, addon_directory);
const files = fs.readdirSync(dir);


const pdir = path.join(__dirname, template_directory);
const pfiles = fs.readdirSync(pdir);

const tdir = path.join(__dirname, theme_directory);
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

ipcMain.on('extract_file', async (event, args) => {
extract_zip_file(args);
});



function extract_zip_file(extract_object) {
console.log(extract_object[0].toString());
console.log(extract_object[1].toString());  

var ZIP_FILE_PATH = path.join(__dirname, extract_object[0].toString());
var DESTINATION_PATH = path.join(__dirname, extract_object[1].toString());
var unzipper = new DecompressZip(ZIP_FILE_PATH);

// Add the error event listener
unzipper.on('error', function (err) {
    console.log('Caught an error', err);
});

// Notify when everything is extracted
unzipper.on('extract', function (log) {
    console.log('Finished extracting', log);
	mainWindow.webContents.executeJavaScript('notify("Content was installed successfully. Please restart nuken (now or later) to use it.")');
	mainWindow.webContents.executeJavaScript('download_sound.currentTime=0;download_sound.play();');
	
	
});

// Notify "progress" of the decompressed files
unzipper.on('progress', function (fileIndex, fileCount) {
    console.log('Extracted file ' + (fileIndex + 1) + ' of ' + fileCount);
});

// Start extraction of the content
unzipper.extract({
    path: DESTINATION_PATH
    // You can filter the files that you want to unpack using the filter option
    //filter: function (file) {
        //console.log(file);
        //return file.type !== "SymbolicLink";
    //}
});
  
}


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
  


mainWindow.webContents.session.on('will-download', (event, item, webContents) => {
  // Set the save path, making Electron not to prompt a save dialog.
  
  console.log(path.join(__dirname,addon_directory));
  
  var content_type = item.getFilename().toString();
  var content_directory = addon_directory;  
  console.log(content_type);
  if (content_type.includes('addon')){
item.setSavePath(path.join(__dirname,addon_directory+content_type));  
  } else if (content_type.includes('theme')){
item.setSavePath(path.join(__dirname,theme_directory+content_type));
  } else if (content_type.includes('template') || content_type.includes('_pack')){
item.setSavePath(path.join(__dirname,template_directory+content_type));
  } else {
console.log('Error');	  
 }	  

  item.on('updated', (event, state) => {
    if (state === 'interrupted') {
      console.log('Download is interrupted but can be resumed')
    } else if (state === 'progressing') {
      if (item.isPaused()) {
        console.log('Download is paused')
      } else {
        console.log(`Received bytes: ${item.getReceivedBytes()}`)
      }
    }
  })
  item.once('done', (event, state) => {
    if (state === 'completed') {
      console.log('Download successfully');
	  mainWindow.webContents.executeJavaScript('init_extract_process()');
    } else {
      console.log(`Download failed: ${state}`)
    }
  })
})

  // and load the index.html of the app.
mainWindow.setBackgroundColor('#000000');
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


// 👇 Comment out the code below if you want to enable DevTools in nuken. 👇

app.on("browser-window-created", (e, win) => {
   win.removeMenu();
});



// 👆 Comment out the code above if you want to enable DevTools in nuken. 👆


app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});











// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
