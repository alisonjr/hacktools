function buscarRespostas() {
    let onsuccess = function (e) {
        loading.hide();
        inserirItensNaTabela(JSON.parse(e.target.response));
    };

    let onerror = function (e) {
        loading.hide();
        toast.error("Não foi possível buscar as perguntas cadastradas")
    };

    loading.show();
    ajax.get(apiRoot + '/respostas',{}, onsuccess,onerror)
}

function inserirItensNaTabela(itens){
    itens.map(item =>{
        let row = document.getElementById("table-body").insertRow(0);
        row.insertCell(0).innerHTML = `<span>${item.id}<span>`;
        row.insertCell(1).innerHTML = `<span>${item.questionario.titulo}<span>`;
        row.insertCell(2).innerHTML = `<span>${item.pergunta.descricao}<span>`;
        row.insertCell(3).innerHTML = `<span>${item.resposta}<span>`;
        row.insertCell(4).innerHTML = `<span>${item.usuarioCadastro}<span>`;

    })

}
buscarRespostas()