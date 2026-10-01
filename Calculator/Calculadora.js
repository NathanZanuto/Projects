//PROGRAMA SIMPLES PARA DEMONSTRAR O FUNCIONAMENTO DE UMA CALCULADORA
//UTILIZANDO E APLICANDO OS CONHECIMENTOS BÁSICOS DE LÓGICA DE PROGRAMAÇÃO
//E A BASE DO JAVA SCRIPT

const PI = 3.14;
const prompt = require("prompt-sync")();//devido ao uso node.js precisamos importar a biblioteca prompt-sync para que possamos receber dados do usuario 

//funcao para o usuario informar os numeros que deseja calcular
function escolherNumeros() {
    let num1 = parseFloat(prompt("Digite o primeiro número:"));
    let num2 = parseFloat(prompt("Digite o segundo número:"));
    return escolherOperacao([num1, num2]);
}

//funcao para o usuario escolher a operacao que deseja realizar
function escolherOperacao(numeros) {
    let operacao = prompt("Escolha a operação: \n1 - Adição\n2 - Subtração\n3 - Multilicação\n4 - Divisão \n5 - Somar PI\nDigite o número da operação desejada:");
    switch (operacao) {
        case "1":
            return `Resultado da soma: ${numeros[0] + numeros[1]}`;
            break
        case "2":
            return `Resultado da subtração: ${numeros[0] - numeros[1]}`;
            break;
        case "3":
            return `Resultado da multiplicação: ${numeros[0] * numeros[1]}`;
            break;
        case "4":
            if (numeros[1] === 0) {
                return "Erro: Divisão por zero não é permitida.";
                break;
            }
            return `Resultado da divisão: ${numeros[0] / numeros[1]}`;
            break;
        case "5":
            return `Resultado da soma: ${numeros[0] + numeros[1] + PI}`;
            break;
        default:
            return "Operação inválida. Por favor, escolha uma operação válida.";
    }
}

//chamada simples da funcao para inicalizar o programa e o funcionamento da calculadora
console.log(escolherNumeros());