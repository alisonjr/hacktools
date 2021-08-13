import staticServer from "./staticServer"
import apiServer from "./apiServer"
import dotenv from 'dotenv'


// SE ESTIVER RODANDO EM PRODUÇÃO OU OUTRO AMBIENTE 
// AS VARIÁVEIS DE AMBEINTE JÁ ESTARAO CONFIGURADAS
if (process.env.NODE_ENV?.toLocaleLowerCase() === 'dev') {
  dotenv.config()
}


staticServer.listen(process.env.PORT).on('listening', () => {
  console.log(`Site rodando em http://localhost:${process.env.PORT}`)
})

apiServer.listen(process.env.API_PORT, process.env.API_URI, () => {
  console.log(`API rodando em http://localhost:${process.env.API_PORT}`)
})