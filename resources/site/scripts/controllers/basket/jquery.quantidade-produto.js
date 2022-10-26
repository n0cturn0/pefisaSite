/// <reference path="jquery.min.js" />

// Retorna o contexto do produto
function obterContextoProduto(referencia) {

    var contexto = referencia.parents('.contexto-produto-opcao');

    return contexto;
}

// Mensagens de adicionar e subtrair quantidade do produto
function ocultarMensagensQuantidade(contexto) {
    $(".mensagens-adicionar-quantidade, .mensagem-indisponivel-quantidade, .loader", contexto).hide();
}

// Verifica se a quantidade do produto existe em estoque para adicionar ao carrinho
function adicionarAoCarrinho(contexto) {
    var itemId = $(".itemid", contexto).val();
    var idProduto = $(".prodid", contexto).val();
    var quantidade = parseInt($('.quant', contexto).val());
    var cor = $(".colorname", contexto).val();
    var idProdutoOpcao = $(".sizeid", contexto).val();
    // Configuracoes
    var configuracao1 = $(".prodtunning1", contexto).val();
    var configuracao2 = $(".prodtunning2", contexto).val();
    var configuracao3 = $(".prodtunning3", contexto).val();
    var configuracao4 = $(".prodtunning4", contexto).val();
    var configuracao5 = $(".prodtunning5", contexto).val();
    var configuracao6 = $(".prodtunning6", contexto).val();
    var configuracao7 = $(".prodtunning7", contexto).val();
    var configuracao8 = $(".prodtunning8", contexto).val();
    var configuracao9 = $(".prodtunning9", contexto).val();
    var configuracao10 = $(".prodtunning10", contexto).val();
    var dataString = "itemId=" + itemId + "&idProduto=" + idProduto + "&idProdutoOpcao=" + idProdutoOpcao + "&quantidade=" + quantidade + "&cor=" + cor + "&configuracao1=" + configuracao1 + "&configuracao2=" + configuracao2 + "&configuracao3=" + configuracao3 + "&configuracao4=" + configuracao4 + "&configuracao5=" + configuracao5 + "&configuracao6=" + configuracao6 + "&configuracao7=" + configuracao7 + "&configuracao8=" + configuracao8 + "&configuracao9=" + configuracao9 + "&configuracao10=" + configuracao10;

    // Adicionar ao carrinho rápido
    //carrinhoRapidoAdicionar(idProdutoOpcao, contexto);

    // Adicionar ao carrinho
    $.ajax({
        type: "POST",
        async: false,
        url: "/ajax/Carrinho/AdicionarProdutoAoCarrinho/",
        beforeSend: function () {
            //alert("enviando?" + dataString);
            //$('.mensagens-adicionar-quantidade', contexto).show();
            //$('.loader', contexto).show();
            //$('.remover-produto', contexto).hide();
            //$('#btn-add-carrinho').addClass('carregando');
            //$("#msg-no-carrinho").hide();
        },
        data: dataString,
        success: function () {
            $('#notification').html('<div class="alert alert-success">O produto foi adicionado ou atualizado ao carrinho com sucesso!</div>');
            $('.alert').delay(5000).fadeOut();
            $('html, body').animate({ scrollTop: 0 }, 'slow');
        },
        error: function () {
            $('#notification').html('<div class="alert alert-danger">Erro ao adicionar no carrinho!</div>');
            $('.alert').delay(5000).fadeOut();
            $('html, body').animate({ scrollTop: 0 }, 'slow');
        }
    });

    carrinhoRapidoAdicionar(contexto);

}

function carrinhoRapidoAdicionar(contexto) {
    var itemId = $(".itemid", contexto).val();
    var idProduto = $(".prodid", contexto).val();
    var quantidade = parseInt($('.quant', contexto).val());
    var cor = $(".colorname", contexto).val();
    var idProdutoOpcao = $(".sizeid", contexto).val();
    // Configuracoes
    var configuracao1 = $(".prodtunning1", contexto).val();
    var configuracao2 = $(".prodtunning2", contexto).val();
    var configuracao3 = $(".prodtunning3", contexto).val();
    var configuracao4 = $(".prodtunning4", contexto).val();
    var configuracao5 = $(".prodtunning5", contexto).val();
    var configuracao6 = $(".prodtunning6", contexto).val();
    var configuracao7 = $(".prodtunning7", contexto).val();
    var configuracao8 = $(".prodtunning8", contexto).val();
    var configuracao9 = $(".prodtunning9", contexto).val();
    var configuracao10 = $(".prodtunning10", contexto).val();
    var dataString = "itemId=" + itemId + "&idProduto=" + idProduto + "&idProdutoOpcao=" + idProdutoOpcao + "&quantidade=" + quantidade + "&cor=" + cor + "&configuracao1=" + configuracao1 + "&configuracao2=" + configuracao2 + "&configuracao3=" + configuracao3 + "&configuracao4=" + configuracao4 + "&configuracao5=" + configuracao5 + "&configuracao6=" + configuracao6 + "&configuracao7=" + configuracao7 + "&configuracao8=" + configuracao8 + "&configuracao9=" + configuracao9 + "&configuracao10=" + configuracao10;


    $.ajax({
        type: "POST",
        url: "/ajax/Carrinho/ObterJsonProdutoCarrinho/",
        data: dataString,
        dataType: "json",
        success: function (produto) {

            var colquantidade = "<td class=\"quantity\">" + produto.Quantidade + " x</td>";
            var colnomeProduto = "<td class=\"product\"><a href=\"" + produto.URL + "\">" + produto.NomeProduto + "</a><span class=\"small\"> Ref.: " + produto.Codigo + "</span></td>";
            var colcor = "<td class=\"color\">" + cor + "</td>";

            var conteudoItem = colquantidade + colnomeProduto + colcor;

            if ($("#fastcart-item-" + idProdutoOpcao + cor).length > 0) {
                $("#fastcart-item-" + idProdutoOpcao + cor).remove();
            }

            $("#fastcart").append("<tr id='fastcart-item-" + idProdutoOpcao + cor + "'>" + conteudoItem + "</tr>");

            carrinhoRapidoAtualizarValores();
        }
    });
}

function carrinhoRapidoRemover(idProdutoOpcao, cor) {

    $("#fastcart-item-" + idProdutoOpcao + cor).remove();

    carrinhoRapidoAtualizarValores();
}

function carrinhoRapidoAtualizarValores() {
    var quantidadeItensCarrinho = 0;

    $("#fastcart-show-total").html("");
    $("#fastcart-total").html("");

    var quantidadeItensCarrinho = $("#fastcart > tbody > tr").length;

    $("#fastcart-show-total").html(quantidadeItensCarrinho);
    $("#fastcart-total").html("Total " + quantidadeItensCarrinho + " iten(s)");
}