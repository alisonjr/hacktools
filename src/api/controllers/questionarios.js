import CriarQuestionario from "../domain/useCases/questionarios/CriarQuestionario"
import { questionarioRepository } from "../repository/questionarioRepo"
import { perguntaRepository } from "../repository/perguntaRepo"
import { respostaRepository } from "../repository/respostaRepo"

const listar = function (req, res) {
	let { objeto, erro } = questionarioRepository.buscarTodosOsQuestionarios()

	if (erro) {
		res.status(500).send(erro)
		return
	}

	//realizar transformações para devolver os dados de forma padronizada
	objeto.map((questionario) => {
		questionario.dataCadastro = new Date(questionario.dataCadastro).toISOString()

		questionario.perguntas.map((pergunta) => {
			pergunta.dataCadastro = new Date(pergunta.dataCadastro).toISOString()
		})
	})

	res.status(200).send([...objeto])
}

const inserir = function (req, res) {
	const repository = {
		...questionarioRepository,
		...perguntaRepository,
	}
	const { objeto, mensagem, erro, validacao } = CriarQuestionario.execute({ ...req.body }, repository)

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
	objeto.perguntas.map((pergunta) => {
		pergunta.dataCadastro = new Date(pergunta.dataCadastro).toISOString()
	})

	res.status(200).send({ objeto, mensagem })
}


const respostasPorQuesitonario = function (req, res) {

	let { objeto, erro } = respostaRepository.buscarRespostasDeUmQuestionario(req.params.id)

	if (erro) {
		res.status(500).send(erro)
		return
	}

	//realizar transformações para devolver os dados de forma padronizada
	objeto.map((resposta) => {
		resposta.pergunta.dataCadastro = new Date(resposta.pergunta.dataCadastro).toISOString()

		resposta.questionario.dataCadastro = new Date(resposta.questionario.dataCadastro).toISOString()
		delete resposta.questionario.perguntas

		resposta.dataCadastro = new Date(resposta.dataCadastro).toISOString()
	})

	res.status(200).send([...objeto])
}


const buscarPorId = function (req, res) {
	let { objeto, erro } = questionarioRepository.buscarQuestionario(req.params.id)

	if (erro) {
		res.status(500).send(erro)
		return
	}

	if(!objeto){
		res.status(100).send({mensagem: "Questionário inexistente"})
		return
	}

	//realizar transformações para devolver os dados de forma padronizada
	objeto.dataCadastro = new Date(objeto.dataCadastro).toISOString()
	objeto.perguntas.map((pergunta) => {
		pergunta.dataCadastro = new Date(pergunta.dataCadastro).toISOString()
	})

	res.status(200).send({...objeto})
}

const questionariosController = {
	listar,
	inserir,
	buscarPorId,
	respostasPorQuesitonario,
}

export default questionariosController
