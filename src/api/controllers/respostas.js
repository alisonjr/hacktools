import CriarResposta from "../domain/useCases/respostas/CriarResposta"
import { respostaRepository } from "../repository/respostaRepo"
import { perguntaRepository } from "../repository/perguntaRepo"
import { questionarioRepository } from "../repository/questionarioRepo"

const listar = function (req, res) {
	let { objeto, erro } = respostaRepository.buscarTodosAsRespostas()

	if (erro) {
		res.status(500).send(erro)
		return
	}

	//realizar transformações para devolver os dados de forma padronizada
	objeto.map((resposta) => {
		resposta.dataCadastro = new Date(resposta.dataCadastro).toISOString()
	})

	res.status(200).send([...objeto])
}

const inserir = function (req, res) {
	const repository = {
		...respostaRepository,
		...perguntaRepository,
		...questionarioRepository,
	}
	const { objeto, mensagem, erro, validacao } = CriarResposta.execute({ ...req.body }, repository)

	if (validacao) {
		res.status(400).send(validacao)
		return
	}

	if (erro) {
		res.status(400).send(erro)
		return
	}

	//realizar transformações para devolver os dados de forma padronizada
	objeto.dataCadastro = new Date(objeto.dataCadastro).toISOString()
	objeto.pergunta.dataCadastro = new Date(objeto.pergunta.dataCadastro).toISOString()
	objeto.questionario.dataCadastro = new Date(objeto.questionario.dataCadastro).toISOString()

	delete objeto.questionario.perguntas

	res.status(200).send({ objeto, mensagem })
}

const respostasController = {
	listar,
	inserir,
}

export default respostasController
