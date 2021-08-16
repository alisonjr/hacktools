import db from "../database"
import { TABLE_NAME } from "../domain/models/questionario"

export const returnModel = {
	objeto: {},
	erro: null,
}

export const questionarioRepository = {
	inserirNovoQuestionario(questionario) {
		const retorno = returnModel
		try {
			const questionarioSalvo = db.insert(TABLE_NAME, questionario)
			retorno.objeto = questionarioSalvo
		} catch (err) {
			retorno.erro = { mensagem: "Não foi possível salvar o questionario" }
		}

		return retorno
	},

	buscarQuestionario(id) {
		const retorno = returnModel
		try {
			retorno.objeto = db.getById(TABLE_NAME, parseInt(id))
		} catch (err) {
			retorno.erro = {
				mensagem: "Não foi possível buscar esse questionário",
			}
		}
		return retorno
	},

	buscarTodosOsQuestionarios() {
		const retorno = returnModel
		try {
			retorno.objeto = db.getAll(TABLE_NAME)
		} catch (err) {
			retorno.erro = {
				mensagem: "Não foi possível buscar os questionários cadastrados",
			}
		}
		return retorno
	},
}

export default {
	returnModel,
	questionarioRepository,
}
