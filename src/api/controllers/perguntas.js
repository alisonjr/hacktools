import CriarPergunta from "../domain/useCases/perguntas/CriarPergunta"
import { perguntaRepository } from "../repository/perguntaRepo"

const listar = function (req, res) {
	let { objeto, erro } = perguntaRepository.buscarTodasAsPerguntas()

	if (erro) {
		res.status(500).send(erro)
		return
	}

	//realizar transformações para devolver os dados de forma padronizada
	objeto.map((pergunta) => {
		pergunta.dataCadastro = new Date(pergunta.dataCadastro).toISOString()
	})

	res.status(200).send([...objeto])
}

const inserir = function (req, res) {
	const { objeto, mensagem, erro, validacao } = CriarPergunta.execute({ ...req.body }, perguntaRepository)

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

	res.status(200).send({ objeto, mensagem })
}
const perguntasController = {
	listar,
	inserir,
}

export default perguntasController
