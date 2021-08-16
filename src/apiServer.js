import express from "express"
import routeManager from "./api/router"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())

const apiServer = {
	listen(port, uriPath, callback) {
		routeManager(app, uriPath)

		return app.listen(port, callback)
	},
}
export default apiServer
