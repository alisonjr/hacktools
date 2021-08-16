class Resposta {
	resposta
	dataCadastro
	usuarioCadastro
	localizacao
	questionario
	pergunta

	constructor(resposta, dataCadastro, usuarioCadastro, localizacao, questionario, pergunta) {
		this.resposta = resposta
		this.usuarioCadastro = usuarioCadastro
		this.dataCadastro = dataCadastro
		this.localizacao = localizacao
		this.questionario = questionario
		this.pergunta = pergunta
	}
}

export const TABLE_NAME = "resposta"

export default {
	Resposta,
	TABLE_NAME,
}
