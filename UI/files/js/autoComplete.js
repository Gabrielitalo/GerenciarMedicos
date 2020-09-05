var urlAPI = "https://localhost:44327/";

// Isso força do foco no evento onblur do autocomplete
function focar(el)
{
  var x = el.querySelectorAll("input");
  el.removeAttribute("OnClick");
  x[1].onblur();
}

function autoCompleteCadConsultorios(campo, hidden, listResult)
{
  $.ajaxSetup({ cache: false });
  $('#' + campo).keyup(function ()
  {
    $('#' + listResult).html('');
    $('#state').val('');
    var searchField = $('#' + campo).val();
    var expression = new RegExp(searchField, "i");

    if (searchField.length <= 1)
    {
      return;
    }

    $.ajax({
      type: "GET",
      contentType: "application/json; charset=utf-8",
      url: urlAPI + "api/RetornaConsultorios?tipo=0&texto=" + searchField,
      success: function (data)
      {
        $("#" + listResult).html('');
        if (!data){
            return;
        }

        $.each(data, function (key, value)
        {
          if (value.Nome.search(expression) !== -1 || value.Pk.search(expression) !== -1)
          {
            $('#' + listResult).append('<li class="list-group-item link-class"> ' + value.Nome + ' | <span class="text-muted">' + value.Pk + '</span> </li>');
          }
        });

      }
    });
  });

  $('#' + listResult).on('click', 'li', function ()
  {
    var click_text = $(this).text().split('|');
    $('#' + campo).val($.trim(click_text[0]));
    $("#" + listResult).html('');

    $("#" + hidden).val($.trim(click_text[1]));

  });

}
