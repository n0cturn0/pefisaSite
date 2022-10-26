$(document).ready(function ($) {

    // Validação
    $("#contact-newsletter").validate({
        rules: {
            txtEmail: {
                required: true,
                email: true
            }
        },
        messages: {
            txtEmail: {
                required: "Digite o seu  Email!",
                email: "Formato de e-mail inválido!"
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
            $('#btnNews').text('Aguarde...');
            $('#btnNews').attr("disabled", true);
            $.ajax({
                url: form.action,
                type: form.method,
                data: $(form).serialize(),
                async: false,
                success: function () {
                    $(form)[0].reset();
                    $('#NewsletterSent').removeClass('hidden').delay(5000).fadeOut();
                    $('#btnNews').text('Inscreva-se');
                    $('#btnNews').attr("disabled", false);
                },
                error: function () {
                    $('#NewsletterNotSent').removeClass('hidden').delay(5000).fadeOut();
                    $('#btnNews').text('Inscreva-se');
                    $('#btnNews').attr("disabled", false);
                }
            });
        }
    });

    function loadSubCategory(idCategory, menu) {

        $.ajax({
            type: "POST",
            url: "/admin/ajax/ProductsCategories/GetMenuListSubProductsCategories/",
            data: "idDadProductCategory=" + idCategory,
            beforeSend: function () {
                $(menu).html('<div class=\"panel-body\"><nav><ul class=\"nav nav-pills nav-stacked\"><li>Carregando...</li></ul> </nav></div>');
            },
            success: function (html) {
                $(menu).html(html);
            },
            error: function () {
                $(menu).html('<div class=\"panel-body\"><nav><ul class=\"nav nav-pills nav-stacked\"><li>Erro ao carregar</li></ul> </nav></div>');
            }
        });
    }

    $(".collapsable_disable").click(function (event) {
        var ncategory = this.getAttribute('data-rel');
        var smenu = this.getAttribute('data-bind');
        loadSubCategory(ncategory, '#' + smenu);
    });

});
