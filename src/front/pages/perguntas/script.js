function buscarPerguntas() {
    let onsuccess = function (e) {
        loading.hide();
        inserirItensNaTabela(JSON.parse(e.target.response));
    };

    let onerror = function (e) {
        loading.hide();
        toast.error("Não foi possível buscar as perguntas cadastradas")
    };

    loading.show();
    ajax.get(apiRoot + '/perguntas',{}, onsuccess,onerror)
}

function inserirItensNaTabela(itens){
    itens.map(item =>{
        let row = document.getElementById("table-body").insertRow(0);
        row.insertCell(0).innerHTML =  `<span>${item.id}</span>`;
        row.insertCell(1).innerHTML =  `<span>${item.descricao}</span>`;
        row.insertCell(2).innerHTML =  `<span>${item.usuario}</span>`;

    })

}
buscarPerguntas()