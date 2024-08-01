import path from 'path'
import sqlite3 from 'sqlite3'
import fs from 'fs'
import dbVariables from './databaseVariables'

const dbLocation = path.join(__dirname, '')

export class dbFunctions {
    dbName;

    constructor(dbName){
        this.dbName = dbName
    }
    
    #tableCreate = async (db) => {
        console.log(dbVariables)
        for (let table of dbVariables.tables){
            let columns = dbVariables[table+'Columns']
            
            await db.run("CREATE TABLE IF NOT EXISTS "+table+" (id INTEGER PRIMARY KEY AUTOINCREMENT)")
            
            for(let column of columns)
            {
                let columnName = column[0]
                let columnAttr = column[1]
                console.log(columnName, columnAttr)

                await db.all("SELECT "+columnName+" FROM "+table+" LIMIT 1", (err, succ) => {
                    console.log(err)
                    console.log(succ)
                                if(err !== null){
                                    db.run("ALTER TABLE "+table+" ADD "+columnName+" "+columnAttr)
                                    console.log('Eklenen data: '+columnName+', eklendigi table: '+table)
                                }
                            })
            }
        }
    }

    openDb = async (documentPath) => {
        console.log(documentPath)
       const db = new sqlite3.Database(documentPath+'/'+this.dbName+'.db');
        db.serialize(async ()  => {
            await this.#tableCreate(db)
       })
       return true;
    }



}