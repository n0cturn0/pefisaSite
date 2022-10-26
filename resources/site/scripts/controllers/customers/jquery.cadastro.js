$(document).ready(function ($) {

    $("#txtName").focus();

    // Máscaras
    $("#txtPhoneNumber").mask("(99)99999999?99");
    $("#txtBirthday").mask("99/99/9999");
    $("#txtCompanyPhoneNumber").mask("(99)99999999?99");
    $("#txtHousePhoneNumber").mask("(99)99999999?99");
    $("#txtMobile").mask("(99)99999999?99");

    function onlyNumbers(cpfcnpj) {
        return cpfcnpj.toString().replace(/\D/g, "").substr(0, 14);
    }

    function mascaraCPFCNPJ(cpfcnpj) {
        var CPFCNPJformatado = "";
        var fcpfcnpj = onlyNumbers(cpfcnpj);

        if (IsCpf(fcpfcnpj)) {
            CPFCNPJformatado = fcpfcnpj.substr(0, 3) + "." + fcpfcnpj.substr(3, 3) + "." + fcpfcnpj.substr(6, 3) + "-" + fcpfcnpj.substr(9, 2);
        }
        else if (IsCnpj(fcpfcnpj)) {
            CPFCNPJformatado = fcpfcnpj.substr(0, 2) + "." + fcpfcnpj.substr(2, 3) + "." + fcpfcnpj.substr(5, 3) + "/" + fcpfcnpj.substr(8, 4) + "-" + fcpfcnpj.substr(12, 2);
        } else {
            CPFCNPJformatado = fcpfcnpj
        }
        return CPFCNPJformatado;
    }

    var cpfcnpjDom = $("#txtCNPJIdentity");
    $(cpfcnpjDom).keyup(function () {

        var cpfcnpjNumber = cpfcnpjDom.val();

        cpfcnpjDom.val(mascaraCPFCNPJ(cpfcnpjNumber));

    });


    function mascaraCEP(cep) {
        var CEPformatado = "";
        var fcep = cep;

        if (fcep.length == 8 && fcep.match(/^\d+$/)) {
            CEPformatado = fcep.substr(0, 5) + "-" + fcep.substr(5, 3);
        } else {
            CEPformatado = fcep
        }
        return CEPformatado;
    }

    function loadEstados(idLocation, selectedValue) {

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

    var cepDom = $("#txtZipCode");
    $(cepDom).keyup(function () {

        var cepNumber = cepDom.val();

        cepDom.val(mascaraCEP(cepNumber));

        if (cepNumber.length === 8 && cepNumber.match(/^\d+$/)) {
            var data = {
                "cep": cepNumber
            };
            data = $.param(data);

            $.ajax({
                type: "POST",
                url: "/admin/ajax/Locations/BuscaCep/",
                data: data,
                dataType: "json",
                beforeSend: function() {
                    $(".searchaddress").attr("class", "glyphicon glyphicon-hourglass form-control-feedback searchaddress");
                },
                success: function(data, status) {
                    $(".address").val(data["Street"]);
                    $(".borough").val(data["District"]);
                    $(".city").val(data["City"]);
                    $(".country").val("1");
                    loadEstados("1", data["Id"]);
                    $(".searchaddress").attr("class", "glyphicon glyphicon-search form-control-feedback searchaddress");
                },
                error: function() {
                    alert('Não foi possível localizar o CEP');
                    $(".searchaddress").attr("class", "glyphicon glyphicon-search form-control-feedback searchaddress");
                }
            });
        }

    });

    var email = $("#txtEmail").val();

    // Validação
    $("#frmcadastro").validate({
        rules: {
            txtName: {
                required: true
            },
            txtCompanyName: {
                required: true
            },
            txtEmail: {
                required: true,
                email: true,
                remote: {
                    url: "/ajax/customers/emailexists/",
                    type: "post",
                    data: {
                        email: function () {
                            return email;
                        }
                    }
                }
            },
            txtCNPJIdentity: {
                required: true,
                cpfcnpj: true
            },
            txtPhoneNumber: {
                required: true,
                telefone: true
            },
            txtZipCode: {
                required: true
            },
            txtAddress: {
                required: true
            },
            txtAddressNumber: {
                required: true
            },
            txtBorough: {
                required: true
            },
            txtCity: {
                required: true
            },
            txtLocation: {
                required: true
            },
            txtSubLocation: {
                required: true
            },
            txtPassword: {
                required: true,
                minlength: 4
            },
            txtNewPassword: {
                required: false,
                minlength: 4
            }
        },
        messages: {
            txtName: {
                required: "Digite o seu Nome Completo!"
            },
            txtCompanyName: {
                required: "Digite a Razão Social da Empresa!"
            },
            txtEmail: {
                required: "Digite o seu  Email!",
                email: "Formato de e-mail inválido!",
                remote: "O Email digitado já foi cadastrado anteriormente!"
            },
            txtCNPJIdentity: {
                required: "Digite o seu CPF ou CNPJ!"
            },
            txtPhoneNumber: {
                required: "Digite o DDD e o Telefone!"
            },
            txtZipCode: {
                required: "Digite o seu CEP!"
            },
            txtAddress: {
                required: "Digite o seu Endereço!"
            },
            txtAddressNumber: {
                required: "Digite o número!"
            },
            txtBorough: {
                required: "Digite o seu Bairro!"
            },
            txtCity: {
                required: "Digite a sua Cidade!"
            },
            txtLocation: {
                required: "Selecione o seu País!"
            },
            txtSubLocation: {
                required: "Selecione o seu Estado!"
            },
            txtPassword: {
                required: "Digite a Senha!",
                minlength: "Digite no mínimo 4 letras e/ou números!"
            },
            txtNewPassword: {
                minlength: "Digite no mínimo 4 letras e/ou números!"
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

function IsCnpj (cnpj) {
    cnpj = jQuery.trim(cnpj);

    // DEIXA APENAS OS NÚMEROS
    cnpj = cnpj.replace('/', '');
    cnpj = cnpj.replace('.', '');
    cnpj = cnpj.replace('.', '');
    cnpj = cnpj.replace('-', '');

    var numeros, digitos, soma, i, resultado, pos, tamanho, digitos_iguais;
    digitos_iguais = 1;

    if (cnpj.length < 14 && cnpj.length < 15) {
        return false;
    }
    for (i = 0; i < cnpj.length - 1; i++) {
        if (cnpj.charAt(i) != cnpj.charAt(i + 1)) {
            digitos_iguais = 0;
            break;
        }
    }

    if (!digitos_iguais) {
        tamanho = cnpj.length - 2
        numeros = cnpj.substring(0, tamanho);
        digitos = cnpj.substring(tamanho);
        soma = 0;
        pos = tamanho - 7;

        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0)) {
            return false;
        }
        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1)) {
            return false;
        }
        return true;
    } else {
        return false;
    }
}

function IsCpf (value) {
    value = jQuery.trim(value);

    value = value.replace('.', '');
    value = value.replace('.', '');
    cpf = value.replace('-', '');
    if (cpf.length == 11 && $.isNumeric(cpf)) {
        while (cpf.length < 11) cpf = "0" + cpf;
        var expReg = /^0+$|^1+$|^2+$|^3+$|^4+$|^5+$|^6+$|^7+$|^8+$|^9+$/;
        var a = [];
        var b = new Number;
        var c = 11;
        for (i = 0; i < 11; i++) {
            a[i] = cpf.charAt(i);
            if (i < 9) b += (a[i] * --c);
        }
        if ((x = b % 11) < 2) { a[9] = 0 } else { a[9] = 11 - x }
        b = 0;
        c = 11;
        for (y = 0; y < 10; y++) b += (a[y] * c--);
        if ((x = b % 11) < 2) { a[10] = 0; } else { a[10] = 11 - x; }
        if ((cpf.charAt(9) != a[9]) || (cpf.charAt(10) != a[10]) || cpf.match(expReg)) return false;
        return true;
    }
    else
        return false;
}

jQuery.validator.addMethod("cpfcnpj", function (cpfcnpj, element) {
    if (cpfcnpj.length > 0) {
        if (IsCpf(cpfcnpj)) {
            return this.optional(element) || true;
        }
        else if (IsCnpj(cpfcnpj)) {
            return this.optional(element) || true;
        }
        else
        {
            return this.optional(element) || false;
        }
    } else
        return true;
}, "Informe um CPF ou CNPJ válido.");

jQuery.validator.addMethod("cnpj", function (cnpj, element) {
    cnpj = jQuery.trim(cnpj);

    // DEIXA APENAS OS NÚMEROS
    cnpj = cnpj.replace('/', '');
    cnpj = cnpj.replace('.', '');
    cnpj = cnpj.replace('.', '');
    cnpj = cnpj.replace('-', '');

    var numeros, digitos, soma, i, resultado, pos, tamanho, digitos_iguais;
    digitos_iguais = 1;

    if (cnpj.length < 14 && cnpj.length < 15) {
        return this.optional(element) || false;
    }
    for (i = 0; i < cnpj.length - 1; i++) {
        if (cnpj.charAt(i) != cnpj.charAt(i + 1)) {
            digitos_iguais = 0;
            break;
        }
    }

    if (!digitos_iguais) {
        tamanho = cnpj.length - 2
        numeros = cnpj.substring(0, tamanho);
        digitos = cnpj.substring(tamanho);
        soma = 0;
        pos = tamanho - 7;

        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0)) {
            return this.optional(element) || false;
        }
        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1)) {
            return this.optional(element) || false;
        }
        return this.optional(element) || true;
        $("#txtCNPJIdentity").mask("99.999.999/9999-99");
    } else {
        return this.optional(element) || false;
    }
}, "Informe um CNPJ válido.");

