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

	let questionarioQry = repository.buscarQuestionario(formDto.questionario.id)
	if (questionarioQry.erro) {
		resposta.erro = questionarioQry.erro
		return resposta
	}

	let perguntaQry = repository.buscarPergunta(formDto.pergunta.id)
	if (perguntaQry.erro) {
		resposta.erro = perguntaQry.erro
		return resposta
	}

	if (!questionarioQry.objeto) {
		resposta.erro = { mensagem: "O questionário vinculado não foi localizado" }
		return resposta
	}

	if (!perguntaQry.objeto) {
		resposta.erro = { mensagem: "A pergunta vinculada não foi localizada" }
		return resposta
	}

	//vincula a pergunta e p questionario corretamente
	formDto.pergunta = perguntaQry.objeto
	formDto.questionario = questionarioQry.objeto

	formDto.dataCadastro = Date.now()

	let { objeto, erro } = repository.inserirNovaResposta(formDto)
	if (erro) {
		resposta.erro = erro
		return resposta
	}

	resposta.objeto = objeto
	resposta.mensagem = "Nova resposta criada"

	return resposta
}

const validarForm = (formDto) => {
	if (
		formDto?.resposta?.length > 0 &&
		formDto?.usuarioCadastro?.length > 0 &&
		!!formDto?.localizacao?.lat &&
		!!formDto?.localizacao?.long &&
		!!formDto?.questionario?.id &&
		!!formDto?.pergunta?.id
	) {
		return true
	}

	return false
}

export default { returnModel, execute }
