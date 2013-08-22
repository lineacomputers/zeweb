$(document).on('pagebeforeshow', '#login', function () {
    $(document).on('click', '#submit', function () { // catch the form's submit event
        if ($('#username').val().length > 0 && $('#password').val().length > 0) {

            localStorage.user = $('#username').val();
            localStorage.password = $('#password').val();
            $.ajax({
                type: "POST",
                url: "Servizi/Login.asmx/Check",
                data: JSON.stringify({ login: localStorage.user, password: localStorage.password }),
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
                    resultObject.formSubmitionResult = result;
                    if (result.d == "") {
                        alert("Utente o Password errati!!!");
                    }
                    else {
                        if (result.d == "AMM") {
                            $.mobile.changePage("./HTML/MenuAmministratore.html", { transition: "slide" });
                        }
                        else {
                            $.mobile.changePage("./HTML/Testata.html", { transition: "slide" });
                            //$.window.location.href = "../HTML/Testata.html";
                           
                        }
                    }
                },
                error: function (request, error) {
                    // This callback function will trigger on unsuccessful action                
                    alert('Problemi di connessione con il servizio WEB!');
                }
            });



        } else {
            alert('E\' necessario inserire tutti i campi!');
        }
        return false; // cancel original event to prevent form submitting
    });
});

$(document).on('pagebeforeshow', '#second', function () {
    $('#second [data-role="content"]').append('This is a result of form submition: ' + resultObject.formSubmitionResult);
});

var resultObject = {
    formSubmitionResult: null
}