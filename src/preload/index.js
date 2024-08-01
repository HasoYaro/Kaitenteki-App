import { contextBridge, ipcRenderer } from 'electron'
import {dbFunctions} from '../main/database/database'

let openDb = async (documentPath) => {
  return await new dbFunctions('kaitentekiAppDatabase').openDb(documentPath)
}





contextBridge.exposeInMainWorld('Api', {
  loadingStater: (callback) => {ipcRenderer.on('loadingState', (e, s) => callback(s))},
  loadingStateChanger: (message) => {ipcRenderer.send('loadingStateChanger', message)},
  documentPath: (callback) => {ipcRenderer.on('docPath', (e, s) => callback(s))},
  isVersionUptoDate: (callback) => {ipcRenderer.on('isVersionUptoDate', (e, s) => callback(s))},
    
  openDb: (documentPath) => openDb(documentPath),

})