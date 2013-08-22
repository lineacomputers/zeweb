//$(document).ready(function () {
$(document).on('pagebeforeshow', '#prodottiinsert', function () {
    
    var LETTERA = "";
    var GRUPPO = "";

    //alert(location.search + "   " + location.search.split("=")[0].substring(1) + "   " + location.search.split("=")[1])

    if (location.search.split("=")[0].substring(1).trim() == "LETTERA") {
        LETTERA = location.search.split("=")[1];
    }
    else {
        GRUPPO = location.search.split("=")[1];
    }

 
    var $ul = $("#TabellaArticoliBody");
    html = "";
    $.ajax({
        type: "POST",
        url: "../Servizi/Documento.asmx/ProdottiInsert",
        data: JSON.stringify({ CLIENTE: localStorage.user, GRUPPO: GRUPPO, Lettera: LETTERA }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () {
            // This callback function will trigger before data is sent
            $.mobile.showPageLoadingMsg(true); // This will show ajax spinner
        },
        complete: function () {
            // This callback function will trigger on data sent/received complete
            $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
            $(".ui-table-columntoggle-btn").hide();
        },
        success: function (result) {
            $.each(result.d, function (i, val) {
                html += "<tr>" +
                    "<th class=\"ui-table-priority-4 \" id=\"CodArt\" style =\"text-align:left\">" + val.CodiceArticolo + "</th>" +
                    "<td class=\"ui-table-priority-1 \" style =\"text-align:left\">" + val.Descrizione + "</td>" +
                    "<td class=\"ui-table-priority-3 \" style =\"text-align:left\">" + val.DescrizioneGruppo + "</td>" +
                    "<td class=\"ui-table-priority-3 \" style =\"text-align:left\">" + val.Giacenza + "</td>" +
                    "<td class=\"ui-table-priority-2 \" style =\"text-align:right\">" + val.Prezzo + "</td>" +
                    "<td class=\"ui-table-priority-4 \" style =\"text-align:left\">" + val.UM + "</td>" +
                    "<td class=\"ui-table-priority-4 \" style =\"text-align:right\">" +
                        "<a class=\"inc button\" data-icon=\"plus\" data-role=\"button\" data-iconpos=\"notext\"  data-inline=\"true\">+</a>" +
                    "</td>" +
                    "<td class=\"ui-table-priority-1 \" style =\"text-align:right\">" +
                        "<input type=\"text\" value=\"0\" id=\"quantita\" name=\"["+i+"].Quantità\" data-val-required=\"Il campo Quantità obbligatorio.\" data-val-number=\"Il campo Quantità deve essere un numero.\" data-val=\"true\">" +
                    "</td>" +
                    "<td class=\"ui-table-priority-4 \" style =\"text-align:left\">" +
                        "<a class=\"dec button\" data-icon=\"minus\" data-role=\"button\" data-iconpos=\"notext\"  data-inline=\"true\">-</a>" +
                    "</td>" +
                    "<td class=\"ui-table-priority-1 \"  style =\"text-align:right\">" +
                        "<a href=\"ProdottiDettaglio.html\" data-icon=\"arrow-r\" data-role=\"button\" data-iconpos=\"notext\"  data-inline=\"true\"></a>" +
                    "</td>" +
                  "</tr>";
            });
            
            $ul.html(html);
            
            //$ul.listview("refresh");
            $ul.trigger('create');
            $ul.trigger("updatelayout");
            //$ul.trigger('refresh');
            
        },
        error: function (request, error) {
            // This callback function will trigger on unsuccessful action                
            alert('Problemi di connessione con il servizio WEB! ProdottiInsert   ' + "ERRORE " + error.status + ": " + error.statusText);
        }
    });
   
});



