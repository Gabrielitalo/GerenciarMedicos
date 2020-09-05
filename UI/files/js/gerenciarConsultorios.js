var urlAPI = "https://localhost:44327/";
verificaLogin();
//--------------------------------------------------------------------------------------------------------------------------------------------

function verificaLogin() {
  let statusLogin = sessionStorage.getItem("Login");

  if (statusLogin !== "Sucesso") {
    window.location.href = "login.html";
  } else {
    retornaConsultorios();
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
  document.getElementById("txtNomeConsultorio").value = "";
  document.getElementById("txtEndereco").value = "";
  document.getElementById("txtTelefone").value = "";
  document.getElementById("pkConsultorio").value = "";

  document.getElementById("medicoAtende").innerHTML = "";
}
//--------------------------------------------------------------------------------------------------------------------------------------------
// retornar os consultórios
function retornaConsultorios() {
  let liveRow = document.getElementById("liveRow");
  $.ajax({
    url: urlAPI + "api/RetornaConsultorios?tipo=0",
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
        html += '<a href="#" class="card-link"><i class="fa fa-trash" onclick="apagarConsultorio(' + obj[i].Pk + ');"></i></a>';
        html += '<a href="#" class="card-link" onclick="abrirDetalhesConsultorio(' + concatenaHtml(obj[i].Pk) + ');"><i class="fa fa-search"></i></a>';
        html += '<h5 class="ml-2 card-title"> ' + obj[i].Nome + '</h5></div>';
        html += '<p class="card-text"><i class="fa fa-envelope-square"></i> ' + obj[i].Endereco + '</p>';
        html += '<p class="card-text"><i class="fa fa-phone"></i> ' + obj[i].Telefone + '</p></div></div>';

      }
      liveRow.innerHTML = html;
    }
  });
}
//--------------------------------------------------------------------------------------------------------------------------------------------
// Apagar consultório

function apagarConsultorio(pk) {
  $.ajax({
    url: urlAPI + "api/ExluirConsultorio?pkConsultorio=" + pk,
    dataType: "text",
    method: "DELETE",
    success: function (data) {
      retornaConsultorios();
    }
  });
}
//--------------------------------------------------------------------------------------------------------------------------------------------
// Detalhes consultório

function abrirDetalhesConsultorio(pk) {
  limparModal();
  $.ajax({
    url: urlAPI + "api/RetornaConsultorios",
    data: {
      tipo: 1,
      pkConsultorio: pk
    },
    dataType: "text",
    method: "GET",
    success: function (data) {
      var obj = JSON.parse(data);
      document.getElementById("txtNomeConsultorio").value = obj[0].Nome;
      document.getElementById("txtEndereco").value = obj[0].Endereco;
      document.getElementById("txtTelefone").value = obj[0].Telefone;
      document.getElementById("pkConsultorio").value = obj[0].Pk;
      // Busca os médicos vinculados ao consultório
      buscaMedicosConsultorio(pk);

      abrirModal('modalEdit', 'não');
    }
  });
}
//--------------------------------------------------------------------------------------------------------------------------------------------
// Alterar consultório

function alterarConsultorio() {
  let pk = document.getElementById("pkConsultorio").value;
  let nomeForm = document.getElementById("txtNomeConsultorio").value;
  let enderecoForm = document.getElementById("txtEndereco").value;
  let telefoneForm = document.getElementById("txtTelefone").value;

  if (pk) {
    $.ajax({
      url: urlAPI + "api/AlterarConsultorio?pkConsultorio=" + pk + "&nome=" + nomeForm + "&endereco=" + enderecoForm + "&telefone=" + telefoneForm,
      // data: { pkConsultorio: pk, nome: nomeForm, endereco: enderecoForm, telefone: telefoneForm},
      dataType: "text",
      method: "PUT",
      success: function (data) {
        retornaConsultorios();
      }
    });
  }
}
//--------------------------------------------------------------------------------------------------------------------------------------------
// Cadastrar consultório

function cadastrarConsultorio() {
  let pk = document.getElementById("pkConsultorio").value;
  let nomeForm = document.getElementById("txtNomeConsultorio").value;
  let enderecoForm = document.getElementById("txtEndereco").value;
  let telefoneForm = document.getElementById("txtTelefone").value;

  if (!enderecoForm) {
    alert("Digite o endereço.")
    return;
  }
  if (!telefoneForm) {
    alert("Digite o telefone.")
    return;
  }
  if (!pk) {
    $.ajax({
      url: urlAPI + "api/CadastrarConsultorio?pkConsultorio=" + pk + "&nome=" + nomeForm + "&endereco=" + enderecoForm + "&telefone=" + telefoneForm,
      dataType: "text",
      method: "POST",
      success: function (data) {
        alert(data);
        retornaConsultorios();
      }
    });
  }
}

//--------------------------------------------------------------------------------------------------------------------------------------------
// Validar salvar

function salvar() {
  let pk = document.getElementById("pkConsultorio").value;
  if (pk) {
    alterarConsultorio();
  } else {
    cadastrarConsultorio();
  }
  // Está com o toogle
  abrirModal('modalEdit', 'não');

}
//--------------------------------------------------------------------------------------------------------------------------------------------
// Verifica quais médicos estão vinculado ao consultório

function buscaMedicosConsultorio(pk) {
  let medicoAtende = document.getElementById("medicoAtende");

  $.ajax({
    url: urlAPI + "api/RetornaMedicos",
    data: {
      tipo: 3,
      pkConsultorio: pk
    },
    dataType: "text",
    method: "GET",
    success: function (data) {
      var obj = JSON.parse(data);
      let count = obj.length;
      let i, html;
      if (medicoAtende) {
        html = "";
        if (count > 0) {
          for (i = 0; i < count; i++) {
            html += '<div class="card mb-2"><div class="card-body">';
            html += '<h6 class="card-title">' + obj[i].Nome + '</h6>';
            html += '<h6 class="card-subtitle mb-2 text-muted">CRM: ' + obj[i].Crm + '</h6></div></div>';
          }
        }
        else {
          html += '<h6 class="mt-2 card-subtitle mb-2 text-muted">Nenhum médico vinculado</h6></div></div>';
        }
        medicoAtende.innerHTML = html;
      }
    }
  });
}