jQuery.validator.addMethod("cpf", function (value, element) {
    value = jQuery.trim(value);

    value = value.replace('.', '');
    value = value.replace('.', '');
    cpf = value.replace('-', '');
    if (cpf.length == 11 && $.isNumeric(cpf)) {
        while (cpf.length < 11) cpf = "0" + cpf;
        var expReg = /^0+$|^1+$|^2+$|^3+$|^4+$|^5+$|^6+$|^7+$|^8+$|^9+$/;
        var a = [];
        var b = new Number;
        var c = 11;
        for (i = 0; i < 11; i++) {
            a[i] = cpf.charAt(i);
            if (i < 9) b += (a[i] * --c);
        }
        if ((x = b % 11) < 2) { a[9] = 0 } else { a[9] = 11 - x }
        b = 0;
        c = 11;
        for (y = 0; y < 10; y++) b += (a[y] * c--);
        if ((x = b % 11) < 2) { a[10] = 0; } else { a[10] = 11 - x; }
        if ((cpf.charAt(9) != a[9]) || (cpf.charAt(10) != a[10]) || cpf.match(expReg)) return this.optional(element) || false;
        $("#txtCNPJIdentity").mask("999.999.999-99");
        return this.optional(element) || true;
    }
    else
        return true;
}, "Informe um CPF válido."); // Mensagem padrão 

