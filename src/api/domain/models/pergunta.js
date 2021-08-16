class Pergunta {
  descricao
  usuarioCadastro
  dataCadastro

  constructor(descricao, usuarioCadastro, dataCadastro) {
    this.descricao = descricao
    this.usuario = usuarioCadastro
    this.dataCadastro = dataCadastro
  }
}
export const TABLE_NAME = "pergunta"

export default {
  Pergunta,
  TABLE_NAME,
}
