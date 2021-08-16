
function buscarPerguntas() {
    let onsuccess = function (e) {
        loading.hide();
        inserirPerguntasNaTela(JSON.parse(e.target.response));
    };

    let onerror = function (e) {
        loading.hide();
        toast.error("Não foi possível buscar as perguntas cadastradas")
    };

    loading.show();
    ajax.get(apiRoot + '/perguntas', {}, onsuccess, onerror)
}

function inserirPerguntasNaTela(itens) {
    itens.map(item => {
        let template = `<div class="form-check form-switch py-2">
			<input class="form-check-input" type="checkbox" id="ID" name="ID"><p class="m-0">DESCRICAO</p></div><hr class="m-0" />`;
        let lista = document.getElementById('lista-perguntas');
        let html = "";
        itens.map(item => {
            let itemHtml = (template.slice()).replace("DESCRICAO", item.descricao).replaceAll("ID", item.id);
            html += itemHtml;
        })

        lista.innerHTML = html;
    })

}
function enviar() {
    let onsuccess = function (e) {
        loading.hide();
        let mensagem = "Pergunta salva";

        if (JSON.parse(e.target.response).mensagem) {
            mensagem = JSON.parse(e.target.response).mensagem;
        }
        toast.success(mensagem);
        limparFormulario();
    }

    let onerror = function (e) {
        loading.hide();
        let mensagem = "Não foi possível salvar o questionario";

        if (JSON.parse(e.target.response).mensagem) {
            mensagem = JSON.parse(e.target.response).mensagem;
        }
        toast.error(mensagem);
    }

    let dados = montarObjetoParaEnviar();
    loading.show();
    ajax.post(apiRoot + '/questionarios', JSON.stringify(dados), onsuccess, onerror);
}

function montarObjetoParaEnviar(){
    let form = Object.fromEntries(new FormData(document.querySelector('form')));
    let perguntas = [];

    Object.entries(form).forEach(([key, value]) => {
        if (key !== "titulo" && key !== "usuarioCadastro" ) {
            perguntas.push({id: parseInt(key)});
        }
    });

    form.perguntas = perguntas;
    return form;
}

buscarPerguntas()