//$(document).ready(function () {
$(document).on('pagebeforeshow', '#prodottiinsert', function () {
    $("#ContatoreCarrello").html(localStorage.RigheNelCarrello);

     $(".InserisciDocButton").on("click", function () {
        

         var $tabella = $('#TabellaArticoliBody');
         var LI = new Array();
         var i = 0;

         $tabella.find('tr').each(function (index, element) {

             var $row = $(this);

             var cod_art = $row.find("#CodArt");
             var qta = $row.find("#quantita")

             if (qta.val() > 0) {

                 var obj = new Object();
                 obj.Codice = cod_art.html();
                 obj.Quantita = qta.val();
                 LI.push(obj);

                 $row.find("#quantita").val("0");
             }
         });

         //for (j = 0; j < LI.length; j++) {
         //    alert(LI[j].Codice + " " + LI[j].Quantita);
         //}

         $.ajax({
             type: "POST",
             url: "../Servizi/Documento.asmx/InserisciDocumento",
             data: JSON.stringify({ CLIENTE: localStorage.user, RigheDaInserire: LI }),
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
             success: function (response) {
                 //alert("Inserimento  " + response.d);

                 localStorage.RigheNelCarrello = response.d;
                 $("#ContatoreCarrello").html(localStorage.RigheNelCarrello);
             },
             error: function (error) {
                 alert("ERRORE " + error.status + ": " + error.statusText);
             }
         });

         //alert("fine");
     });

});






