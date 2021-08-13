import 'express-group-routes'
import perguntasController from '../controllers/perguntas'

import questionariosController from '../controllers/questionario'
import respostasController from '../controllers/respostas'


const routeManager = function (expressApp, rootUri) {

  const rootUriApi = rootUri ?? '/api'

  expressApp.get('/', (req, res) => {
    res.send(`A api encontra-se a partir de: ${rootUriApi}`)
  })

  expressApp.get(rootUriApi, (req, res) => {
    res.send(`API hacktools :)`)
  })

  expressApp.group(rootUriApi + '/questionarios', (router) => {

    router.get("/", questionariosController.listar)
    router.post("/", questionariosController.inserir)

  })

  expressApp.group(rootUriApi + '/perguntas', (router) => {

    router.get("/", perguntasController.listar)
    router.post("/", perguntasController.inserir)

  })

  expressApp.group(rootUriApi + '/respostas', (router) => {

    router.get("/", respostasController.listar)
    router.post("/", respostasController.inserir)

  })
}
export default routeManager