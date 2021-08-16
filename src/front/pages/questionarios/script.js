function buscarQuestionarios() {
    let onsuccess = function (e) {
        loading.hide();
        window.questionarios = JSON.parse(e.target.response);
        inserirItensNaTabela(JSON.parse(e.target.response))
    };

    let onerror = function (e) {
        loading.hide();
        toast.error("Não foi possível buscar as perguntas cadastradas")
    };

    loading.show();
    ajax.get(apiRoot + '/questionarios', {}, onsuccess, onerror)

}

function inserirItensNaTabela(itens) {
    itens.map(item => {
        let tableBody = document.getElementById("table-body");
        let rowMaster = tableBody.insertRow(0);
        rowMaster.scope = "row";
        rowMaster.role = "button";
        rowMaster.setAttribute("class", "collapsed");
        rowMaster.setAttribute("style", "cursor: pointer;");
        rowMaster.setAttribute("data-bs-toggle", "collapse");
        rowMaster.setAttribute("data-bs-target", `#questionario-${item.id}-perguntas`);
        rowMaster.setAttribute("aria-expanded", "false");
        rowMaster.setAttribute("aria-controls", `#questionario-${item.id}-perguntas`);

        rowMaster.insertCell(0).innerHTML = `<span>${item.id}</span>`;
        rowMaster.insertCell(1).innerHTML = `<span>${item.titulo}</span>`;
        rowMaster.insertCell(2).innerHTML = `<span>${item.usuarioCadastro}</span>`;
        rowMaster.insertCell(3).innerHTML = `
            <div>
              <button class="btn btn-secondary btn-sm m-1" type="button" onclick="verPerguntas(${item.id})">
                Perguntas
              </button>
              <button class="btn btn-secondary btn-sm m-1" type="button" onclick="verRespostas(${item.id})">
                Respostas
              </button>
            </div>`;
    })

}


function verPerguntas(questionarioId) {
    let questionario = window.questionarios.find(qs => qs.id == questionarioId);

    let modalPerguntas = new bootstrap.Modal(document.getElementById('modal-perguntas'));

    document.getElementById('modal-perguntas-title').innerHTML = `Perguntas do questionário: ${questionario.titulo}`;

    let template = `<tr><td class="align-top"><span>ID</span></td><td><p>DESCRICAO</p></td></tr>`;
    let tablePerguntas = "";
    questionario.perguntas.map(pergunta => {
        let itemHtml = (template.slice()).replace("DESCRICAO", pergunta.descricao).replaceAll("ID", pergunta.id);
        tablePerguntas += itemHtml;
    });

    document.getElementById('modal-perguntas-body').innerHTML = `<div class="table-responsive"><table class="table">
      <thead><tr>
      <th scope="col"  style="max-width: 80px;"><span>#</span></th>
      <th scope="col" style="min-width: 200px;"><span>Descrição da pergunta</span></th>
      </tr></thead>
      <tbody>${tablePerguntas}</tbody></table></div>`;

    modalPerguntas.show();

}

function verRespostas(questionarioId) {
    let questionario = window.questionarios.find(qs => qs.id == questionarioId);
    loading.show();
    let onsuccess = function (e) {
        questionario.respostas = JSON.parse(e.target.response);
        loading.hide();
        console.log(questionario.respostas)
        if (!questionario.respostas) {
            return;
        }

        document.getElementById('modal-respostas-title').innerHTML = `Respostas do questionário: ${questionario.titulo}`;
        let modalRespostas = new bootstrap.Modal(document.getElementById('modal-respostas'));

        let agrupadoPorPessoa = questionario.respostas.reduce((atual, acc) => {
            atual[acc.usuarioCadastro] = [...atual[acc.usuarioCadastro] || [], acc];
            return atual;
        }, {});

        let respostasHtml = "";
        let templateRowResposta = `<tr>
          <td class="align-top"><span>COL</span></td>
          <td><p>COL2</p></td>`;

        let templateUsuario = `<h3>NOME</h3><div class="table-responsive"><table class="table">
          <thead><tr>
          <th scope="col"  style="max-width: 80px;"><span>#</span></th>
          <th scope="col" style="min-width: 200px;"><span>Pergunta</span></th>
          </tr></thead>
          <tbody>`;

        for (let [index, value] of Object.keys(agrupadoPorPessoa).entries()) {
            let itemHtml = (templateUsuario.slice()).replace("NOME", value);

            agrupadoPorPessoa[value].map(function (resposta) {
                itemHtml += (templateRowResposta.slice())
                    .replace("COL2", `<p>${resposta.pergunta.descricao}</p><p><b>Resposta: </b> ${resposta.resposta}</p>`)
                    .replace("COL", resposta.id);

            });

            itemHtml += "</tbody></table></div>";
            respostasHtml += itemHtml;
        }

        document.getElementById('modal-respostas-body').innerHTML = respostasHtml;

        modalRespostas.show();


    }

    ajax.get(apiRoot + `/questionarios/${questionario.id}/respostas`, {},
        onsuccess,
        function (e) {
            loading.hide();
            toast.error("Não foi possível buscar as respostas desse questionário")
        }
    )
}

buscarQuestionarios()