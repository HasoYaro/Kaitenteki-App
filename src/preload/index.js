import { contextBridge, ipcRenderer } from 'electron'
import {dbFunctions} from '../main/database/database'

let openDb = async () => {
  return await new dbFunctions('kaitentekiAppDatabase').openDb()
}

let setLang  = async (lang) => {
  console.log(lang)
  return await new dbFunctions('kaitentekiAppDatabase').setLang(lang)
}

let getLang  = async () => {
  return await new dbFunctions('kaitentekiAppDatabase').getLang()
}


contextBridge.exposeInMainWorld('Api', {
  loadingStater: (callback) => {ipcRenderer.on('loadingState', (e, s) => callback(s))},
  loadingStateChanger: (message) => {ipcRenderer.send('loadingStateChanger', message)},
  isVersionUptoDate: (callback) => {ipcRenderer.on('isVersionUptoDate', (e, s) => callback(s))},
  downloadLatestV: (m) => {ipcRenderer.send('downloadLatestV', m)},
    
  openDb: () => openDb(),
  setLang: (lang) => setLang(lang),
  getLang: () => getLang(),
})