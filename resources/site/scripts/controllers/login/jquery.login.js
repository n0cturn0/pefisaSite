$(document).ready(function ($) {

    $("#txtEmail").focus();

    // Validação
    $("#frmLogin").validate({
        errorPlacement: function (label, element) {
            label.addClass('arrow');
            label.insertAfter(element);
        },
        wrapper: 'span',
        rules: {
            txtEmail: {
                required: true,
                email: true
            },
            txtPassword: {
                required: true
            }
        },
        messages: {
            txtEmail: {
                required: "Digite o seu  Email!",
                email: "Formato de e-mail inválido!"
            },
            txtPassword: {
                required: "Digite a sua senha!",
            }
        },
        highlight: function (element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function (error, element) {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });

});