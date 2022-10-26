$(document).ready(function () {

    $('#frmenquete').validate({
        rules: {
            idAnswer: {
                required: true
            }
        },
        messages: {
            idAnswer: {
                required: "Selecione uma resposta!"
            }
        },
        submitHandler: function (form) {
            $.ajax({
                url: '/ajax/surveyvote/vote/',
                data: $(form).serialize(),
                type: 'POST',
                success: function (resp) {
                    if (resp == "true") {
                        alert('Voto incluído com sucesso!');
                    } else {
                        alert('É permitido apenas um voto por enquete.');
                    }
                }
            });
        }
    });

});