import db from "../database"
import { TABLE_NAME } from '../models/pergunta'

const returnModel = class returnModel {
  objeto = Object
  erro = { mensagem: String }
}

const perguntaRepository = {
  inserirNovaPergunta(pergunta) {
    const retorno = new returnModel()
    try {
      const perguntaSalva = db.insert(TABLE_NAME, questionario)
      retorno.objeto = perguntaSalva
    }
    catch (err) {
      retorno.erro = { mensagem: "Não foi possível salvar a pergunta" }
    }
    return retorno
  },

  buscarTodasAsPerguntas() {
    const retorno = new returnModel()
    try {
      retorno.objeto = db.getAll(TABLE_NAME)
    }
    catch (err) {
      retorno.erro = { mensagem: "Não foi possível buscar as perguntas cadastradas" }
    }
    return retorno
  }
}

export default {
  returnModel,
  perguntaRepository
}