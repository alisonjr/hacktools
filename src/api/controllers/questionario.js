

const listar = function (req, res) {
  res.send(`questionarios :)`)
}

const inserir = function (req, res) {
  res.send(` inserir questionario :)`)
}

const questionariosController = {
  listar,
  inserir
}


export default questionariosController