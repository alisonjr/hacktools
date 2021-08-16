class Questionario {
	titulo
	usuarioCadastro
	perguntas
	dataCadastro

	constructor(titulo, usuarioCadastro, dataCadastro, perguntas) {
		this.titulo = titulo
		this.usuarioCadastro = usuarioCadastro
		this.dataCadastro = dataCadastro
		this.perguntas = perguntas
	}
}

export const TABLE_NAME = "questionario"

export default {
	Questionario,
	TABLE_NAME,
}
