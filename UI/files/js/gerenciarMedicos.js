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

    document.getElementById("txtConsultorio1").value = "";
    document.getElementById("pkConsultorio1").value = "";
    document.getElementById("txtConsultorio2").value = "";
    document.getElementById("pkConsultorio2").value = "";
    document.getElementById("txtNomeMedicoVincula").value = "";
    document.getElementById("pkMedicoVincula").value = "";

    document.getElementById("txtConsultorio1").setAttribute("disabled", "");
    document.getElementById("txtConsultorio2").setAttribute("disabled", "");


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
                html += '<a href="#" class="card-link" onclick="abrirVincularMedico(' + concatenaHtml(obj[i].Pk) + ', ' + concatenaHtml(obj[i].Nome) + ');"><i class="fa fa-users"></i> Vincular consultório</a></div></div>';

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


    if (!Crm) {
        alert("Digite o CRM.");
        return;
    }

    if (!pk) {
        $.ajax({
            url: urlAPI + "api/CadastrarMedico?pkMedico=" + pk + "&nome=" + nomeForm + "&Crm=" + Crm + "&telefone=" + telefoneForm + "&valorConsulta=" + vrConsultaForm,
            dataType: "text",
            method: "POST",
            success: function (data) {
                alert(data);
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

function abrirVincularMedico(pk, nome) {
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

                document.getElementById("txtConsultorio1").value = obj[0].NomeConsultorio;
                document.getElementById("pkConsultorio1").value = obj[0].FkCadConsultorio;

                if (obj.length > 1) {
                    document.getElementById("txtConsultorio2").value = obj[1].NomeConsultorio;
                    document.getElementById("pkConsultorio2").value = obj[1].FkCadConsultorio;
                }
            }
            document.getElementById("txtNomeMedicoVincula").value = nome;
            document.getElementById("pkMedicoVincula").value = pk;

            abrirModal('modalVincular', 'não');

        }
    });
}

//--------------------------------------------------------------------------------------------------------------------------------------------
// cadastar vinculo médico com o consultório
function cadastrarVinculo(v) {

    let pkMedico = document.getElementById("pkMedicoVincula").value;
    let pkConsultorio = document.getElementById("pkConsultorio" + v).value;

    if (pkMedico && pkConsultorio) {
        $.ajax({
            url: urlAPI + "api/GerenciarMedicoConsultorio?tipo=0&pkConsultorio=" + pkConsultorio + "&pkMedico=" + pkMedico,
            dataType: "text",
            method: "POST",
            success: function (data) {
                alert(data);
            }
        });
    }
}
//--------------------------------------------------------------------------------------------------------------------------------------------
// alterar vinculo médico com o consultório
function alterarVinculo(v) {

    let pkMedico = document.getElementById("pkMedicoVincula").value;
    let pkConsultorio = document.getElementById("pkConsultorio" + v).value;


    if (pkMedico && pkConsultorio) {
        $.ajax({
            url: urlAPI + "api/GerenciarMedicoConsultorio?tipo=2&pkConsultorio=" + pkConsultorio + "&pkMedico=" + pkMedico,
            dataType: "text",
            method: "POST",
            success: function (data) {
                console.log(data);

            }
        });
    }
}

//--------------------------------------------------------------------------------------------------------------------------------------------
// Excluir vinculo médico com o consultório

function excluirVinculo(v) {

    let pkMedico = document.getElementById("pkMedicoVincula");
    let pkConsultorio = document.getElementById("pkConsultorio" + v);
    let txt = document.getElementById("txtConsultorio" + v);

    if (pkConsultorio.value && pkMedico.value) {
        $.ajax({
            url: urlAPI + "api/GerenciarMedicoConsultorio?tipo=1&pkConsultorio=" + pkConsultorio.value + "&pkMedico=" + pkMedico.value,
            dataType: "text",
            method: "POST",
            success: function (data) {
                pkConsultorio.value = "";
                txt.value = "";
                txt.removeAttribute("disabled");
            }
        });
    }
    else{
        txt.removeAttribute("disabled");
        
    }

}