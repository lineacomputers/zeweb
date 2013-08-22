//$(document).ready(function () {
$(document).on('pagebeforeshow', '#testata', function () {
    $('#EC-collaspible').bind('expand', function () {
        var $ul = $("#DetEC");
        html = "";
        $.ajax({
            type: "POST",
            url: "../Servizi/Documento.asmx/EstrattoConto",
            data: JSON.stringify({ CLIENTE: localStorage.user }),
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
            },
            success: function (result) {
                $.each(result.d, function (i, val) {
                    html += "<tr>" +
                                "<th class=\"ui-table-priority-4\" style =\"text-align:left\">" + val.CodiceDocumento + "</th>" +
                                "<td class=\"ui-table-priority-3\" style =\"text-align:left\">" + val.NumeroDocumento + "</td>" +
                                "<td class=\"ui-table-priority-2\" style =\"text-align:left\">" + val.DataDocumento + "</td>" +
                                "<td class=\"ui-table-priority-1\" style =\"text-align:left\">" + val.DataScadenza + "</td>" +
                                "<td class=\"ui-table-priority-1\" style =\"text-align:right\">" + val.ImportoScadenza + "</td>" +
                            "</tr>";
                });

                $ul.html(html);

     
                //$ul.listview("refresh");
                $ul.trigger('create');
                $ul.trigger("updatelayout");


            },
            error: function (request, error) {
                // This callback function will trigger on unsuccessful action                
                alert('Problemi di connessione con il servizio WEB!');
            }
        });
    })
});