jQuery.validator.addMethod("dateBR", function (value, element) {
    if (value.length > 0) {
        //contando chars
        if (value.length != 10) return false;
        // verificando data
        var data = value;
        var dia = data.substr(0, 2);
        var barra1 = data.substr(2, 1);
        var mes = data.substr(3, 2);
        var barra2 = data.substr(5, 1);
        var ano = data.substr(6, 4);
        if (data.length != 10 || barra1 != "/" || barra2 != "/" || isNaN(dia) || isNaN(mes) || isNaN(ano) || dia > 31 || mes > 12) return false;
        if ((mes == 4 || mes == 6 || mes == 9 || mes == 11) && dia == 31) return false;
        if (mes == 2 && (dia > 29 || (dia == 29 && ano % 4 != 0))) return false;
        if (ano < 1900) return false;
        return true;
    }
    else
        return true;
}, "Informe uma data válida");  // Mensagem padrão

jQuery.validator.addMethod("datetimeBR", function (value, element) {
    //contando chars
    if (value.length != 16) return (this.optional(element) || false);
    // dividindo data e hora
    if (value.substr(10, 1) != ' ') return (this.optional(element) || false); // verificando se há espaço
    var arrOpcoes = value.split(' ');
    if (arrOpcoes.length != 2) return (this.optional(element) || false); // verificando a divisão de data e hora
    // verificando data
    var data = arrOpcoes[0];
    var dia = data.substr(0, 2);
    var barra1 = data.substr(2, 1);
    var mes = data.substr(3, 2);
    var barra2 = data.substr(5, 1);
    var ano = data.substr(6, 4);
    if (data.length != 10 || barra1 != "/" || barra2 != "/" || isNaN(dia) || isNaN(mes) || isNaN(ano) || dia > 31 || mes > 12) return (this.optional(element) || false);
    if ((mes == 4 || mes == 6 || mes == 9 || mes == 11) && dia == 31) return (this.optional(element) || false);
    if (mes == 2 && (dia > 29 || (dia == 29 && ano % 4 != 0))) return (this.optional(element) || false);
    // verificando hora
    var horario = arrOpcoes[1];
    var hora = horario.substr(0, 2);
    var doispontos = horario.substr(2, 1);
    var minuto = horario.substr(3, 2);
    if (horario.length != 5 || isNaN(hora) || isNaN(minuto) || hora > 23 || minuto > 59 || doispontos != ":") return (this.optional(element) || false);
    return this.optional(element) || true;
}, "Informe uma data e uma hora válida");

jQuery.validator.addMethod("timerbr", function (value, element) {
    if (value.length != 8) return false;
    var data = value;
    var hor = data.substr(0, 2);
    var se1 = data.substr(2, 1);
    var min = data.substr(3, 2);
    var se2 = data.substr(5, 1);
    var seg = data.substr(6, 2);
    if (data.length != 8 || se1 != ':' || se2 != ':' || isNaN(hor) || isNaN(min) || isNaN(seg)) {
        return false;
    }
    if (!((hor >= 0 && hor <= 23) && (min >= 0 && min <= 59) && (seg >= 0 && seg <= 59))) {
        return false;
    }
    return true;
}, "Por favor, uma hora válida");

jQuery.validator.addMethod("notequal", function (value, element, param) {
    return this.optional(element) || (value == $(param).val() ? false : true);
}, "Este valor não pode ser igual"); // Mensagem padrão 

jQuery.validator.addMethod("telefone", function (value, element) {
    value = value.replace("(", "");
    value = value.replace(")", "");
    value = value.replace("-", "");
    return this.optional(element) || /[0-9]{10}/.test(value);
}, "Por favor, um telefone válido");