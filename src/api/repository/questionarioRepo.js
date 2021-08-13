import db from "../database"
import { TABLE_NAME } from '../models/pergunta'

const returnModel = class returnModel {
  objeto = Object
  erro = { mensagem: String }
}
const questionarioRepository = {
  inserirNovoQuesitonario(questionario) {
    const retorno = new returnModel()
    try {
      const questionarioSalvo = db.insert(TABLE_NAME, questionario)
      retorno.objeto = questionarioSalvo
    }
    catch (err) {
      retorno.erro = { mensagem: "Não foi possível salvar o questionário" }
    }
    return retorno
  }
}