import { readFileSync, writeFileSync } from "fs"
import path from "path";

const DATABASE_FILE = path.join(__dirname, 'database.json')
const db = {
  readFromDatabase() {
    const rawData = readFileSync(DATABASE_FILE);
    return JSON.parse(rawData)
  },

  writeInDatabase(content) {
    const rawData = JSON.stringify(content)
    writeFileSync(DATABASE_FILE, rawData);
  },

  insert(collectionName, object) {

    let database = this.readFromDatabase()
    let table = database[collectionName]

    //simula auto incremento sem precisar de uma lib
    object.id = Math.floor(Date.now() / 100)

    table.push(object)
    console.log(database)

    this.writeInDatabase(database)

    return object
  },

  getAll(collectionName) {
    const database = this.readFromDatabase()
    const table = database[collectionName]

    return table
  }
}

export default db