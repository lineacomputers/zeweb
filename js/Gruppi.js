//$(document).ready(function () {
$(document).on('pagebeforeshow', '#gruppi', function () {
    var $ul = $("#listViewGruppi");
    html = "";
    $.ajax({
        type: "POST",
        url: "../Servizi/Documento.asmx/Gruppi",
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
            $.each(result.d, function (key, val) {
                
                html += "<li>" +
                            //"<a href=\"#\">" + key.split("|")[1] + " <span class=\"ui-li-count\">" + val + "</span></a>" +
                            "<a href=\"ProdottiInsert.html?GRUPPO=" + key.split("|")[0] + "\">" + key.split("|")[1] + " <span class=\"ui-li-count\">" + val + "</span></a>" +
                        "</li>";
            });
            
            $ul.html(html);

            $ul.listview("refresh");
            $ul.trigger("updatelayout");
        },
        error: function (request, error) {
            // This callback function will trigger on unsuccessful action                
            alert('Problemi di connessione con il servizio WEB!');
        }
    });
   
});



