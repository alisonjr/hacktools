class Questionario {
  titulo
  usuarioCadastro
  dataCadastro

  constructor(titulo, usuarioCadastro, dataCadastro) {
    this.titulo = titulo
    this.usuarioCadastro = usuarioCadastro
    this.dataCadastro = dataCadastro
  }
}

const TABLE_NAME = 'questionario'

export default {
  Questionario,
  TABLE_NAME
}