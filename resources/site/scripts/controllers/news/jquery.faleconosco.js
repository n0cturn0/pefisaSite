$(document).ready(function ($) {

    $("#txtNome").focus();

    // Máscaras
    $("#txtTelefone").mask("(99)99999999?99");

    // Validação
    $("#contact-form").validate({
        rules: {
            txtNome: {
                required: true
            },
            txtEmail: {
                required: true,
                email: true
            },
            txtAssunto: {
                required: true
            },
            txtMensagem: {
                required: true
            }
        },
        messages: {
            txtNome: {
                required: "Digite o seu Nome Completo!"
            },
            txtEmail: {
                required: "Digite o seu  Email!",
                email: "Formato de e-mail inválido!"
            },
            txtAssunto: {
                required: "Digite o Motivo do contato!"
            },
            txtMensagem: {
                required: "Digite a sua Mensagem!"
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
        },
        submitHandler: function (form) {
            $('#btnSubmit').attr('value', 'Aguarde...');
            $.ajax({
                url: form.action,
                type: form.method,
                data: $(form).serialize(),
                async: false,
                success: function () {
                    $(form)[0].reset();
                    $('#MessageSent').removeClass('hidden').delay(5000).fadeOut();
                    $('#btnSubmit').attr('value', 'Enviar');
                    $('html, body').animate({
                        scrollTop: 0
                    }, 800);
                },
                error: function () {
                    $('#MessageNotSent').removeClass('hidden').delay(5000).fadeOut();
                    $('#btnSubmit').attr('value', 'Enviar');
                    $('html, body').animate({
                        scrollTop: 0
                    }, 800);
                }
            });
        }
    });
});

jQuery.validator.addMethod("telefone", function (value, element) {
    value = value.replace("(", "");
    value = value.replace(")", "");
    value = value.replace("-", "");
    return this.optional(element) || /[0-9]{10}/.test(value);
}, "Por favor, um telefone válido");