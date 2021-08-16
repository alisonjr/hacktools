export const returnModel = {
	objeto: {},
	erro: null,
	validacao: null,
}

export const execute = function (formDto, repository) {
	let retorno = returnModel
	if (!validarForm(formDto)) {
		retorno.validacao = { mensagem: "Foram enviados dados inválidos." }
		return retorno
	}

	formDto.dataCadastro = Date.now()

	let { objeto, erro } = repository.inserirNovaPergunta(formDto)
	if (erro) {
		retorno.erro = erro
		return retorno
	}

	retorno.objeto = objeto
	retorno.mensagem = "Nova pergunta criada"

	return retorno
}

const validarForm = (formDto) => {
	if (formDto?.descricao?.length > 0 && formDto?.usuario?.length > 0) {
		return true
	}

	return false
}

export default { returnModel, execute }
