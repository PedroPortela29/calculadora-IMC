document.addEventListener("DOMContentLoaded", function () {
    const alturaInput = document.querySelector("#altura_input");
    const pesoInput = document.querySelector("#peso_input");
    const botaoCalcular = document.querySelector("#result");
    const botaoLimpar = document.querySelector(".btn-calc button:nth-child(2)");
    const resultadoIMC = document.querySelector("#resultado");
    const setaIndicadora = document.createElement("span");

    // Função para aplicar máscara nos inputs
    function aplicarMascara(input, tipo) {
        input.addEventListener("input", function () {
            let valor = this.value.replace(/[^0-9.]/g, "");

            if (tipo === "altura") {
                this.value = partes[0].slice(0, 1) + (partes[1] ? "." + partes[1].slice(0, 2) : "");
            } else if (tipo === "peso") {
                this.value = partes[0].slice(0, 3) + (partes[1] ? "." + partes[1].slice(0, 1) : "");
            }
        });
    }

    aplicarMascara(alturaInput, "altura");
    aplicarMascara(pesoInput, "peso");

    botaoCalcular.addEventListener("click", function () {
        const altura = parseFloat(alturaInput.value);
        const peso = parseFloat(pesoInput.value);

        if (isNaN(altura) || isNaN(peso) || altura <= 0 || peso <= 0) {
            alert("Por favor, insira valores válidos.");
            return;
        }

        const imc = (peso / (altura * altura)).toFixed(2);
        resultadoIMC.innerText = imc;

        exibirClassificacao(imc);
    });

    botaoLimpar.addEventListener("click", function () {
        alturaInput.value = "";
        pesoInput.value = "";
        resultadoIMC.innerText = "";
        setaIndicadora.innerText = "";
    });

    function exibirClassificacao(imc) {
        let classificacao = "";

        if (imc < 18.5) classificacao = "Magreza";
        else if (imc < 25) classificacao = "Normal";
        else if (imc < 30) classificacao = "Sobrepeso";
        else if (imc < 40) classificacao = "Obesidade";
        else classificacao = "Obesidade Grave";

        setaIndicadora.innerText = ` → ${classificacao}`;
        setaIndicadora.style.fontWeight = "bold";
        setaIndicadora.style.marginLeft = "10px";

        resultadoIMC.parentNode.appendChild(setaIndicadora);
    }
});
