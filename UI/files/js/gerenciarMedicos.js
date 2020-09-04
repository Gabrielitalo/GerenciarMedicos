//--------------------------------------------------------------------------------------------------------------------------------------------
var urlAPI = "https://localhost:44327/";
verificaLogin();
//--------------------------------------------------------------------------------------------------------------------------------------------
function verificaLogin() {
    let statusLogin = sessionStorage.getItem("Login");

    if (statusLogin !== "Sucesso") {
        window.location.href = "login.html";
    } else {
        retornaMedicos();
    }
}
//--------------------------------------------------------------------------------------------------------------------------------------------
function fazerLogout() {
    sessionStorage.removeItem("Login");
    verificaLogin();
}
//--------------------------------------------------------------------------------------------------------------------------------------------
function concatenaHtml(txt) {
    return txt = "'" + txt + "'";
}
//--------------------------------------------------------------------------------------------------------------------------------------------
function abrirModal(modal, del) {
    if (del !== "não") {
        limparModal();
    }
    $('#' + modal).modal('toggle');
}
//--------------------------------------------------------------------------------------------------------------------------------------------
// limpar modal
function limparModal() {
    document.getElementById("txtNomeMedico").value = "";
    document.getElementById("txtCrm").value = "";
    document.getElementById("txtTelefone").value = "";
    document.getElementById("txtVrConsulta").value = "";
    document.getElementById("pkMedico").value = "";
}
//--------------------------------------------------------------------------------------------------------------------------------------------
// retornar os médicos
function retornaMedicos() {
    let liveRow = document.getElementById("liveRow");

    $.ajax({
        url: urlAPI + "api/RetornaMedicos",
        data: {
            tipo: 0
        },
        dataType: "text",
        method: "GET",
        success: function (data) {
            var obj = JSON.parse(data);
            let i = 0,
                count = obj.length;
            let html = "";
            for (i = 0; i < count; i++) {
                // console.log(obj[i].Pk);
                html += '<div class="ml-2 mb-2 card custom-card"> <div class="card-body"><div class="row col">';
                html += '<a href="#" class="card-link"><i class="fa fa-trash" onclick="apagarMedico(' + concatenaHtml(obj[i].Pk) + ');"></i></a>';
                html += '<a href="#" class="card-link" onclick="abrirDetalhesMedico(' + concatenaHtml(obj[i].Pk) + ');"><i class="fa fa-search"></i></a>';
                html += '<h5 class="ml-2 card-title"> ' + obj[i].Nome + '</h5></div>';
                html += '<p class="card-text"><i class="fa fa-certificate"></i> ' + obj[i].Crm + '</p>';
                html += '<p class="card-text"><i class="fa fa-phone"></i> ' + obj[i].Telefone + '</p>';
                html += '<p class="card-text"><i class="fa fa-credit-card"></i> ' + obj[i].ValorConsulta + '</p>';
                html += '<a href="#" class="card-link" onclick="abrirVincularMedico(' + concatenaHtml(obj[i].Pk) + ');"><i class="fa fa-users"></i> Vincular consultório</a></div></div>';

            }
            liveRow.innerHTML = html;
        }
    });
}
//--------------------------------------------------------------------------------------------------------------------------------------------
// Apagar médico

function apagarMedico(pk) {
    $.ajax({
        url: urlAPI + "api/ExluirMedico?pkMedico=" + pk,
        dataType: "text",
        method: "DELETE",
        success: function (data) {
            retornaMedicos();
        }
    });
}
//--------------------------------------------------------------------------------------------------------------------------------------------
// Detalhes médico

function abrirDetalhesMedico(pk) {
    limparModal();
    $.ajax({
        url: urlAPI + "api/RetornaMedicos",
        data: {
            tipo: 1,
            pkMedico: pk
        },
        dataType: "text",
        method: "GET",
        success: function (data) {
            var obj = JSON.parse(data);
            document.getElementById("txtNomeMedico").value = obj[0].Nome;
            document.getElementById("txtCrm").value = obj[0].Crm;
            document.getElementById("txtTelefone").value = obj[0].Telefone;
            document.getElementById("txtVrConsulta").value = obj[0].ValorConsulta;
            document.getElementById("pkMedico").value = obj[0].Pk;

            abrirModal('modalEdit', 'não');
        }
    });
}
//--------------------------------------------------------------------------------------------------------------------------------------------
// Alterar médico

