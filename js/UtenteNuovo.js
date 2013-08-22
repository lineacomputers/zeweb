$(document).ready(function () {
    $(document).on('click', '#Salva', function () { // catch the form's submit event
        if ($('#username').val().length > 0 &&
            $('#password').val().length > 0 &&
            $('#Conferma_password').val().length > 0 &&
            $('#Email').val().length > 0) {
            if ($('#username').val().length != 8) {
                alert('Il codice utente deve essere di 8 caratteri!!');
            }
            else {
                if ($('#password').val() != $('#Conferma_password').val()) {
                    alert('Password e Conferma Password sono diversi!! ');
                }
                   else {
                    $.ajax({
                        type: "POST",
                        url: "../Servizi/Login.asmx/NewUser",
                        data: JSON.stringify({ login: $('#username').val(), password: $('#password').val(), email: $('#Email').val(), ruolo: "CLI" }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: true,
                        beforeSend: function () {
                            // This callback function will trigger before data is sent
                            $.mobile.showPageLoadingMsg(true); // This will show ajax spinner
                        },
                        complete: function () {
                            // This callback function will trigger on data sent/received complete
                            $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
                        },
                        success: function (result) {
                            if (result.d == "") {
                                alert("Utente inserito con successo");
                                $.mobile.changePage("../HTML/MenuAmministratore.html", { transition: "slideup", changeHash: false });
                            }
                            else {
                                alert("ATTENZIONE Utente già in anagrafica!!");
                            }
                        },
                        error: function (request, error) {
                            // This callback function will trigger on unsuccessful action                
                            alert('Problemi di connessione con il servizio WEB!');
                        }
                    });
                }
            }

        } else {
            alert('E\' necessario inserire tutti i campi!!');
        }
        return false; // cancel original event to prevent form submitting
    });
});

