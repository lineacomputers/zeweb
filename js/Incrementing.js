//$(function () {
$(document).on('pagebeforeshow', '#prodottiinsert', function () {
    $(".button").on("click", function () {
        var $button = $(this);
        
        var oldValue = $button.parent().parent().find("#quantita").val();
        
  
        if ($button.text().trim() == "+") {
            
            var newVal = parseFloat(oldValue) + 1;
        } else {
           
            // Don't allow decrementing below zero
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }

        $button.parent().parent().find("#quantita").val(newVal);

    });

});


