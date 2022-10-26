$(document).ready(function () {
    $(function () {
        $('.circular').hide();
        $('.tipoestribo').change(function () {
            if ($('.tipoestribo').val() == 'Circular') {
                $('.retangular').hide();
                $('.circular').show();
            } else {
                $('.retangular').show();
                $('.circular').hide();
            }
        });
    });

    $("#form-carrinho").validate({
        errorPlacement: function (label, element) {
            label.addClass('arrow');
            label.insertAfter('.quantity-adder');
        },
        wrapper: 'span',
        rules: {
            quantity: {
                required: true,
                number: true,
                min: parseInt(qtdMin)
            }
        },
        messages: {
            quantity: {
                required: "Digite a quantidade!",
                number: "Digite apenas números",
                min: "A quantidade mínima para compra ou orçamento deste produto é " + qtdMin
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
            var contexto = $("#form-carrinho");
            adicionarAoCarrinho(contexto);
        }

    });
});