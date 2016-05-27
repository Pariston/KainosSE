/**
 * Created by Daniel on 27.05.2016.
 */
$().ready(function() {
    var clicker = $("#print");

    clicker.click(function() {
        $.ajax({
            url: 'secret/toys/print',
            type: 'GET',
            async: false,
            success: function (data) {
                alert(data);
            }
        });
    });
});
