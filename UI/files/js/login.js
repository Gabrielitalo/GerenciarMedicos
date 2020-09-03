var urlAPI = "https://localhost:44327/";
//---------------------------------------------------------------------------------------------------------------------------------------------
// Validar login

function validaLogin() {
    let user = document.getElementById("txtUsername").value;
    let pass = document.getElementById("txtPass").value;

    if (user && pass) {
        $.ajax({
            url: urlAPI + "api/ValidaLogin?username=" + user + "&pass=" + pass,
            dataType: "text",
            method: "GET",
            success: function (data) {
                var obj = JSON.parse(data);
                if (obj[0].Pk > 0) {

                    sessionStorage.setItem("Login", "Sucesso");
                    sessionStorage.setItem("FkUsuario", obj[0].Pk);
                    sessionStorage.setItem("User", obj[0].Usuario);

                    $(window.document.location).attr('href', 'index.html');
                } else {
                    document.getElementById("lbResultado").className = "alert alert-danger";
                }
            }
        });
    }
}