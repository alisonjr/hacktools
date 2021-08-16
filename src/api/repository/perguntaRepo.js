import db from "../database"
import { TABLE_NAME } from "../domain/models/pergunta"

export const returnModel = {
	objeto: {},
	erro: null,
}

export const perguntaRepository = {
	inserirNovaPergunta(pergunta) {
		const retorno = returnModel
		try {
			const perguntaSalva = db.insert(TABLE_NAME, pergunta)
			retorno.objeto = perguntaSalva
		} catch (err) {
			retorno.erro = { mensagem: "Não foi possível salvar a pergunta" }
		}

		return retorno
	},

	buscarPergunta(id) {
		const retorno = returnModel
		try {
			retorno.objeto = db.getById(TABLE_NAME, id)
		} catch (err) {
			retorno.erro = {
				mensagem: "Não foi possível buscar essa pergunta",
			}
		}
		return retorno
	},

	buscarTodasAsPerguntas() {
		const retorno = returnModel
		try {
			retorno.objeto = db.getAll(TABLE_NAME)
		} catch (err) {
			retorno.erro = {
				mensagem: "Não foi possível buscar as perguntas cadastradas",
			}
		}
		return retorno
	}
}

export default {
	returnModel,
	perguntaRepository,
}
