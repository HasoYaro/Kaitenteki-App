import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
const path = require('path')
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import request from 'request'
import fs from 'fs-extra'

let mainWindow;
function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    title: 'Anani Sikim Hayat',
    width: 1024,
    height: 576,
    resizable: false,
    autoHideMenuBar: true,
    center: true,
    darkTheme: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    mainWindow.openDevTools()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })


  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })


  request('https://api.github.com/repos/HasoYaro/vite-deneme/releases/latest', {headers: {'User-Agent':'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:59.0) Gecko/20100101 '}}, function(error, html, body){
		if(!error){
			var v = app.getVersion().replace(' ', '');
			var latestV = JSON.parse(body).tag_name.replace('v', '');
			var changeLog = JSON.parse(body).body.replace('<strong>Changelog</strong>', 'Update available. Here are the changes:\n');
			if(latestV!=v){
				console.log(v)
				console.log(latestV)
				console.log(changeLog)
				mainWindow.webContents.send('isVersionUptoDate', false)
			}
      else{
        mainWindow.webContents.send('isVersionUptoDate', true)
      }
		}
	});

  mainWindow.webContents.on('did-finish-load', function () {
    let appDocumentsPath
    if (!fs.existsSync(app.getPath('documents')+'/Kaitenteki_App')) fs.mkdir(app.getPath('documents')+'/Kaitenteki_App');
    appDocumentsPath = app.getPath('documents')+'/Kaitenteki_App'
    console.log(appDocumentsPath)
    mainWindow.webContents.send('docPath', appDocumentsPath);
    ipcMain.on('loadingStateChanger', (e, s) => {
    mainWindow.webContents.send('loadingState', s);
    })    
  });
  
    



  

  
   


})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.