$(document).ready(function () {

    /* ==================
    Location
    ================== */

    if (idLocation1 != "") {
        loadSubLocation(idLocation1, idLocation2);
    }

    $("#txtLocation").change(
		function () {
		    if ($(this).val() != "") {
		        loadSubLocation($(this).val(), "");
		    }
		    else {
		        resetLocation();
		    }
		}
	)

    function loadSubLocation(idLocation, selectedValue) {

        $.ajax({
            type: "POST",
            url: "/admin/ajax/Locations/GetDropDownListSubLocations/",
            data: "selectedValue=" + selectedValue + "&idDadLocation=" + idLocation,
            beforeSend: function () {
                $("#txtSubLocation").html('<option value="">Carregando...</option>')
            },
            success: function (html) {
                $("#txtSubLocation").attr('disabled', false);
                $("#txtSubLocation").html(html);
            },
            error: function () {
                alert('Erro ao obter os estados!');
                resetLocation()
            }
        });
    }

    function resetLocation() {
        $("#txtLocation").val("");
        $("#txtSubLocation").val("");
        $("#txtSubLocation").attr('disabled', true);
    }

});