function alterarMedico() {
    let pk = document.getElementById("pkMedico").value;
    let nomeForm = document.getElementById("txtNomeMedico").value;
    let Crm = document.getElementById("txtCrm").value;
    let telefoneForm = document.getElementById("txtTelefone").value;
    let vrConsultaForm = document.getElementById("txtVrConsulta").value;

    if (pk) {
        $.ajax({
            url: urlAPI + "api/AlterarMedico?pkMedico=" + pk + "&nome=" + nomeForm + "&Crm=" + Crm + "&telefone=" + telefoneForm + "&valorConsulta=" + vrConsultaForm,
            dataType: "text",
            method: "PUT",
            success: function (data) {
                retornaMedicos();
            }
        });
    }
}
//--------------------------------------------------------------------------------------------------------------------------------------------
// Cadastrar médico

function cadastrarMedico() {
    let pk = document.getElementById("pkMedico").value;
    let nomeForm = document.getElementById("txtNomeMedico").value;
    let Crm = document.getElementById("txtCrm").value;
    let telefoneForm = document.getElementById("txtTelefone").value;
    let vrConsultaForm = document.getElementById("txtVrConsulta").value;

    if (!pk) {
        $.ajax({
            url: urlAPI + "api/CadastrarMedico?pkMedico=" + pk + "&nome=" + nomeForm + "&Crm=" + Crm + "&telefone=" + telefoneForm + "&valorConsulta=" + vrConsultaForm,
            dataType: "text",
            method: "POST",
            success: function (data) {
                retornaMedicos();
            }
        });
    }
}

//--------------------------------------------------------------------------------------------------------------------------------------------
// Validar salvar

function salvar() {
    let pk = document.getElementById("pkMedico").value;
    if (pk) {
        alterarMedico();
    } else {
        cadastrarMedico();
    }
    // Está com o toogle
    abrirModal('modalEdit', 'não');
}
//--------------------------------------------------------------------------------------------------------------------------------------------
// Ver médico consultório

function abrirVincularMedico(pk) {
    limparModal();
    $.ajax({
        url: urlAPI + "api/RetornaMedicos",
        data: {
            tipo: 2,
            pkMedico: pk
        },
        dataType: "text",
        method: "GET",
        success: function (data) {
            var obj = JSON.parse(data);
            if (obj.length > 0) {
                document.getElementById("pkMedicoVincula").value = obj[0].Pk;

                document.getElementById("txtNomeMedicoVincula").value = obj[0].Nome;
                document.getElementById("txtConsultorio1").value = obj[0].NomeConsultorio;
                document.getElementById("pkConsultorio1").value = obj[0].PkMovMedico;

                if (obj.length > 1) {
                    document.getElementById("txtConsultorio2").value = obj[1].NomeConsultorio;
                    document.getElementById("pkConsultorio2").value = obj[1].PkMovMedico;
                }


                abrirModal('modalVincular', 'não');
            }

        }
    });
}

//--------------------------------------------------------------------------------------------------------------------------------------------
// Vincular médico consultório

function salvarVinculo() {
    let pkMovMedico, pkMedico, pkConsultorio;

}
//--------------------------------------------------------------------------------------------------------------------------------------------
// cadastar vinculo médico com o consultório
function cadastrarVinculo(pkMovMedico, pkMedico, pkConsultorio){

    if(!pkMovMedico){
        pkMovMedico = 0;
    }

    if (pkMedico && pkConsultorio) {
        $.ajax({
            url: urlAPI + "api/GerenciarMedicoConsultorio?tipo=0&pk=" + pkMovMedico + "&pkConsultorio=" + pkConsultorio + "&pkMedico=" + pkMedico,
            dataType: "text",
            method: "POST",
            success: function (data) {
            }
        });
    }
}

//--------------------------------------------------------------------------------------------------------------------------------------------
// Excluir vinculo médico com o consultório

function excluirVinculo(v) {
    let Pk;
    let txt;

    if (v === "1") {
        Pk = document.getElementById("pkConsultorio1")
        txt = document.getElementById("txtConsultorio1");
    } else {
        Pk = document.getElementById("pkConsultorio2");
        txt = document.getElementById("txtConsultorio2");
    }

    if (Pk) {
        $.ajax({
            url: urlAPI + "api/GerenciarMedicoConsultorio?tipo=1&pk=" + Pk.value,
            dataType: "text",
            method: "POST",
            success: function (data) {
                Pk.value = "";
                txt.value = "";
            }
        });
    }

}