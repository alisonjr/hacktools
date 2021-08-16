import db from "../database"
import { TABLE_NAME } from "../domain/models/resposta"

export const returnModel = {
	objeto: {},
	erro: null,
}

export const respostaRepository = {
	inserirNovaResposta(resposta) {
		const retorno = returnModel
		try {
			const respostaSalva = db.insert(TABLE_NAME, resposta)
			retorno.objeto = respostaSalva
		} catch (err) {
			retorno.erro = { mensagem: "Não foi possível salvar a resposta" }
		}

		return retorno
	},

	buscarTodosAsRespostas() {
		const retorno = returnModel
		try {
			retorno.objeto = db.getAll(TABLE_NAME)
		} catch (err) {
			retorno.erro = {
				mensagem: "Não foi possível buscar as respostas cadastradas",
			}
		}
		return retorno
	},

	buscarRespostasDeUmQuestionario(questionarioId) {
		const retorno = returnModel
		try {

			let todasAsRespostas = db.getAll(TABLE_NAME)

			retorno.objeto = todasAsRespostas.filter(resposta => resposta.questionario.id === parseInt(questionarioId))

		} catch (err) {
			retorno.erro = {
				mensagem: "Não foi possível buscar as respostas do questionário",
			}
		}
		return retorno
	},
}

export default {
	returnModel,
	respostaRepository,
}
