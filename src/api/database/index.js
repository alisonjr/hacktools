import { readFileSync, writeFileSync } from "fs"
import path from "path"

const DATABASE_FILE = path.join(__dirname, "database.json")
const db = {
	_readFromDatabase() {
		const rawData = readFileSync(DATABASE_FILE)
		return JSON.parse(rawData)
	},

	_writeInDatabase(content) {
		const rawData = JSON.stringify(content)
		writeFileSync(DATABASE_FILE, rawData)
	},

	insert(collectionName, object) {
		let database = this._readFromDatabase()
		let table = database[collectionName]

		//simula auto incremento sem precisar de uma lib
		object.id = Math.floor(Date.now() / 100)

		table.push(object)

		this._writeInDatabase(database)

		return object
	},

	getAll(collectionName) {
		const database = this._readFromDatabase()
		const table = database[collectionName]

		return table
	},

	getById(collectionName, id) {
		const database = this._readFromDatabase()
		const table = database[collectionName]

		return table.find((item) => item.id === id)
	},
}

export default db
