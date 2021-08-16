function enviar(){
    let onsuccess = function (e){
        loading.hide();
        let mensagem = "Pergunta salva"

        if(JSON.parse(e.target.response).mensagem){
            mensagem = JSON.parse(e.target.response).mensagem;
        }
        toast.success(mensagem)
        limparFormulario()
    }

    let onerror = function (e) {
        loading.hide();
        let mensagem = "Não foi possível salvar a pergunta"

        if (JSON.parse(e.target.response).mensagem) {
            mensagem = JSON.parse(e.target.response).mensagem;
        }
        toast.error(mensagem)
    }

    loading.show();
    ajax.post(apiRoot + '/perguntas',
        JSON.stringify(Object.fromEntries(new FormData(document.querySelector('form')))),
        onsuccess,
        onerror
    )
}
function limparFormulario(){
    document.getElementById("usuario").value = "";
    document.getElementById("descricao").value = "";
}