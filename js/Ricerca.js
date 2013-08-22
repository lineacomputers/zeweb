//$(document).bind("pageinit", function () {
$(document).on('pagebeforeshow', '#prodottiinsert', function () {
    //bind an event handler to the search input for when it's value changes
    $('#search').bind("keyup change input", function (event, ui) {
        // When value of the input is not blank
        if ($(this).val() != "") {
            // Show only matching TR, hide rest of them
            $("#movie-table tbody>tr").hide();
            $("#movie-table td:contains-ci('" + $(this).val() + "')").parent("tr").show();
        }
        else {
            // When there is no input or clean again, show everything back
            $("#movie-table tbody>tr").show();
        }
    });
    
    // jQuery expression for case-insensitive filter
    $.extend($.expr[":"],
    {
        "contains-ci": function (elem, i, match, array) {
            return (elem.textContent || elem.innerText || $(elem).text() || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
        }
    });
   
});



