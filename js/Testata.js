//$(document).ready(function () {
$(document).on('pagebeforeshow', '#testata', function () {
    var $ul = $("#DetCorpo");
    html = "";


    $.ajax({
        type: "POST",
        url: "../Servizi/Documento.asmx/InizializzaDocumento",
        data: JSON.stringify({ CLIENTE: localStorage.user}),
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
            
            $('#TipoDocumento').html("Carrello (" + result.d.DescrizioneDocumento + ")");
            $('#Descrizione').html(result.d.STDT_Destinazione.Descrizione);
            $('#Indirizzo').html(result.d.STDT_Destinazione.Indirizzo);
            $('#LocalitaProvincia').html(result.d.STDT_Destinazione.Localita + " " + result.d.STDT_Destinazione.Provincia);
            $('#DescrizionePagamento').html(result.d.DescrizionePagamento);
            $('#Esposizione .ui-btn-text').html("Esposizione: € " + result.d.Esposizione);
            $('#TotInponibile .ui-btn-text').html("Imponibile € " + result.d.TotaleImponibile);
            $('#TotQta .ui-btn-text').html("Quantità " + result.d.TotaleQuantita);
            $('#TotRighe .ui-btn-text').html("Righe " + result.d.NumeroRigheDocumento);
            
            localStorage.RigheNelCarrello = result.d.NumeroRigheDocumento;

            $.each(result.d.STDT_Docrig, function (i, val) {
                html += "<tr>" +
                        "<th class=\"ui-table-priority-4\" style =\"text-align:left\">" + val.CodiceArticolo + "</th>" +
                        "<td class=\"ui-table-priority-1\" style =\"text-align:left\">" + val.Descrizione + "</td>" +
                        "<td class=\"ui-table-priority-1\" style =\"text-align:left\">" + val.UnitaMisura + "</td>" +
                        "<td class=\"ui-table-priority-1\" style =\"text-align:right\">" + val.Quantita + "</td>" +
                        "<td class=\"ui-table-priority-2\" style =\"text-align:right\">" + val.PrezzoUnitario + "</td>" +
                        "<td class=\"ui-table-priority-3\" style =\"text-align:right\">" + val.Sconti + "</td>" +
                        "<td class=\"ui-table-priority-2\" style =\"text-align:right\">" + val.TotaleRiga + "</td>" +
                        "<td class=\"ui-table-priority-1\" style =\"text-align:right\">" +
                        "<a href=\"~/Documento/EliminaRiga?NumeroRiga=@Riga.NumeroRiga\" data-icon=\"delete\" data-role=\"button\" data-iconpos=\"notext\" data-theme=\"c\" data-inline=\"true\">Elimina Riga</a>" +
                        "</td>" +
                    "</tr>";
            });

            $ul.html(html);

            //$ul.trigger("updatelayout");
            $ul.trigger('create');
            $ul.trigger("updatelayout");
           
            
 


        },
        error: function (request, error) {
            // This callback function will trigger on unsuccessful action                
            alert('Problemi di connessione con il servizio WEB!');
        }
    });
});

