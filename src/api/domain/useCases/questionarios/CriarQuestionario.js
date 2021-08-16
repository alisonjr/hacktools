export const returnModel = {
	objeto: {},
	erro: null,
	validacao: null,
}

export const execute = function (formDto, repository) {
	let resposta = returnModel

	if (!validarForm(formDto)) {
		resposta.validacao = { mensagem: "Foram enviados dados inválidos." }
		return resposta
	}

	for (let [index, pergunta] of formDto.perguntas.entries()) {
		if (!pergunta.id) {
			resposta.validacao = {
				mensagem: "É necessário informar as identificações das perguntas corretamente.",
			}
			break
		}

		let perguntaQry = repository.buscarPergunta(pergunta.id)
		if (perguntaQry.erro) {
			resposta.erro = perguntaQry.erro
			break
		}

		if (!perguntaQry.objeto) {
			resposta.validacao = {
				mensagem: "Foi informado uma pergunta inexistente.",
			}
		}

		//vincula a pergunta corretamente
		formDto.perguntas[index] = perguntaQry.objeto
	}

	if (resposta.validacao || resposta.erro) {
		return resposta
	}

	formDto.dataCadastro = Date.now()

	let { objeto, erro } = repository.inserirNovoQuestionario(formDto)
	if (erro) {
		resposta.erro = erro
		return resposta
	}

	resposta.objeto = objeto
	resposta.mensagem = "Novo questionário criado"

	return resposta
}

const validarForm = (formDto) => {
	if (formDto?.titulo?.length > 0 && formDto?.perguntas?.length > 0 && formDto?.usuarioCadastro?.length > 0) {
		return true
	}

	return false
}

export default { returnModel, execute }
