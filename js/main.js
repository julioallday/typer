let tempoInicial = $("#tempo-digitacao").text();
let campo = $(".campo-digitacao");

$(function(){
  atualizaTamanhoFrase();
  inicializaContadores();
  inicializaCronometro();
  $("#botao-reiniciar").click(reiniciaJogo);
  inicializaMarcadores();
});

function atualizaTamanhoFrase () {
  let frase = $(".frase").text();
let numeroDePalavras = frase.split(" ").length;
let tamanhoDaFrase = $("#tamanho-frase");
tamanhoDaFrase.text(numeroDePalavras);
}

function inicializaContadores () {
  campo.on("input", function(){
    let conteudo = campo.val();

    let qtdPalavras = conteudo.split(/\S+/).length - 1;
    $("#contador-palavras").text(qtdPalavras);

    let qtdCaracteres = conteudo.length;
    $("#contador-caracteres").text(qtdCaracteres)
  });
}

function inicializaCronometro () {
  let tempoRestante = $("#tempo-digitacao").text();
  $(campo).one("focus", function () { 
    $("#botao-reiniciar").attr("disabled", true)
    let cronometroID = setInterval(function(){
      tempoRestante--;
      $("#tempo-digitacao").text(tempoRestante);
      if(tempoRestante < 1){
          campo.attr("disabled", true);
          clearInterval(cronometroID);
          $("#botao-reiniciar").attr("disabled", false)
          campo.toggleClass("campo-desativado");
        }
      },1000);
    }
  );
}

function inicializaMarcadores() {
  var frase = $(".frase").text();
  campo.on("input", function() {
      var digitado = campo.val();
      var comparavel = frase.substr(0 , digitado.length);

      if(digitado == comparavel) {
          campo.addClass("borda-verde");
          campo.removeClass("borda-vermelha");
      } else {
          campo.addClass("borda-vermelha");
          campo.removeClass("borda-verde");
      }
  });
}

function reiniciaJogo(){
  campo.attr("disabled",false);
  campo.val("");
  $("#contador-palavras").text("0");
  $("#contador-caracteres").text("0");
  $("#tempo-digitacao").text(tempoInicial);
  inicializaCronometro();
  campo.toggleClass("campo-desativado");

  campo.removeClass("borda-vermelha"); //novo
  campo.removeClass("borda-verde"); //novo
}