import express from 'express'
import routeManager from './api/router'




const app = express()

const apiServer = {
  listen(port, uriPath, callback) {

    routeManager(app, uriPath)


    // console.log(app._router.stack)
    return app.listen(port, callback)
  }
}
export default apiServer


