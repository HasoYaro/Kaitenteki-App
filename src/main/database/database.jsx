import path from 'path'
import sqlite3 from 'sqlite3'
import fs from 'fs'
import dbVariables from './databaseVariables'
import { useState } from 'react'

const dbLocation = path.join(__dirname, '')

export class dbFunctions {
    dbName;
    
    constructor(dbName){
        this.dbName = dbName
    }
    
    #tableCreate = async (db) => {
        for (let table of dbVariables.tables){
            let columns = dbVariables[table+'Columns']
            
            await db.run("CREATE TABLE IF NOT EXISTS "+table+" (id INTEGER PRIMARY KEY AUTOINCREMENT)")
            
            for(let column of columns)
            {
                let columnName = column[0]
                let columnAttr = column[1]

                await db.all("SELECT "+columnName+" FROM "+table+" LIMIT 1", (err, succ) => {
                                if(err !== null){
                                    db.run("ALTER TABLE "+table+" ADD "+columnName+" "+columnAttr)
                                }
                            })
            }
        }
    }

    openDb = async () => {
        let documentPath = localStorage.getItem('doc')
       const db = new sqlite3.Database(documentPath+'/'+this.dbName+'.db');
        db.serialize(async ()  => {
            await this.#tableCreate(db)
       })
       return true;
    }

    setLang = async (lang) => {
        let documentPath = localStorage.getItem('doc')
        const db = new sqlite3.Database(documentPath+'/'+this.dbName+'.db');
        await db.get("SELECT language FROM settings WHERE id = 0", async (err, succ) => {
            if(succ.length === 0) db.run("INSERT INTO settings (id, language) VALUES (0, '"+lang+"')")
            else db.run("UPDATE settings SET language = '"+lang+"' WHERE id = 0")
        })
    }

    getLang = async () => {
        let documentPath = localStorage.getItem('doc')
        const db = new sqlite3.Database(documentPath+'/'+this.dbName+'.db');
        return new Promise(res => {
            db.get("SELECT language FROM settings WHERE id = 0", async (err, succ) => {
                res(succ.language)
            })
        })
    }

}