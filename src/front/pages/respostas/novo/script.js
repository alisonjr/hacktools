function init() {
    let url = new URL(window.location.href);
    let questioanrioId = url.searchParams.get("gid");
    if (questioanrioId) {
        document.getElementById("questionario.id").setAttribute("value", questioanrioId);
        buscarPerguntas(questioanrioId)
    } else {
        alert("é necessário selecionar um questionário para responder.");
    }


}


function buscarPerguntas(questionarioId) {
    let onsuccess = function (e) {
        loading.hide();
        inserirDadosNaTela(JSON.parse(e.target.response));
    };

    let onerror = function (e) {
        loading.hide();
        toast.error("Não foi possível buscar as perguntas do questionário")
    };

    loading.show();
    ajax.get(apiRoot + `/questionarios/${questionarioId}`, {}, onsuccess, onerror)
}

function inserirDadosNaTela(questionario) {

    document.getElementById("titulo-questionario").innerHTML = questionario.titulo;

    let template = `<div class="form-group"><label class="label" for="descricao">DESCRICAO</label>
              <textarea class="form-control" id="ID" name="ID" placeholder="Digite sua resposta"></textarea></div><hr/>`;
    let lista = document.getElementById('lista-perguntas');
    let html = "";

    questionario.perguntas.map(item => {
        let itemHtml = (template.slice()).replace("DESCRICAO", item.descricao).replaceAll("ID", item.id);
        html += itemHtml;
    })

    lista.innerHTML = html;

}

function enviar() {
    let erros = [];
    let respostas = montarObjetoParaEnviar();

    loading.show();
    console.log(respostas);
    respostas.map((resp) => {
        ajax.post(apiRoot + '/respostas', JSON.stringify(resp),
            function () {
            },
            function (e) {
                if (JSON.parse(e.target.response).mensagem) {
                    erros.push(JSON.parse(e.target.response).mensagem);
                } else {
                    erros.push("");
                }
            }
        );
    })

    setTimeout(function () {
        loading.hide();

        if (erros.length > 0) {
            toast.error(erros.join())
        }
        else{
            toast.success("Respostas salvas!")
        }

    }, 2000);


}

function montarObjetoParaEnviar() {
    let form = Object.fromEntries(new FormData(document.querySelector('form')));
    let questionarioId = form["questionario.id"];
    let lat = form.lat;
    let long = form.long;
    let usuarioCadastro = form.usuarioCadastro;
    let respostas = [];

    Object.entries(form).forEach(([key, value]) => {
        if (key !== "long" && key !== "lat" && key !== "questionario.id" && key !== "usuarioCadastro") {
            respostas.push({
                resposta: value,
                usuarioCadastro: usuarioCadastro,
                pergunta: {id: parseInt(key)},
                questionario: {id: parseInt(questionarioId)},
                localizacao: {lat: parseInt(lat), long: parseInt(long)}
            });
        }
    });
    return respostas;
}


function permissaoParaLocalizacao() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(() => {
            navigator.geolocation.getCurrentPosition(preencherLocalizacao)
        }, mostrarErros);
    } else {
        let novaMensagem = document.createElement('small');
        novaMensagem.innerHTML = "* A geolocalização não é compatível com este navegador. Por favor abra esse link em outro navegador."
        document.getElementById("mensagens").append(novaMensagem)
        document.getElementById("form").style.display = "none";
    }
}

function preencherLocalizacao(localizacao) {
    console.log(localizacao)
    document.getElementById("lat").setAttribute('value', localizacao.coords.latitude);
    document.getElementById("long").setAttribute('value', localizacao.coords.longitude);
}

function mostrarErros(error) {
    let novaMensagem = document.createElement('small');
    switch (error.code) {
        case error.PERMISSION_DENIED:
            novaMensagem.innerHTML = "* Você negou a permissão para sabermos sua localização. Por favor altere para 'permitir'."
            break;
        case error.POSITION_UNAVAILABLE:
            novaMensagem.innerHTML = "* As suas informações de localização não estão disponíveis. Por favor abra esse link em outro navegador."
            break;
        case error.TIMEOUT:
            novaMensagem.innerHTML = "* A solicitação para obter a sua localização expirou. Por favor atualize a página."
            break;
        default:
            novaMensagem.innerHTML = "* Ocorreu um erro desconhecido ao tentar ler sua localização. Por favor atualize a página."
            break;
    }

    document.getElementById("mensagens").append(novaMensagem);
    document.getElementById("form").style.display = "none";

}

permissaoParaLocalizacao();
init();
